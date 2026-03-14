import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Cpu, DollarSign, Kanban, 
  Briefcase, Award, 
  ChevronRight, RefreshCw, Clock, CheckCircle2, ShieldAlert
} from 'lucide-react';

// --- THE EXPERT DATABASE (10+ Questions per Role) ---
const QUESTION_DATABASE = {
  software: [
    { q: "In React Fiber, what specific data structure is used to link fiber nodes for traversal?", a: "Singly Linked List", options: ["Doubly Linked List", "Binary Tree", "Singly Linked List", "Hash Map"] },
    { q: "What is the time complexity of a hash table lookup in the worst-case scenario (collision)?", a: "O(n)", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"] },
    { q: "Which HTTP status code specifically indicates 'I am a teapot' (April Fools RFC)?", a: "418", options: ["404", "418", "420", "503"] },
    { q: "In a distributed system, the CAP theorem states you can only guarantee two of Consistency, Availability, and...", a: "Partition Tolerance", options: ["Performance", "Persistence", "Partition Tolerance", "Privacy"] },
    { q: "What is the result of '2' + 2 in JavaScript?", a: "'22'", options: ["4", "'22'", "NaN", "TypeError"] },
    { q: "Which Git command replays commits from one branch onto another linearly?", a: "git rebase", options: ["git merge", "git cherry-pick", "git rebase", "git stash"] },
    { q: "In Docker, what is the difference between ADD and COPY instructions?", a: "ADD allows URL sources and tar extraction", options: ["They are identical", "COPY is deprecated", "ADD allows URL sources and tar extraction", "COPY is faster"] },
    { q: "Which design pattern restricts the instantiation of a class to one 'single' instance?", a: "Singleton", options: ["Factory", "Observer", "Singleton", "Decorator"] },
    { q: "What prevents a CSRF attack?", a: "Anti-forgery Tokens", options: ["HTTPS", "Anti-forgery Tokens", "CORS", "SQL Sanitization"] },
    { q: "In Python, the Global Interpreter Lock (GIL) prevents what?", a: "Multiple threads executing bytecodes at once", options: ["Memory leaks", "Infinite loops", "Multiple threads executing bytecodes at once", "Network congestion"] },
    { q: "What is 'Hoisting' in JavaScript?", a: "Variable/Function declarations moving to top of scope", options: ["Lifting state up", "Variable/Function declarations moving to top of scope", "API rate limiting", "Garbage collection"] },
    { q: "Which sorting algorithm has the best average-case time complexity?", a: "Merge Sort (O(n log n))", options: ["Bubble Sort", "Insertion Sort", "Merge Sort (O(n log n))", "Selection Sort"] }
  ],
  hardware: [
    { q: "In the JTAG TAP Controller, which state allows shifting data into the Instruction Register?", a: "Shift-IR", options: ["Capture-DR", "Shift-IR", "Update-IR", "Run-Test/Idle"] },
    { q: "What causes 'Setup Time' violations in an FPGA design?", a: "Data arriving too late for the clock edge", options: ["Clock jitter", "Data arriving too late for the clock edge", "Data holding too long after clock edge", "Power supply noise"] },
    { q: "For a transmission line, if the load impedance matches the characteristic impedance, the reflection coefficient is:", a: "0", options: ["1", "-1", "0", "Infinite"] },
    { q: "Which communication protocol requires pull-up resistors on the SDA and SCL lines?", a: "I2C", options: ["SPI", "UART", "I2C", "CAN"] },
    { q: "In a Buck Converter, if the duty cycle (D) is 0.5 and input is 12V, what is the ideal output?", a: "6V", options: ["24V", "6V", "12V", "5V"] },
    { q: "What phenomenon occurs when a digital signal transitions and causes a glitch in an adjacent trace?", a: "Crosstalk", options: ["Ground bounce", "Crosstalk", "Electromigration", "Jitter"] },
    { q: "What is the primary advantage of Differential Signaling (LVDS)?", a: "Noise immunity / Common Mode Rejection", options: ["Higher voltage swing", "Fewer pins required", "Noise immunity / Common Mode Rejection", "Simpler PCB routing"] },
    { q: "In semiconductor physics, what is the 'Band Gap'?", a: "Energy difference between Valence and Conduction bands", options: ["Distance between transistors", "Energy difference between Valence and Conduction bands", "Thermal limit of silicon", "Gate oxide thickness"] },
    { q: "Which type of memory is volatile and requires periodic refreshing?", a: "DRAM", options: ["SRAM", "Flash", "EEPROM", "DRAM"] },
    { q: "Moore's Law originally observed that the number of transistors on a chip doubles every...", a: "2 years", options: ["6 months", "1 year", "2 years", "10 years"] },
    { q: "What does Boundary Scan (IEEE 1149.1) primarily test for?", a: "Interconnect structural faults", options: ["Silicon speed", "Software bugs", "Interconnect structural faults", "Thermal performance"] },
    { q: "What is 'Metastability' in digital logic?", a: "Output hovering between 0 and 1 undefined", options: ["Overheating", "Output hovering between 0 and 1 undefined", "Clock skew", "Short circuit"] }
  ],
  sales: [
    { q: "In MEDDIC, what does the 'E' stand for?", a: "Economic Buyer", options: ["Executive Sponsor", "Economic Buyer", "Engagement", "Enterprise Lead"] },
    { q: "What metric is calculated as: (Customer Lifetime Value) / (Customer Acquisition Cost)?", a: "LTV:CAC Ratio", options: ["Churn Rate", "LTV:CAC Ratio", "NPS", "Gross Margin"] },
    { q: "A 'Redline' document refers to:", a: "A contract undergoing legal revision", options: ["A rejected deal", "A contract undergoing legal revision", "A discount limit", "A territory map"] },
    { q: "What is 'Net Dollar Retention' (NDR)?", a: "% of revenue retained/expanded from existing customers", options: ["Total new sales", "% of revenue retained/expanded from existing customers", "Profit margin", "Sales rep quota attainment"] },
    { q: "Which objection handling technique involves 'Feeling, Felt, Found'?", a: "Empathy & Social Proof", options: ["The Takeaway", "Empathy & Social Proof", "The Boomerang", "Price Anchoring"] },
    { q: "What differentiates a 'SOW' from an 'MSA'?", a: "SOW is project-specific; MSA is the governing agreement", options: ["SOW is legal; MSA is financial", "SOW is project-specific; MSA is the governing agreement", "There is no difference", "MSA is only for software"] },
    { q: "The 'Champion' in a deal is defined as:", a: "Internal stakeholder selling on your behalf", options: ["The CEO", "The person signing the check", "Internal stakeholder selling on your behalf", "Your sales manager"] },
    { q: "What is a 'Clawback' in a commission plan?", a: "Returning commission if the customer churns early", options: ["A bonus for exceeding quota", "Returning commission if the customer churns early", "Expense reimbursement", "Stock options vesting"] },
    { q: "In a 'Land and Expand' strategy, the initial sale is often:", a: "Lower margin / Entry level", options: ["The most expensive SKU", "Lower margin / Entry level", "A multi-year contract", "Services only"] },
    { q: "What does BANT stand for in qualification?", a: "Budget, Authority, Need, Timing", options: ["Budget, Action, Name, Title", "Buy, Analyze, Negotiate, Terminate", "Budget, Authority, Need, Timing", "Business, Area, Net, Total"] },
    { q: "A 'Bluebird' in sales slang refers to:", a: "An easy deal that closes unexpectedly", options: ["A bad prospect", "An easy deal that closes unexpectedly", "A competitor", "A cold call"] }
  ],
  pm: [
    { q: "In the RICE scoring framework, what does 'C' stand for?", a: "Confidence", options: ["Cost", "Complexity", "Confidence", "Customer"] },
    { q: "What is the difference between 'Output' and 'Outcome'?", a: "Output is what you build; Outcome is the value created", options: ["They are synonyms", "Output is value; Outcome is code", "Output is what you build; Outcome is the value created", "Outcome is for engineers"] },
    { q: "Which metric best measures Product-Market Fit according to Sean Ellis?", a: "40% of users would be 'very disappointed' without it", options: ["NPS of 50+", "40% of users would be 'very disappointed' without it", "1M Daily Active Users", "Positive Cash Flow"] },
    { q: "What does 'TAM' stand for in market analysis?", a: "Total Addressable Market", options: ["Total Available Money", "Total Addressable Market", "Target Audience Metric", "Technical Analysis Method"] },
    { q: "In Agile, what does the 'INVEST' mnemonic for User Stories stand for?", a: "Independent, Negotiable, Valuable, Estimable, Small, Testable", options: ["Immediate, New, Viable, Easy, Small, Tech", "Independent, Negotiable, Valuable, Estimable, Small, Testable", "Innovative, Nice, Visual, Eager, Soft, True", "None of these"] },
    { q: "SQL: Which join returns all records when there is a match in either left or right table?", a: "FULL OUTER JOIN", options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"] },
    { q: "What is the 'North Star Metric'?", a: "The single metric that best captures core value delivered", options: ["Revenue", "The single metric that best captures core value delivered", "Stock Price", "User Signups"] },
    { q: "A 'Pre-mortem' meeting is designed to:", a: "Identify potential failure modes before starting", options: ["Review why a project failed", "Celebrate a launch", "Identify potential failure modes before starting", "Assign blame"] },
    { q: "What is 'Dogfooding'?", a: "Using your own product internally", options: ["Testing with pets", "Using your own product internally", "Selling bad products", "Competitor analysis"] },
    { q: "Which pricing strategy involves setting a high price initially and lowering it over time?", a: "Price Skimming", options: ["Penetration Pricing", "Freemium", "Price Skimming", "Cost-Plus"] },
    { q: "In a cohort analysis, what are you primarily tracking?", a: "Retention/Behavior of a specific group over time", options: ["Total website traffic", "Retention/Behavior of a specific group over time", "Server load", "Marketing spend"] }
  ]
};

const ROLES = [
  { id: 'hardware', label: 'Hardware Eng', icon: Cpu, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { id: 'software', label: 'Software Eng', icon: Terminal, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'sales', label: 'Ent. Sales', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 'pm', label: 'Product Mgr', icon: Kanban, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
];

const Trivia = () => {
  const [gameState, setGameState] = useState('ROLE'); // ROLE, PLAYING, RESULT
  const [selectedRole, setSelectedRole] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'

  // Shuffle and pick 10 questions
  const startGame = (role) => {
    setSelectedRole(role);
    const pool = QUESTION_DATABASE[role.id];
    // Shuffle and pick 10
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10)); 
    setGameState('PLAYING');
    setScore(0);
    setCurrentQIndex(0);
    setTimer(15);
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
    const correct = questions[currentQIndex].a;
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
    setFeedback(null);
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
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-linear" style={{ width: `${(timer/15)*100}%` }} />
                
                <h3 className="text-2xl font-medium mb-8 leading-relaxed">
                  {questions[currentQIndex].q}
                </h3>

                <div className="space-y-3">
                  {questions[currentQIndex].options.map((option, idx) => {
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