import React, { useState, useEffect } from 'react';
import { Stars, Trophy, Loader, AlertCircle, ArrowRight, Play, RefreshCw } from 'lucide-react';

const ShootingStar = () => (
  <div 
    className="shooting-star absolute h-0.5 w-16 bg-gradient-to-r from-purple-400 via-white to-transparent rounded-full"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `rotate(${45 + Math.random() * 10}deg)`,
      animation: `shootingStarAnimation ${2 + Math.random() * 3}s linear infinite`,
      animationDelay: `${Math.random() * 5}s`
    }}
  />
);

function Trivia() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);

    async function fetchQuestions() {
        try {
            setIsLoading(true);
            const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
            const data = await response.json();
            if (data.results) {
                setQuestions(data.results);
            }
        } catch (error) {
            setError("Failed to load questions");
            console.error("Error fetching questions:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const startGame = async () => {
        setGameStarted(true);
        setScore(0);
        await fetchQuestions();
    };

    function decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    if (!gameStarted) {
        return (
            <section id="trivia" className="min-h-screen pt-24 p-8 bg-black text-white relative overflow-hidden">
                {/* Shooting Stars */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <ShootingStar key={`shooting-star-${i}`} />
                ))}
                
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
                    {Array.from({ length: 50 }).map((_, i) => (
                        <Stars
                            key={i}
                            className="absolute animate-pulse text-white/10"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                transform: `scale(${0.3 + Math.random()})`,
                            }}
                            size={16}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-xl mx-auto backdrop-blur-lg bg-purple-950/10 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5 text-center">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">
                        Trivia Challenge
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Embark on an intergalactic journey of knowledge! Test your wisdom across the universe of questions.
                    </p>
                    <button 
                        onClick={startGame}
                        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                        <div className="relative flex items-center gap-2">
                            <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-semibold group-hover:translate-x-0.5 transition-transform duration-300">
                                Start Adventure
                            </span>
                        </div>
                    </button>
                </div>
            </section>
        );
    }

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <Loader className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <AlertCircle className="w-8 h-8 text-red-400 mr-2" />
            <span>{error}</span>
        </div>
    );

    if (!questions || questions.length === 0) return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            No questions available
        </div>
    );

    if (currentQuestionIndex >= questions.length) {
        return (
            <section id="trivia" className="min-h-screen pt-24 p-8 bg-black text-white relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
                    {Array.from({ length: 50 }).map((_, i) => (
                        <Stars
                            key={i}
                            className="absolute animate-pulse text-white/10"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                transform: `scale(${0.3 + Math.random()})`,
                            }}
                            size={16}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-xl mx-auto backdrop-blur-lg bg-purple-950/10 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5 text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-6 text-purple-400" />
                    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">
                        Journey Complete!
                    </h2>
                    <p className="text-gray-300 mb-6">
                        Final Score: {score} / {questions.length}
                    </p>
                    <button 
                        onClick={() => {
                            setCurrentQuestionIndex(0);
                            setFeedback('');
                            setScore(0);
                            fetchQuestions();
                        }}
                        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                        <div className="relative flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-semibold group-hover:translate-x-0.5 transition-transform duration-300">
                                Play Again
                            </span>
                        </div>
                    </button>
                </div>
            </section>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
        .sort(() => Math.random() - 0.5);

    const handleAnswer = (selectedAnswer) => {
        const correctAnswer = currentQuestion.correct_answer;
        if (selectedAnswer === correctAnswer) {
            setFeedback("Correct!");
            setScore(prev => prev + 1);
        } else {
            setFeedback(`Incorrect! The correct answer was: ${decodeHTML(correctAnswer)}`);
        }
    };

    const handleNext = () => {
        setCurrentQuestionIndex(prev => prev + 1);
        setFeedback('');
    };

    return (
        <section id="trivia" className="min-h-screen pt-24 p-8 bg-black text-white relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
                {Array.from({ length: 50 }).map((_, i) => (
                    <Stars
                        key={i}
                        className="absolute animate-pulse text-white/10"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            transform: `scale(${0.3 + Math.random()})`,
                        }}
                        size={16}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-xl mx-auto">
                {/* Score Display */}
                <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/30 border border-purple-500/20">
                        <Trophy className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">Score: {score} / {currentQuestionIndex}</span>
                    </span>
                </div>

                {/* Question Card */}
                <div className="backdrop-blur-lg bg-purple-950/10 rounded-xl p-8 border border-purple-500/20 shadow-lg shadow-purple-500/5">
                    <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                        {decodeHTML(currentQuestion.question)}
                    </p>
                    <div className="space-y-3">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => !feedback && handleAnswer(option)}
                                disabled={!!feedback}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                                    feedback 
                                        ? option === currentQuestion.correct_answer
                                            ? 'bg-green-500/20 border-green-500/40'
                                            : 'bg-purple-950/20 border-purple-500/20'
                                        : 'bg-purple-950/20 border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-900/30'
                                } ${feedback && option === currentQuestion.correct_answer ? 'border border-green-500/40' : ''}`}
                            >
                                {decodeHTML(option)}
                            </button>
                        ))}
                    </div>

                    {/* Feedback and Next Button */}
                    {feedback && (
                        <div className="mt-6 space-y-4">
                            <p className={`text-center text-lg ${
                                feedback.startsWith('Correct') ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {feedback}
                            </p>
                            <button 
                                onClick={handleNext}
                                className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                                <div className="relative flex items-center gap-2">
                                    <span className="font-semibold group-hover:translate-x-0.5 transition-transform duration-300">
                                        Next Question
                                    </span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Shooting Stars Animation Styles */}
            <style jsx>{`
                @keyframes shootingStarAnimation {
                    0% {
                        transform: translateX(-100%) translateY(-100%) rotate(45deg);
                        opacity: 1;
                    }
                    20% {
                        opacity: 1;
                    }
                    60% {
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(200%) translateY(200%) rotate(45deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    );
}

export default Trivia;