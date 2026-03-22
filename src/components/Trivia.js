import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Loader2,
  RefreshCw,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import { fetchGeneralTriviaRound, fetchSweTriviaRound } from '../utils/triviaApi';
import { getRecentQuestionIds, pushRecentQuestionIds } from '../utils/triviaUtils';

const ROUND_SIZE = 5;
const QUESTION_TIME = 18;
const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'any', label: 'Mixed' },
];

const TRACKS = {
  general: {
    id: 'general',
    title: 'General Trivia',
    shortLabel: 'General',
    subtitle: 'Culture, history, science, and broad knowledge.',
    description:
      'A broad mix of multiple-choice questions from Open Trivia DB.',
    icon: BookOpen,
    accent: 'from-indigo-400 to-blue-500',
  },
  swe: {
    id: 'swe',
    title: 'SWE Coding Questions',
    shortLabel: 'SWE',
    subtitle: 'Programming and software fundamentals.',
    description:
      'Technical multiple-choice questions from Open Trivia DB computer science.',
    icon: BrainCircuit,
    accent: 'from-emerald-400 to-cyan-500',
  },
};

const getTrackBadgeClass = (trackId, isAMGMode) => {
  if (isAMGMode) {
    return 'bg-red-500/10 text-red-200 border border-red-500/30';
  }

  return trackId === 'general'
    ? 'bg-purple-500/15 text-purple-200 border border-purple-400/30'
    : 'bg-blue-500/15 text-blue-200 border border-blue-400/30';
};

const createQuizState = () => ({
  status: 'idle',
  error: '',
  questions: [],
  currentIndex: 0,
  selectedAnswer: '',
  score: 0,
  timer: QUESTION_TIME,
  isLocked: false,
  answered: 0,
  finished: false,
});

