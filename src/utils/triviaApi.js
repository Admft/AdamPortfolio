import {
  buildQuestionId,
  decodeHtmlEntities,
  selectUniqueQuestions,
  shuffleArray,
} from './triviaUtils';

const OPEN_TRIVIA_TOKEN_STORAGE_KEY = 'portfolio-open-trivia-token';
const DEFAULT_ROUND_SIZE = 5;
const OPEN_TRIVIA_SWE_CATEGORY = 18;
const OPEN_TRIVIA_MIN_REQUEST_GAP_MS = 5200;
const OPEN_TRIVIA_RATE_LIMIT_BACKOFF_MS = 5200;
const OPEN_TRIVIA_MAX_RATE_RETRIES = 2;
let lastOpenTriviaRequestAt = 0;

const getStoredOpenTriviaToken = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(OPEN_TRIVIA_TOKEN_STORAGE_KEY);
};

const setStoredOpenTriviaToken = (token) => {
  if (typeof window === 'undefined' || !token) return;
  window.localStorage.setItem(OPEN_TRIVIA_TOKEN_STORAGE_KEY, token);
};

const clearStoredOpenTriviaToken = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(OPEN_TRIVIA_TOKEN_STORAGE_KEY);
};

const fetchOpenTriviaToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  if (!response.ok) return null;

  const payload = await response.json();
  return payload?.response_code === 0 ? payload.token : null;
};

const getOpenTriviaToken = async () => {
  const existing = getStoredOpenTriviaToken();
  if (existing) return existing;

  const token = await fetchOpenTriviaToken();
  if (token) setStoredOpenTriviaToken(token);
  return token;
};

const normalizeOpenTriviaQuestion = (rawQuestion, source = 'general') => {
  const question = decodeHtmlEntities(rawQuestion.question);
  const correctAnswer = decodeHtmlEntities(rawQuestion.correct_answer);
  const incorrectAnswers = rawQuestion.incorrect_answers.map((answer) => decodeHtmlEntities(answer));
  const answers = shuffleArray([correctAnswer, ...incorrectAnswers]);

  return {
    id: buildQuestionId({
      source,
      question,
      correctAnswer,
      category: decodeHtmlEntities(rawQuestion.category),
    }),
    source,
    question,
    answers,
    correctAnswer,
    difficulty: rawQuestion.difficulty,
    category: decodeHtmlEntities(rawQuestion.category),
  };
};

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const requestOpenTrivia = async (params) => {
  const elapsed = Date.now() - lastOpenTriviaRequestAt;
  const waitMs = Math.max(0, OPEN_TRIVIA_MIN_REQUEST_GAP_MS - elapsed);
  if (waitMs > 0) await sleep(waitMs);

  const response = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
  lastOpenTriviaRequestAt = Date.now();

  if (!response.ok) return null;
  return response.json();
};

const logRoundStats = ({ source, requested, collected, selected }) => {
  // Dev-friendly API visibility for shortages without noisy payload logging.
  console.debug(
    `[trivia:${source}] requested=${requested} collected=${collected} selected=${selected}`
  );
};

const fetchOpenTriviaRound = async ({ count, source, category }) => {
  const attempts = 5;
  const collected = [];
  const amountPlan = [Math.max(10, count * 2), Math.max(7, count + 2), count];

  for (let attempt = 0; attempt < attempts && collected.length < count * 2; attempt += 1) {
    for (const amount of amountPlan) {
      const params = new URLSearchParams({
        amount: String(amount),
        type: 'multiple',
      });

      if (category) params.set('category', String(category));

      // Use token first, then gracefully retry without it if OpenTDB is exhausted.
      const token = await getOpenTriviaToken();
      if (token) params.set('token', token);

      let payload = null;

      const requestWithParams = async () => {
        let currentPayload = await requestOpenTrivia(params);

        for (
          let rateRetry = 0;
          currentPayload?.response_code === 5 && rateRetry < OPEN_TRIVIA_MAX_RATE_RETRIES;
          rateRetry += 1
        ) {
          await sleep(OPEN_TRIVIA_RATE_LIMIT_BACKOFF_MS);
          currentPayload = await requestOpenTrivia(params);
        }

        return currentPayload;
      };

      payload = await requestWithParams();

      if (payload?.response_code === 4) {
        clearStoredOpenTriviaToken();
        const refreshedToken = await fetchOpenTriviaToken();
        if (refreshedToken) {
          setStoredOpenTriviaToken(refreshedToken);
          params.set('token', refreshedToken);
        } else {
          params.delete('token');
        }
        payload = await requestWithParams();
      }

      if (payload?.response_code === 3) {
        clearStoredOpenTriviaToken();
        const refreshedToken = await fetchOpenTriviaToken();
        if (refreshedToken) {
          setStoredOpenTriviaToken(refreshedToken);
          params.set('token', refreshedToken);
          payload = await requestWithParams();
        }
      }

      if (!payload || payload.response_code !== 0 || !Array.isArray(payload.results)) {
        params.delete('token');
        payload = await requestWithParams();
      }

      if (payload && payload.response_code === 0 && Array.isArray(payload.results) && payload.results.length) {
        collected.push(...payload.results.map((item) => normalizeOpenTriviaQuestion(item, source)));
      }

      if (collected.length >= count * 2) break;
    }
  }

  return collected;
};

export const fetchGeneralTriviaRound = async ({ recentIds, count = DEFAULT_ROUND_SIZE }) => {
  const collected = await fetchOpenTriviaRound({
    count,
    source: 'general',
  });

  const selected = selectUniqueQuestions({
    pool: collected,
    count,
    recentIds,
  });

  logRoundStats({
    source: 'general',
    requested: count,
    collected: collected.length,
    selected: selected.length,
  });

  if (selected.length === 0) {
    throw new Error('Could not load any general trivia questions right now.');
  }

  return selected;
};

export const fetchSweTriviaRound = async ({ recentIds, count = DEFAULT_ROUND_SIZE }) => {
  const collected = await fetchOpenTriviaRound({
    count,
    source: 'swe',
    category: OPEN_TRIVIA_SWE_CATEGORY,
  });

  const selected = selectUniqueQuestions({
    pool: collected,
    count,
    recentIds,
  });

  logRoundStats({
    source: 'swe',
    requested: count,
    collected: collected.length,
    selected: selected.length,
  });

  if (selected.length === 0) {
    throw new Error('Could not load any SWE questions right now.');
  }

  return selected;
};
