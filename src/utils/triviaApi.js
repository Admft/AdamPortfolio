import {
  buildQuestionId,
  decodeHtmlEntities,
  selectUniqueQuestions,
  shuffleArray,
} from './triviaUtils';

const OPEN_TRIVIA_TOKEN_STORAGE_KEY = 'portfolio-open-trivia-token';
const OPEN_TRIVIA_BATCH_SIZE = 15;
const QUIZAPI_BATCH_SIZE = 20;
const DEFAULT_ROUND_SIZE = 5;
const SWE_CATEGORIES = ['Code', 'Linux', 'DevOps', 'Docker', 'BASH', 'SQL'];

const getStoredOpenTriviaToken = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(OPEN_TRIVIA_TOKEN_STORAGE_KEY);
};

const setStoredOpenTriviaToken = (token) => {
  if (typeof window === 'undefined' || !token) return;
  window.localStorage.setItem(OPEN_TRIVIA_TOKEN_STORAGE_KEY, token);
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

const normalizeOpenTriviaQuestion = (rawQuestion) => {
  const question = decodeHtmlEntities(rawQuestion.question);
  const correctAnswer = decodeHtmlEntities(rawQuestion.correct_answer);
  const incorrectAnswers = rawQuestion.incorrect_answers.map((answer) => decodeHtmlEntities(answer));
  const answers = shuffleArray([correctAnswer, ...incorrectAnswers]);

  return {
    id: buildQuestionId({
      source: 'general',
      question,
      correctAnswer,
      category: decodeHtmlEntities(rawQuestion.category),
    }),
    source: 'general',
    question,
    answers,
    correctAnswer,
    difficulty: rawQuestion.difficulty,
    category: decodeHtmlEntities(rawQuestion.category),
  };
};

const resolveQuizApiKey = () => (
  process.env.REACT_APP_QUIZAPI_KEY
  || process.env.VITE_QUIZAPI_KEY
  || process.env.NEXT_PUBLIC_QUIZAPI_KEY
);

const hasConfiguredQuizApiKey = () => Boolean(resolveQuizApiKey());

const normalizeQuizApiQuestion = (rawQuestion) => {
  const questionText = decodeHtmlEntities(rawQuestion.question || '');
  const category = decodeHtmlEntities(rawQuestion.category || 'Software Engineering');

  const answersEntries = Object.entries(rawQuestion.answers || {})
    .filter(([, value]) => typeof value === 'string' && value.trim().length > 0)
    .map(([key, value]) => ({ key, value: decodeHtmlEntities(value) }));

  const correctEntries = Object.entries(rawQuestion.correct_answers || {})
    .filter(([, value]) => value === 'true')
    .map(([key]) => key.replace('_correct', ''));

  if (!questionText || answersEntries.length < 2 || correctEntries.length !== 1) {
    return null;
  }

  const correctKey = correctEntries[0];
  const correctMatch = answersEntries.find((entry) => entry.key === correctKey);
  if (!correctMatch) return null;

  const answers = shuffleArray(answersEntries.map((entry) => entry.value));
  const correctAnswer = correctMatch.value;

  return {
    id: `quizapi_${rawQuestion.id || buildQuestionId({
      source: 'swe',
      question: questionText,
      correctAnswer,
      category,
    })}`,
    source: 'swe',
    question: questionText,
    answers,
    correctAnswer,
    difficulty: rawQuestion.difficulty || undefined,
    category,
  };
};

const fetchQuizApiViaProxy = async () => {
  const params = new URLSearchParams({
    limit: String(QUIZAPI_BATCH_SIZE),
    category: SWE_CATEGORIES.join(','),
  });

  const response = await fetch(`/api/quizapi?${params.toString()}`);
  if (!response.ok) {
    const error = new Error('Quiz proxy request failed');
    error.status = response.status;
    throw error;
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error('Quiz proxy response was invalid');
  }

  return payload;
};

const fetchQuizApiDirect = async (apiKey) => {
  const params = new URLSearchParams({
    limit: String(QUIZAPI_BATCH_SIZE),
    category: SWE_CATEGORIES.join(','),
  });

  const response = await fetch(`https://quizapi.io/api/v1/questions?${params.toString()}`, {
    headers: {
      'X-Api-Key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('QuizAPI request failed');
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error('QuizAPI response was invalid');
  }

  return payload;
};

export const fetchGeneralTriviaRound = async ({ recentIds, count = DEFAULT_ROUND_SIZE }) => {
  const token = await getOpenTriviaToken();
  const attempts = 4;
  const collected = [];

  for (let attempt = 0; attempt < attempts && collected.length < count * 2; attempt += 1) {
    const params = new URLSearchParams({
      amount: String(OPEN_TRIVIA_BATCH_SIZE),
      type: 'multiple',
    });

    if (token) params.set('token', token);

    const response = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
    if (!response.ok) continue;

    const payload = await response.json();

    if (payload.response_code === 4) {
      const refreshedToken = await fetchOpenTriviaToken();
      if (refreshedToken) setStoredOpenTriviaToken(refreshedToken);
      continue;
    }

    if (payload.response_code !== 0 || !Array.isArray(payload.results)) continue;

    const normalized = payload.results.map(normalizeOpenTriviaQuestion);
    collected.push(...normalized);
  }

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
  const attempts = 4;
  const collected = [];
  const apiKey = resolveQuizApiKey();
  const keyConfigured = hasConfiguredQuizApiKey();

  for (let attempt = 0; attempt < attempts && collected.length < count * 2; attempt += 1) {
    let batch = [];

    try {
      batch = await fetchQuizApiViaProxy();
    } catch (proxyError) {
      if (!keyConfigured) {
        throw new Error(
          'QuizAPI key is missing. Add REACT_APP_QUIZAPI_KEY in .env.local and restart npm start.'
        );
      }

      batch = await fetchQuizApiDirect(apiKey);
    }

    const normalized = batch
      .map(normalizeQuizApiQuestion)
      .filter(Boolean);

    collected.push(...normalized);
  }

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