const Trivia = ({ isAMGMode }) => {
  const [view, setView] = useState('select');
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [pendingTrackId, setPendingTrackId] = useState(null);
  const [quiz, setQuiz] = useState(createQuizState);
  const [scoreByTrack, setScoreByTrack] = useState({ general: null, swe: null });
  const [difficultyByTrack, setDifficultyByTrack] = useState({
    general: 'any',
    swe: 'any',
  });

  const activeTrack = activeTrackId ? TRACKS[activeTrackId] : null;
  const currentQuestion = quiz.questions[quiz.currentIndex] || null;
  const totalQuestions = quiz.questions.length || ROUND_SIZE;

  const loadRound = useCallback(async (trackId, { fromButton = false, difficultyOverride } = {}) => {
    setQuiz((prev) => ({
      ...prev,
      status: fromButton && prev.questions.length ? 'refreshing' : 'loading',
      error: '',
      finished: false,
      isLocked: false,
      timer: QUESTION_TIME,
    }));

    try {
      const recentIds = getRecentQuestionIds(trackId);
      const difficulty = difficultyOverride || difficultyByTrack[trackId] || 'any';
      const questions = trackId === 'general'
        ? await fetchGeneralTriviaRound({ recentIds, count: ROUND_SIZE, difficulty })
        : await fetchSweTriviaRound({ recentIds, count: ROUND_SIZE, difficulty });

      pushRecentQuestionIds(trackId, questions.map((item) => item.id));

      setQuiz({
        status: 'ready',
        error: '',
        questions,
        currentIndex: 0,
        selectedAnswer: '',
        score: 0,
        timer: QUESTION_TIME,
        isLocked: false,
        answered: 0,
        finished: false,
      });
    } catch (error) {
      setQuiz((prev) => ({
        ...prev,
        status: 'error',
        error: error.message || 'Could not load questions right now.',
        questions: [],
      }));
    }
  }, [difficultyByTrack]);

  const startTrack = (trackId) => {
    setPendingTrackId(trackId);
    setView('difficulty');
  };

  const chooseDifficulty = (difficulty) => {
    const trackId = pendingTrackId;
    if (!trackId) return;

    setDifficultyByTrack((prev) => ({
      ...prev,
      [trackId]: difficulty,
    }));

    setActiveTrackId(trackId);
    setPendingTrackId(null);
    setView('quiz');
    setQuiz(createQuizState());
    loadRound(trackId, { difficultyOverride: difficulty });
  };

  const goToSelection = () => {
    setView('select');
    setActiveTrackId(null);
    setPendingTrackId(null);
    setQuiz(createQuizState());
  };

  const moveToNextQuestion = useCallback(() => {
    setQuiz((prev) => {
      const isLastQuestion = prev.currentIndex >= prev.questions.length - 1;

      if (isLastQuestion) {
        setScoreByTrack((scores) => ({
          ...scores,
          [activeTrackId]: {
            score: prev.score,
            total: prev.questions.length || ROUND_SIZE,
          },
        }));

        return {
          ...prev,
          finished: true,
          isLocked: true,
          timer: 0,
        };
      }

      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: '',
        isLocked: false,
        timer: QUESTION_TIME,
      };
    });
  }, [activeTrackId]);

  const submitAnswer = useCallback((answerValue) => {
    setQuiz((prev) => {
      if (prev.isLocked || prev.finished) return prev;
      const question = prev.questions[prev.currentIndex];
      if (!question) return prev;

      const isCorrect = answerValue === question.correctAnswer;

      return {
        ...prev,
        selectedAnswer: answerValue,
        isLocked: true,
        score: isCorrect ? prev.score + 1 : prev.score,
        answered: prev.answered + 1,
      };
    });

    window.setTimeout(moveToNextQuestion, 900);
  }, [moveToNextQuestion]);

  useEffect(() => {
    if (view !== 'quiz') return undefined;
    if (quiz.status !== 'ready') return undefined;
    if (quiz.finished || quiz.isLocked) return undefined;

    if (quiz.timer <= 0) {
      submitAnswer('');
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setQuiz((prev) => ({ ...prev, timer: prev.timer - 1 }));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [view, quiz.status, quiz.finished, quiz.isLocked, quiz.timer, submitAnswer]);

  const timerPercent = useMemo(() => {
    if (!quiz.timer || quiz.timer < 0) return 0;
    return Math.max(0, Math.min(100, (quiz.timer / QUESTION_TIME) * 100));
  }, [quiz.timer]);

  return (
    <section id="trivia" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
            <ShieldAlert className={`w-4 h-4 ${isAMGMode ? 'text-red-300' : 'text-purple-400'}`} />
            <span className="text-sm font-medium text-gray-300">Interview Drill Mode</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trivia Lab</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Pick a quiz track, answer 5 timed questions, and see how you score.
          </p>
        </motion.div>

        {view === 'select' && (
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Which type of quiz would you like to do?</h3>
              <p className="text-zinc-400">Choose your track. You can switch any time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(TRACKS).map((track) => {
                const Icon = track.icon;
                const previousScore = scoreByTrack[track.id];
                const selectedDifficulty = difficultyByTrack[track.id] || 'any';

                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => startTrack(track.id)}
                    className={`w-full rounded-3xl border p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isAMGMode
                      ? 'bg-black/65 border-white/10 hover:border-red-400/45 hover:bg-black/75'
                      : 'bg-white/5 border-white/10 hover:border-purple-400/45 hover:bg-white/10'
                      }`}
                    aria-label={`Start ${track.title}`}
                  >
                    <div className="min-h-[280px] flex flex-col items-center justify-center text-center">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] ${getTrackBadgeClass(track.id, isAMGMode)}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {track.shortLabel}
                      </div>

                      <h4 className="text-2xl font-bold text-white mt-4">{track.title}</h4>
                      <p className="text-zinc-300 text-sm mt-2">{track.subtitle}</p>
                      <p className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-sm">{track.description}</p>

                      <div className="mt-5">
                        <p className="text-xs text-zinc-500">
                          Difficulty: {selectedDifficulty === 'any'
                            ? 'Mixed'
                            : `${selectedDifficulty[0].toUpperCase()}${selectedDifficulty.slice(1)}`}
                        </p>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs text-zinc-500">
                          {previousScore === null
                            ? 'No previous score this session.'
                            : `Last score: ${previousScore.score}/${previousScore.total}`}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {view === 'difficulty' && pendingTrackId && (
          <article className={`rounded-3xl border p-6 md:p-8 backdrop-blur-xl shadow-2xl ${isAMGMode ? 'bg-black/65 border-white/10' : 'bg-white/5 border-white/10'}`}>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-zinc-400 text-sm uppercase tracking-[0.18em] mb-3">
                {TRACKS[pendingTrackId].title}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Pick Difficulty
              </h3>
              <p className="text-zinc-400 mb-8">
                Choose your difficulty before starting the quiz.
              </p>

              <div className="max-w-sm mx-auto flex flex-col gap-3 mb-8">
                {DIFFICULTY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => chooseDifficulty(option.value)}
                    className="px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-zinc-200 font-semibold hover:bg-white/10 hover:border-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goToSelection}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <ChevronLeft className="w-4 h-4" />
                Back To Quiz Types
              </button>
            </div>
          </article>
        )}

        {view === 'quiz' && activeTrack && (
          <article className={`rounded-3xl border p-5 md:p-7 backdrop-blur-xl shadow-2xl ${isAMGMode ? 'bg-black/65 border-white/10' : 'bg-white/5 border-white/10'}`}>
            <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <button
                  type="button"
                  onClick={goToSelection}
                  className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back To Quiz Types
                </button>

                <h3 className="text-3xl font-bold text-white">{activeTrack.title}</h3>
                <p className="text-zinc-400 text-sm mt-2">
                  Timed round. Difficulty: {(difficultyByTrack[activeTrack.id] || 'any') === 'any'
                    ? 'Any'
                    : `${difficultyByTrack[activeTrack.id][0].toUpperCase()}${difficultyByTrack[activeTrack.id].slice(1)}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => loadRound(activeTrack.id, { fromButton: true })}
                  disabled={quiz.status === 'loading' || quiz.status === 'refreshing'}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {quiz.status === 'loading' || quiz.status === 'refreshing'
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <RefreshCw className="w-4 h-4" />}
                  New Questions
                </button>
              </div>
            </header>

            {(quiz.status === 'loading' || quiz.status === 'refreshing') && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-300 text-sm">
                {quiz.status === 'loading' ? 'Loading quiz questions...' : 'Refreshing question set...'}
              </div>
            )}

            {quiz.status === 'error' && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-200 text-sm">
                {quiz.error || 'Could not load questions right now.'}
              </div>
            )}

            {quiz.status === 'ready' && currentQuestion && !quiz.finished && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-zinc-200">
                    Question {quiz.currentIndex + 1}/{totalQuestions}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-zinc-200">
                    Score: {quiz.score}
                  </div>
                  <div className={`rounded-xl border px-4 py-2.5 flex items-center gap-2 ${quiz.timer <= 5 ? 'border-red-500/50 bg-red-500/10 text-red-200' : 'border-white/10 bg-white/5 text-zinc-200'}`}>
                    <Clock3 className="w-4 h-4" />
                    {quiz.timer}s
                  </div>
                </div>

                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${activeTrack.accent} transition-all duration-500`}
                    style={{ width: `${timerPercent}%` }}
                  />
                </div>

                <section className="rounded-2xl border border-white/10 bg-black/25 p-5 md:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                    {currentQuestion.category && (
                      <span className="px-2 py-1 rounded-full border border-white/15 text-zinc-300">
                        {currentQuestion.category}
                      </span>
                    )}
                    {currentQuestion.difficulty && (
                      <span className="px-2 py-1 rounded-full border border-white/15 text-zinc-300 capitalize">
                        Difficulty: {currentQuestion.difficulty}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-5">
                    {currentQuestion.question}
                  </h4>

                  <div className="space-y-3" role="radiogroup" aria-label="Answer choices">
                    {currentQuestion.answers.map((answer, index) => {
                      const inputId = `${currentQuestion.id}-${index}`;
                      const checked = quiz.selectedAnswer === answer;
                      const isCorrect = answer === currentQuestion.correctAnswer;

                      return (
                        <div key={inputId}>
                          <input
                            id={inputId}
                            type="radio"
                            name={currentQuestion.id}
                            checked={checked}
                            onChange={() => submitAnswer(answer)}
                            disabled={quiz.isLocked}
                            className="sr-only"
                          />
                          <label
                            htmlFor={inputId}
                            className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition ${quiz.isLocked
                              ? isCorrect
                                ? 'border-green-500/50 bg-green-500/15 text-green-100'
                                : checked
                                  ? 'border-red-500/50 bg-red-500/10 text-red-100'
                                  : 'border-white/10 bg-white/5 text-zinc-300 opacity-80'
                              : checked
                                ? 'border-white/40 bg-white/10 text-white'
                                : 'border-white/10 bg-white/5 text-zinc-200 hover:border-white/30 hover:bg-white/10'
                              } ${quiz.isLocked ? 'cursor-default' : 'focus-within:ring-2 focus-within:ring-white/70'}`}
                          >
                            <span className="text-sm md:text-base leading-relaxed">{answer}</span>
                            {quiz.isLocked && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                            {quiz.isLocked && checked && !isCorrect && <XCircle className="w-4 h-4 shrink-0" />}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            )}

            {quiz.status === 'ready' && quiz.finished && (
              <div className="rounded-2xl border border-white/10 bg-black/25 p-6 md:p-8 text-center">
                <p className="text-zinc-400 text-sm uppercase tracking-[0.18em] mb-3">Round Complete</p>
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-3">{quiz.score}/{totalQuestions}</h4>
                <p className="text-zinc-300 mb-6">You completed the {activeTrack.title} round.</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => loadRound(activeTrack.id, { fromButton: true })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Play Again
                  </button>
                  <button
                    type="button"
                    onClick={goToSelection}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    Choose Another Quiz
                  </button>
                </div>
              </div>
            )}
          </article>
        )}
      </div>
    </section>
  );
};

export default Trivia;
