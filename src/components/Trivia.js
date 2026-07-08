import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  Loader2,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import SectorHeader from './ui/SectorHeader';
import { fetchGeneralTriviaRound, fetchSweTriviaRound } from '../utils/triviaApi';
import { getRecentQuestionIds, pushRecentQuestionIds } from '../utils/triviaUtils';

const ROUND_SIZE = 5;
const QUESTION_TIME = 18;

// Difficulty as tyre compounds
const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'SOFT', sub: 'Easy · max grip', ring: 'border-race-red', text: 'text-race-red' },
  { value: 'medium', label: 'MEDIUM', sub: 'Medium · balanced', ring: 'border-caution', text: 'text-caution' },
  { value: 'hard', label: 'HARD', sub: 'Hard · endurance', ring: 'border-zinc-200', text: 'text-zinc-200' },
  { value: 'any', label: 'INTER', sub: 'Mixed conditions', ring: 'border-green-400', text: 'text-green-400' },
];

const TRACKS = {
  general: {
    id: 'general',
    title: 'GP Trivia',
    shortLabel: 'Q1 · General',
    subtitle: 'Culture, history, science, and broad knowledge.',
    description: 'A broad mix of multiple-choice questions from Open Trivia DB.',
  },
  swe: {
    id: 'swe',
    title: 'Tech Quali',
    shortLabel: 'Q2 · SWE',
    subtitle: 'Programming and software fundamentals.',
    description: 'Technical multiple-choice questions from Open Trivia DB computer science.',
  },
};

const ANSWER_LABELS = ['A', 'B', 'C', 'D'];

