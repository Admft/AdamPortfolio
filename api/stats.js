const crypto = require('crypto');

const VISITOR_COOKIE_NAME = 'adamrmoffat_vid';
const STATS_NAMESPACE = process.env.STATS_NAMESPACE || 'adamrmoffat.com';
const STATS_TIME_ZONE = process.env.STATS_TIME_ZONE || 'America/Chicago';
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const json = (res, statusCode, payload, headers = {}) => {
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
  res.setHeader('Cache-Control', 'no-store');
  res.status(statusCode).json(payload);
};

const getCookieValue = (cookieHeader, name) => {
  if (!cookieHeader) return '';

  const prefix = `${name}=`;
  const cookie = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : '';
};

const getZonedDateParts = (date, timeZone) => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formatter.formatToParts(date).reduce((accumulator, part) => {
    if (part.type !== 'literal') {
      accumulator[part.type] = part.value;
    }

    return accumulator;
  }, {});
};

const getCurrentStamps = (date = new Date(), timeZone = STATS_TIME_ZONE) => {
  const parts = getZonedDateParts(date, timeZone);
  const zonedDate = new Date(
    Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day))
  );
  const dayStamp = `${parts.year}-${parts.month}-${parts.day}`;
  const monthStamp = `${parts.year}-${parts.month}`;
  const day = zonedDate.getUTCDay() || 7;
  zonedDate.setUTCDate(zonedDate.getUTCDate() + 4 - day);
  const isoYear = zonedDate.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const week = Math.ceil((((zonedDate - yearStart) / 86400000) + 1) / 7);

  return {
    dayStamp,
    weekStamp: `${isoYear}-W${String(week).padStart(2, '0')}`,
    monthStamp,
  };
};

const getCounterKeys = () => {
  const { dayStamp, weekStamp, monthStamp } = getCurrentStamps();

  return {
    today: `${STATS_NAMESPACE}:visitors:day:${dayStamp}`,
    week: `${STATS_NAMESPACE}:visitors:week:${weekStamp}`,
    month: `${STATS_NAMESPACE}:visitors:month:${monthStamp}`,
    allTime: `${STATS_NAMESPACE}:visitors:all-time`,
  };
};

const redisCommand = async (...command) => {
  const commandPath = command.map((part) => encodeURIComponent(String(part))).join('/');
  const response = await fetch(`${REDIS_URL}/${commandPath}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Redis command failed with status ${response.status}`);
  }

  const payload = await response.json();
  return payload.result;
};

const ensureConfigured = (res) => {
  if (REDIS_URL && REDIS_TOKEN) {
    return true;
  }

  json(res, 503, {
    error: 'Stats storage is not configured.',
  });
  return false;
};

module.exports = async (req, res) => {
  if (!ensureConfigured(res)) {
    return;
  }

  const keys = getCounterKeys();

  if (req.method === 'GET') {
    try {
      const [today, week, month, allTime] = await Promise.all([
        redisCommand('SCARD', keys.today),
        redisCommand('SCARD', keys.week),
        redisCommand('SCARD', keys.month),
        redisCommand('SCARD', keys.allTime),
      ]);

      json(res, 200, {
        source: 'remote',
        stats: {
          today: { label: 'Today', value: Number(today || 0), source: 'remote' },
          week: { label: 'This Week', value: Number(week || 0), source: 'remote' },
          month: { label: 'This Month', value: Number(month || 0), source: 'remote' },
          allTime: { label: 'All Time', value: Number(allTime || 0), source: 'remote' },
        },
      });
    } catch (error) {
      json(res, 500, {
        error: 'Failed to read stats.',
      });
    }
    return;
  }

  if (req.method === 'POST') {
    const existingVisitorId = getCookieValue(req.headers.cookie, VISITOR_COOKIE_NAME);
    const visitorId = existingVisitorId || crypto.randomUUID();
    const isSecure =
      req.headers['x-forwarded-proto'] === 'https' || process.env.VERCEL_ENV === 'production';

    try {
      await Promise.all([
        redisCommand('SADD', keys.today, visitorId),
        redisCommand('SADD', keys.week, visitorId),
        redisCommand('SADD', keys.month, visitorId),
        redisCommand('SADD', keys.allTime, visitorId),
        redisCommand('EXPIRE', keys.today, 60 * 60 * 24 * 35),
        redisCommand('EXPIRE', keys.week, 60 * 60 * 24 * 400),
        redisCommand('EXPIRE', keys.month, 60 * 60 * 24 * 800),
      ]);

      if (!existingVisitorId) {
        res.setHeader(
          'Set-Cookie',
          `${VISITOR_COOKIE_NAME}=${encodeURIComponent(visitorId)}; Path=/; Max-Age=${60 * 60 * 24 * 730}; SameSite=Lax${isSecure ? '; Secure' : ''}; HttpOnly`
        );
      }

      json(res, 200, {
        ok: true,
        source: 'remote',
      });
    } catch (error) {
      json(res, 500, {
        error: 'Failed to track visitor.',
      });
    }
    return;
  }

  res.setHeader('Allow', 'GET, POST');
  json(res, 405, {
    error: 'Method not allowed.',
  });
};
