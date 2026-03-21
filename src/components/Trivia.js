import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Cpu, DollarSign, Kanban,
  Briefcase, Award,
  ChevronRight, RefreshCw, Clock, CheckCircle2, ShieldAlert
} from 'lucide-react';



const ROLES = [
  {
    id: 'technical',
    label: 'Technical',
    apiCategories: [18, 17], // computers + science
    icon: Terminal,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    id: 'general',
    label: 'General',
    apiCategories: [9], // general knowledge
    icon: Briefcase,
    color: 'text-zinc-300',
    bg: 'bg-white/5',
    border: 'border-white/10',
  },
];

const decodeHtml = (str) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};

const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Trivia = () => {
  const [gameState, setGameState] = useState('ROLE'); // ROLE, PLAYING, RESULT
  const [selectedRole, setSelectedRole] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Shuffle and pick 10 questions
  const startGame = async (role) => {
    setLoading(true);
    setError('');
    setSelectedRole(role);
    setScore(0);
    setCurrentQIndex(0);
    setTimer(15);
    setFeedback(null);

    try {
      const category =
        role.apiCategories[Math.floor(Math.random() * role.apiCategories.length)];

      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch trivia questions.');
      }

      const data = await res.json();

      if (data.response_code !== 0 || !data.results?.length) {
        throw new Error('No trivia questions were returned.');
      }

      const normalizedQuestions = data.results.map((item) => {
        const correct = decodeHtml(item.correct_answer);
        const options = shuffleArray([
          correct,
          ...item.incorrect_answers.map((ans) => decodeHtml(ans)),
        ]);

        return {
          q: decodeHtml(item.question),
          a: correct,
          options,
        };
      });

      setQuestions(normalizedQuestions);
      setGameState('PLAYING');
    } catch (err) {
      setError(err.message || 'Something went wrong loading trivia.');
      setGameState('ROLE');
    } finally {
      setLoading(false);
    }
  };

  // Timer Logic
  useEffect(() => {
    let interval;
    if (gameState === 'PLAYING' && timer > 0 && !feedback) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0 && !feedback) {
      handleAnswer(null); // Time out
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, timer, feedback]);

  const handleAnswer = (answer) => {
    const correct = questions[currentQIndex]?.a;
    if (!correct) return;
    if (answer === correct) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    // Delay for animation then next question
    setTimeout(() => {
      setFeedback(null);
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setTimer(15); // Reset timer
      } else {
        setGameState('RESULT');
      }
    }, 1500);
  };

  const reset = () => {
    setGameState('ROLE');
    setSelectedRole(null);
    setQuestions([]);
    setCurrentQIndex(0);
    setScore(0);
    setTimer(15);
    setFeedback(null);
    setLoading(false);
    setError('');
  };

  return (
    <section id="trivia" className="py-20 px-6 relative overflow-hidden flex flex-col items-center">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4"
          >
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Technical Competency Exam</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Specialization</span>
          </h2>
          <p className="text-gray-400">10 Industry-Standard Questions. No easy mode.</p>
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 1: CHOOSE ROLE */}
          {gameState === 'ROLE' && (

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}


              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {loading && (
                <div className="text-center text-gray-400 mb-6">
                  Loading trivia questions...
                </div>
              )}

              {error && (
                <div className="text-center text-red-400 mb-6">
                  {error}
                </div>
              )}
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => startGame(role)}
                  className={`group relative p-6 rounded-2xl border ${role.border} ${role.bg} hover:bg-opacity-20 transition-all duration-300 text-left`}
                >
                  <role.icon className={`w-10 h-10 ${role.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold text-white mb-1">{role.label}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Start Exam</p>
                  <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                </button>
              ))}
            </motion.div>
          )}

          {/* STEP 2: GAMEPLAY */}
          {gameState === 'PLAYING' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              {/* Game HUD */}
              <div className="flex justify-between items-center mb-8 px-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedRole.bg}`}>
                    <selectedRole.icon className={`w-5 h-5 ${selectedRole.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{selectedRole.label}</p>
                    <p className="text-sm font-bold text-white">Technical Interview</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-mono text-gray-400">
                    <span>Q {currentQIndex + 1}/10</span>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${timer < 5 ? 'border-red-500 text-red-400 bg-red-500/10' : 'border-white/10 text-white bg-white/5'}`}>
                    <Clock className="w-4 h-4" />
                    <span className="font-mono font-bold">{timer}s</span>
                  </div>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-linear" style={{ width: `${(timer / 15) * 100}%` }} />

                <h3 className="text-2xl font-medium mb-8 leading-relaxed">
                  {questions[currentQIndex]?.q}
                </h3>

                <div className="space-y-3">
                  {questions[currentQIndex]?.options?.map((option, idx) => {
                    return (
                      <button
                        key={idx}
                        disabled={!!feedback}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-4 text-left rounded-xl border transition-all duration-200 flex justify-between items-center
                          ${feedback
                            ? option === questions[currentQIndex].a
                              ? 'bg-green-500/20 border-green-500 text-green-200'
                              : 'opacity-50 border-transparent bg-white/5'
                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-purple-500/40'
                          }
                        `}
                      >
                        {option}
                        {feedback && option === questions[currentQIndex].a && <CheckCircle2 className="text-green-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: RESULTS */}
          {gameState === 'RESULT' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl"
            >
              <div className="mb-6 inline-flex p-6 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-6">
                {score >= 7 ? <Award className="w-16 h-16 text-yellow-400" /> : <ShieldAlert className="w-16 h-16 text-gray-400" />}
              </div>

              <h2 className="text-3xl font-bold mb-2">
                {score >= 7 ? 'Candidate Accepted' : 'Candidate Rejected'}
              </h2>
              <p className="text-gray-400 mb-8">
                {score >= 7
                  ? `Impressive technical depth. You scored above the bar.`
                  : "Technical knowledge did not meet the requirement threshold."}
              </p>

              <div className="flex justify-center gap-8 mb-8 text-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Score</p>
                  <p className="text-3xl font-bold">{score} / 10</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Track</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{selectedRole.label}</p>
                </div>
              </div>

              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                New Exam
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

export default Trivia;