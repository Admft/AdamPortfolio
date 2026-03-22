import {
  buildQuestionId,
  decodeHtmlEntities,
  selectUniqueQuestions,
  shuffleArray,
} from './triviaUtils';

const OPEN_TRIVIA_TOKEN_STORAGE_KEY = 'portfolio-open-trivia-token';
const DEFAULT_ROUND_SIZE = 5;
const OPEN_TRIVIA_SWE_CATEGORY = 18;

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
        const response = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
        if (!response.ok) return null;
        return response.json();
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

  if (selected.length < count) {
    throw new Error('Could not load enough unique general trivia questions right now.');
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

  if (selected.length < count) {
    throw new Error('Could not load enough unique SWE questions right now.');
  }

  return selected;
};
