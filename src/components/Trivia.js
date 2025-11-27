import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Cpu, 
  Loader2 
} from 'lucide-react';

function Trivia() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);

    // Decode HTML entities from API
    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    async function fetchQuestions() {
        try {
            setIsLoading(true);
            const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple&category=18'); // Category 18 is Computers/CS
            const data = await response.json();
            if (data.results) {
                setQuestions(data.results);
                setGameStarted(true);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAnswer = (selectedAnswer) => {
        const currentQ = questions[currentQuestionIndex];
        if (selectedAnswer === currentQ.correct_answer) {
            setFeedback('correct');
            setScore(prev => prev + 1);
        } else {
            setFeedback('incorrect');
        }
    };

    const handleNext = () => {
        setFeedback('');
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const resetGame = () => {
        setGameStarted(false);
        setScore(0);
        setCurrentQuestionIndex(0);
        setFeedback('');
        setQuestions([]);
    };

    // --- RENDER STATES ---

    // 1. Start Screen
    if (!gameStarted) {
        return (
            <section id="trivia" className="min-h-[80vh] flex items-center justify-center py-20 px-6 relative">
                <div className="max-w-2xl w-full">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-12 text-center relative overflow-hidden group"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="p-4 bg-purple-500/10 rounded-2xl mb-6 ring-1 ring-purple-500/20">
                                <Brain className="w-12 h-12 text-purple-400" />
                            </div>
                            
                            <h2 className="text-4xl font-bold mb-4">System Knowledge Check</h2>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Initialize the calibration sequence. Test your technical knowledge against the global database.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={fetchQuestions}
                                disabled={isLoading}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Terminal className="w-5 h-5" />
                                )}
                                <span>{isLoading ? 'Initializing...' : 'Execute Protocol'}</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    // 2. Game Over Screen
    if (currentQuestionIndex >= questions.length) {
        return (
            <section id="trivia" className="min-h-[80vh] flex items-center justify-center py-20 px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-xl w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 text-center"
                >
                    <div className="mb-6 inline-flex p-4 rounded-full bg-green-500/10 text-green-400 ring-1 ring-green-500/20">
                        <Cpu className="w-10 h-10" />
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-2">Sequence Complete</h2>
                    <p className="text-gray-400 mb-8">Performance Analysis Report</p>
                    
                    <div className="flex justify-center items-end gap-2 mb-8">
                        <span className="text-6xl font-bold text-white">{score}</span>
                        <span className="text-xl text-gray-500 mb-2">/ {questions.length}</span>
                    </div>

                    <div className="w-full bg-white/5 rounded-full h-4 mb-8 overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(score / questions.length) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                    </div>

                    <button 
                        onClick={resetGame}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-medium"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Re-run Diagnostics
                    </button>
                </motion.div>
            </section>
        );
    }

    // 3. Active Game Screen
    const currentQ = questions[currentQuestionIndex];
    const answers = [...currentQ.incorrect_answers, currentQ.correct_answer].sort();

    return (
        <section id="trivia" className="min-h-[80vh] flex items-center justify-center py-20 px-6">
            <div className="max-w-4xl w-full">
                {/* Header / Progress */}
                <div className="flex items-center justify-between mb-8 text-sm font-mono text-gray-500">
                    <span>QUERY_ID: {currentQuestionIndex + 1} / {questions.length}</span>
                    <span>SCORE: {score}</span>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl"
                    >
                        <h3 className="text-2xl md:text-3xl font-medium mb-8 leading-tight">
                            {decodeHTML(currentQ.question)}
                        </h3>

                        <div className="grid gap-4">
                            {answers.map((answer, idx) => {
                                const isCorrect = answer === currentQ.correct_answer;
                                const isSelected = feedback && isCorrect; // Highlight correct answer if feedback is active
                                
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => !feedback && handleAnswer(answer)}
                                        disabled={!!feedback}
                                        className={`group relative p-6 text-left rounded-xl border transition-all duration-200 
                                            ${feedback 
                                                ? isCorrect 
                                                    ? 'bg-green-500/10 border-green-500/50 text-green-200'
                                                    : 'bg-white/5 border-transparent opacity-50'
                                                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-purple-500/30'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg">{decodeHTML(answer)}</span>
                                            {feedback && isCorrect && <CheckCircle2 className="text-green-400" />}
                                            {feedback === 'incorrect' && answer !== currentQ.correct_answer && feedback && <XCircle className="text-red-400 opacity-0" />} 
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Feedback / Next Action */}
                        <AnimatePresence>
                            {feedback && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between"
                                >
                                    <div className={`flex items-center gap-2 ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                                        {feedback === 'correct' ? (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                <span className="font-mono">CORRECT_INPUT</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-5 h-5" />
                                                <span className="font-mono">INVALID_INPUT</span>
                                            </>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        Next Query <ChevronRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

export default Trivia;