const getResultVerdict = (score, total) => {
  const ratio = total > 0 ? score / total : 0;
  if (ratio === 1) return 'POLE POSITION';
  if (ratio >= 0.8) return 'FRONT ROW';
  if (ratio >= 0.6) return 'THROUGH TO Q3';
  if (ratio >= 0.4) return 'MIDFIELD';
  return 'BACK OF THE GRID';
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

const Trivia = () => {
  const [view, setView] = useState('select');
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [pendingTrackId, setPendingTrackId] = useState(null);
  const [quiz, setQuiz] = useState(createQuizState);
  const [scoreByTrack, setScoreByTrack] = useState({ general: null, swe: null });
  const [difficultyByTrack, setDifficultyByTrack] = useState({
    general: 'any',
    swe: 'any',
  });

  // lights-out sequence before each round
  const [lightsPhase, setLightsPhase] = useState('idle'); // idle | running | go | done
  const [litCols, setLitCols] = useState(0);

  const activeTrack = activeTrackId ? TRACKS[activeTrackId] : null;
  const currentQuestion = quiz.questions[quiz.currentIndex] || null;
  const totalQuestions = quiz.questions.length || ROUND_SIZE;

  const loadRound = useCallback(async (trackId, { fromButton = false, difficultyOverride } = {}) => {
    setLightsPhase('idle');
    setLitCols(0);
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

  // run the start-light sequence once a round is loaded
  useEffect(() => {
    if (quiz.status !== 'ready' || quiz.finished) return undefined;

    if (lightsPhase === 'idle') {
      setLightsPhase('running');
      setLitCols(0);
      return undefined;
    }

    if (lightsPhase === 'running') {
      if (litCols < 5) {
        const id = window.setTimeout(() => setLitCols((c) => c + 1), 480);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => setLightsPhase('go'), 750);
      return () => window.clearTimeout(id);
    }

    if (lightsPhase === 'go') {
      const id = window.setTimeout(() => setLightsPhase('done'), 750);
      return () => window.clearTimeout(id);
    }

    return undefined;
  }, [quiz.status, quiz.finished, lightsPhase, litCols]);

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
    setLightsPhase('idle');
    setLitCols(0);
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
    if (lightsPhase !== 'done') return undefined;
    if (quiz.finished || quiz.isLocked) return undefined;

    if (quiz.timer <= 0) {
      submitAnswer('');
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setQuiz((prev) => ({ ...prev, timer: prev.timer - 1 }));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [view, quiz.status, quiz.finished, quiz.isLocked, quiz.timer, lightsPhase, submitAnswer]);

  const timerPercent = useMemo(() => {
    if (!quiz.timer || quiz.timer < 0) return 0;
    return Math.max(0, Math.min(100, (quiz.timer / QUESTION_TIME) * 100));
  }, [quiz.timer]);

  const difficultyLabel = (trackId) => {
    const value = difficultyByTrack[trackId] || 'any';
    const option = DIFFICULTY_OPTIONS.find((o) => o.value === value);
    return option ? option.label : 'INTER';
  };

  return (
    <section id="quali" className="site-section">
      <div className="site-container relative z-10">
        <SectorHeader
          sector="08"
          code="Timed session — 18s per question"
          title="Qualifying"
          sub="Pick a session, wait for lights out, and set a time. Five questions, eighteen seconds each — no track limits."
          align="center"
        />

        {view === 'select' && (
          <div className="readable grid grid-cols-1 gap-5 md:grid-cols-2">
            {Object.values(TRACKS).map((track) => {
              const previousScore = scoreByTrack[track.id];

              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => startTrack(track.id)}
                  className="group w-full border border-white/12 bg-black/70 p-7 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-race-red/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-race-red/80"
                  aria-label={`Start ${track.title}`}
                >
                  <p className="font-tele text-[10px] uppercase tracking-[0.3em] text-race-red">
                    {track.shortLabel}
                  </p>
                  <h4 className="mt-3 font-display text-3xl uppercase text-white md:text-4xl">
                    {track.title}
                  </h4>
                  <p className="mt-3 text-sm text-zinc-300">{track.subtitle}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{track.description}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-4 font-tele text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    <span>
                      Compound: <span className="text-data-blue">{difficultyLabel(track.id)}</span>
                    </span>
                    <span>
                      {previousScore === null
                        ? 'No time set this session'
                        : `Last run: ${previousScore.score}/${previousScore.total}`}
                    </span>
                    <span className="ml-auto text-race-red opacity-0 transition-opacity group-hover:opacity-100">
                      Enter session →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {view === 'difficulty' && pendingTrackId && (
          <div className="readable mx-auto max-w-2xl border border-white/12 bg-black/70 p-7 text-center backdrop-blur-sm md:p-10">
            <p className="font-tele text-[10px] uppercase tracking-[0.3em] text-race-red">
              {TRACKS[pendingTrackId].title}
            </p>
            <h3 className="mt-3 font-display text-3xl uppercase text-white md:text-4xl">
              Select Tyre Compound
            </h3>
            <p className="mt-3 text-sm text-zinc-400">
              Compound choice sets question difficulty for the session.
            </p>

            <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-4">
              {DIFFICULTY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => chooseDifficulty(option.value)}
                  className="group flex flex-col items-center gap-3 border border-white/10 bg-black/50 px-4 py-5 transition hover:border-white/35 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-4 bg-zinc-950 font-tele text-[9px] tracking-[0.08em] text-white ${option.ring}`}
                  >
                    {option.label}
                  </span>
                  <span className={`font-tele text-[10px] uppercase tracking-[0.16em] ${option.text}`}>
                    {option.sub}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={goToSelection}
              className="mt-8 inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-tele text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to sessions
            </button>
          </div>
        )}

        {view === 'quiz' && activeTrack && (
          <div className="readable border border-white/12 bg-black/70 p-5 backdrop-blur-sm md:p-7">
            <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <button
                  type="button"
                  onClick={goToSelection}
                  className="mb-3 inline-flex items-center gap-2 font-tele text-[11px] uppercase tracking-[0.16em] text-zinc-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to sessions
                </button>

                <h3 className="font-display text-3xl uppercase text-white">{activeTrack.title}</h3>
                <p className="mt-1 font-tele text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  Timed session · Compound: {difficultyLabel(activeTrack.id)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => loadRound(activeTrack.id, { fromButton: true })}
                disabled={quiz.status === 'loading' || quiz.status === 'refreshing'}
                className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-tele text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {quiz.status === 'loading' || quiz.status === 'refreshing'
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <RefreshCw className="h-4 w-4" />}
                New questions
              </button>
            </header>

            {(quiz.status === 'loading' || quiz.status === 'refreshing') && (
              <div className="border border-white/10 bg-white/5 p-5 font-tele text-xs uppercase tracking-[0.14em] text-zinc-300">
                {quiz.status === 'loading' ? 'Loading session…' : 'Refreshing question set…'}
              </div>
            )}

            {quiz.status === 'error' && (
              <div className="border border-race-red/40 bg-race-red/10 p-5 text-sm text-red-200">
                {quiz.error || 'Could not load questions right now.'}
              </div>
            )}

            {/* lights out */}
            {quiz.status === 'ready' && !quiz.finished && lightsPhase !== 'done' && (
              <div className="flex flex-col items-center gap-8 py-14">
                <div className="flex gap-4 rounded-xl border border-white/12 bg-black/80 px-6 py-5">
                  {[0, 1, 2, 3, 4].map((col) => (
                    <div key={col} className="flex flex-col gap-2.5">
                      {[0, 1].map((row) => (
                        <span
                          key={row}
                          className={`start-light h-5 w-5 rounded-full bg-zinc-800 md:h-7 md:w-7 ${
                            lightsPhase === 'running' && col < litCols ? 'lit' : ''
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <p className="font-display text-2xl uppercase tracking-wide md:text-4xl">
                  {lightsPhase === 'go' ? (
                    <span className="text-race-red">Lights out — go go go!</span>
                  ) : (
                    <span className="text-zinc-400">Waiting for lights…</span>
                  )}
                </p>
              </div>
            )}

            {quiz.status === 'ready' && currentQuestion && !quiz.finished && lightsPhase === 'done' && (
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-3 font-tele text-xs uppercase tracking-[0.12em]">
                  <div className="border border-white/10 bg-black/50 px-4 py-2.5 text-zinc-300">
                    Lap {quiz.currentIndex + 1}/{totalQuestions}
                  </div>
                  <div className="border border-white/10 bg-black/50 px-4 py-2.5 text-data-blue">
                    Score {quiz.score}
                  </div>
                  <div
                    className={`border px-4 py-2.5 ${
                      quiz.timer <= 5
                        ? 'border-race-red/60 bg-race-red/10 text-race-red'
                        : 'border-white/10 bg-black/50 text-zinc-300'
                    }`}
                  >
                    ⏱ {quiz.timer}s
                  </div>
                </div>

                <div className="h-1.5 overflow-hidden bg-white/10">
                  <div
                    className={`h-full transition-all duration-500 ${
                      quiz.timer <= 5 ? 'bg-race-red' : 'bg-data-blue'
                    }`}
                    style={{ width: `${timerPercent}%` }}
                  />
                </div>

                <div className="border border-white/10 bg-black/40 p-5 md:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 font-tele text-[10px] uppercase tracking-[0.14em]">
                    {currentQuestion.category && (
                      <span className="border border-white/15 px-2 py-1 text-zinc-400">
                        {currentQuestion.category}
                      </span>
                    )}
                    {currentQuestion.difficulty && (
                      <span className="border border-white/15 px-2 py-1 capitalize text-zinc-400">
                        {currentQuestion.difficulty}
                      </span>
                    )}
                  </div>

                  <h4 className="mb-5 text-xl font-semibold leading-relaxed text-white md:text-2xl">
                    {currentQuestion.question}
                  </h4>

                  <div
                    className="grid grid-cols-1 gap-3 md:grid-cols-2"
                    role="radiogroup"
                    aria-label="Answer choices"
                  >
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
                            className={`flex min-h-[104px] cursor-pointer items-start justify-between gap-4 border px-4 py-4 transition ${quiz.isLocked
                              ? isCorrect
                                ? 'border-green-500/60 bg-green-500/15 text-green-100'
                                : checked
                                  ? 'border-race-red/60 bg-race-red/10 text-red-100'
                                  : 'border-white/10 bg-white/5 text-zinc-300 opacity-80'
                              : checked
                                ? 'border-white/40 bg-white/10 text-white'
                                : 'border-white/10 bg-white/5 text-zinc-200 hover:border-white/30 hover:bg-white/10'
                              } ${quiz.isLocked ? 'cursor-default' : 'focus-within:ring-2 focus-within:ring-white/70'}`}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center border font-tele text-xs font-semibold ${
                                  quiz.isLocked
                                    ? isCorrect
                                      ? 'border-green-400/50 bg-green-500/20 text-green-100'
                                      : checked
                                        ? 'border-race-red/50 bg-race-red/15 text-red-100'
                                        : 'border-white/10 bg-white/5 text-zinc-400'
                                    : checked
                                      ? 'border-white/40 bg-white/15 text-white'
                                      : 'border-white/10 bg-white/5 text-zinc-400'
                                }`}
                              >
                                {ANSWER_LABELS[index] || index + 1}
                              </span>
                              <span className="text-sm leading-relaxed md:text-base">
                                {answer}
                              </span>
                            </div>
                            <div className="pt-1">
                              {quiz.isLocked && isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                              {quiz.isLocked && checked && !isCorrect && <XCircle className="h-4 w-4 shrink-0" />}
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {quiz.status === 'ready' && quiz.finished && (
              <div className="border border-white/10 bg-black/40 p-6 text-center md:p-8">
                <p className="font-tele text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                  Session complete — provisional classification
                </p>
                <h4 className="mt-4 font-display text-5xl text-data-blue md:text-6xl">
                  {quiz.score}/{totalQuestions}
                </h4>
                <p className="mt-3 font-display text-xl uppercase tracking-wide text-caution md:text-2xl">
                  {getResultVerdict(quiz.score, totalQuestions)}
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => loadRound(activeTrack.id, { fromButton: true })}
                    className="btn-primary inline-flex items-center gap-2 border px-5 py-2.5 font-tele text-[11px] uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Run it again
                  </button>
                  <button
                    type="button"
                    onClick={goToSelection}
                    className="inline-flex items-center gap-2 border border-white/15 px-5 py-2.5 font-tele text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    Choose another session
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trivia;
