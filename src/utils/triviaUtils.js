const RECENT_CACHE_PREFIX = 'portfolio-trivia-recent';
const RECENT_CACHE_LIMIT = 30;

export const decodeHtmlEntities = (value) => {
  if (typeof value !== 'string') return '';

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    return textarea.value;
  }

  return value
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
};

export const shuffleArray = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const hashString = (value) => {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) + hash) + value.charCodeAt(i);
  }
  return `q_${Math.abs(hash)}`;
};

export const buildQuestionId = ({ source, question, correctAnswer, category }) => {
  const normalized = `${source}|${question}|${correctAnswer}|${category || ''}`.trim();
  return hashString(normalized);
};

const getCacheKey = (source) => `${RECENT_CACHE_PREFIX}:${source}`;

export const getRecentQuestionIds = (source) => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(getCacheKey(source));
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id) => typeof id === 'string');
  } catch {
    return [];
  }
};

export const pushRecentQuestionIds = (source, ids) => {
  if (typeof window === 'undefined') return;

  const uniqueIncoming = ids.filter((id) => typeof id === 'string' && id.length > 0);
  if (!uniqueIncoming.length) return;

  const existing = getRecentQuestionIds(source);
  const next = [...uniqueIncoming, ...existing].filter((id, index, arr) => arr.indexOf(id) === index);

  window.localStorage.setItem(
    getCacheKey(source),
    JSON.stringify(next.slice(0, RECENT_CACHE_LIMIT))
  );
};

export const selectUniqueQuestions = ({ pool, count, recentIds }) => {
  const recentSet = new Set(recentIds);
  const deduped = [];
  const seen = new Set();

  for (const question of pool) {
    if (!question?.id || seen.has(question.id)) continue;
    seen.add(question.id);
    deduped.push(question);
  }

  const unseenRecent = deduped.filter((q) => !recentSet.has(q.id));
  const fallback = deduped.filter((q) => recentSet.has(q.id));

  return shuffleArray([...unseenRecent, ...fallback]).slice(0, count);
};
