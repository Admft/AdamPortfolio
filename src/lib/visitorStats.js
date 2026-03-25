const COUNT_API_BASE_URL =
  process.env.REACT_APP_COUNT_API_BASE_URL || 'https://api.countapi.xyz';
const COUNT_API_NAMESPACE =
  process.env.REACT_APP_COUNT_API_NAMESPACE || 'adamrmoffat.com';
const STORAGE_PREFIX = 'adamrmoffat:visitor-stats:v1';
const LOCAL_COUNT_PREFIX = `${STORAGE_PREFIX}:local-count`;

let trackingPromise;

const getLocalDateStamp = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getISOWeekStamp = (date) => {
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = localDate.getDay() || 7;
  localDate.setDate(localDate.getDate() + 4 - day);
  const yearStart = new Date(localDate.getFullYear(), 0, 1);
  const week = Math.ceil((((localDate - yearStart) / 86400000) + 1) / 7);
  return `${localDate.getFullYear()}-W${String(week).padStart(2, '0')}`;
};

const getMonthStamp = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const getBucketDefinitions = (date = new Date()) => [
  {
    id: 'today',
    label: 'Today',
    apiKey: `visitors-day-${getLocalDateStamp(date)}`,
    storageKey: `${STORAGE_PREFIX}:today:${getLocalDateStamp(date)}`,
  },
  {
    id: 'week',
    label: 'This Week',
    apiKey: `visitors-week-${getISOWeekStamp(date)}`,
    storageKey: `${STORAGE_PREFIX}:week:${getISOWeekStamp(date)}`,
  },
  {
    id: 'month',
    label: 'This Month',
    apiKey: `visitors-month-${getMonthStamp(date)}`,
    storageKey: `${STORAGE_PREFIX}:month:${getMonthStamp(date)}`,
  },
  {
    id: 'allTime',
    label: 'All Time',
    apiKey: 'visitors-all-time',
    storageKey: `${STORAGE_PREFIX}:all-time`,
  },
];

const getLocalCountKey = (bucketId) => `${LOCAL_COUNT_PREFIX}:${bucketId}`;

const readLocalCount = (bucketId) => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return 0;
  }

  return Number(localStorage.getItem(getLocalCountKey(bucketId)) || '0');
};

const incrementLocalCount = (bucketId) => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return 0;
  }

  const nextValue = readLocalCount(bucketId) + 1;
  localStorage.setItem(getLocalCountKey(bucketId), String(nextValue));
  return nextValue;
};

const fetchCountApi = async (path) => {
  const response = await fetch(`${COUNT_API_BASE_URL}${path}`);
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Count API request failed with status ${response.status}`);
  }

  return response.json();
};

const hitCounter = async (key) => {
  const data = await fetchCountApi(
    `/hit/${encodeURIComponent(COUNT_API_NAMESPACE)}/${encodeURIComponent(key)}`
  );
  return data.value || 0;
};

const readCounter = async (key) => {
  const data = await fetchCountApi(
    `/get/${encodeURIComponent(COUNT_API_NAMESPACE)}/${encodeURIComponent(key)}`
  );
  return data?.value || 0;
};

export const trackVisitor = async () => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  if (trackingPromise) {
    return trackingPromise;
  }

  trackingPromise = (async () => {
    const pendingBuckets = getBucketDefinitions().filter(
      (bucket) => !localStorage.getItem(bucket.storageKey)
    );

    await Promise.all(
      pendingBuckets.map(async (bucket) => {
        localStorage.setItem(bucket.storageKey, '1');
        incrementLocalCount(bucket.id);

        try {
          await hitCounter(bucket.apiKey);
        } catch (error) {
          console.error(`Remote visitor tracking failed for ${bucket.id}.`, error);
        }

      })
    );
  })();

  return trackingPromise;
};

export const fetchVisitorStats = async () => {
  const buckets = getBucketDefinitions();
  const values = await Promise.all(
    buckets.map(async (bucket) => {
      try {
        const remoteValue = await readCounter(bucket.apiKey);
        return {
          id: bucket.id,
          label: bucket.label,
          value: remoteValue,
          source: 'remote',
        };
      } catch (error) {
        return {
          id: bucket.id,
          label: bucket.label,
          value: readLocalCount(bucket.id),
          source: 'local',
        };
      }
    })
  );

  return values.reduce((accumulator, bucket) => {
    accumulator[bucket.id] = bucket;
    return accumulator;
  }, {});
};
