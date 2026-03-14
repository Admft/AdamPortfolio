import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, GripHorizontal, ChevronUp, ChevronDown } from 'lucide-react';

const techStack = [
  { name: 'React.js Core', status: 'operational' },
  { name: 'WebGL / Three.js', status: 'operational' },
  { name: 'Framer Motion', status: 'operational' },
  { name: 'Tailwind CSS', status: 'operational' },
];

const SystemStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Dynamically track window size to create perfect boundary walls
  useEffect(() => {
    const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', updateSize);
    updateSize(); // Set initial size
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Calculate constraints based on window size minus the widget's approximate size and padding
  const constraints = {
    left: -(windowSize.width - 280), // 280 accounts for widget width + padding
    right: 0,
    top: -(windowSize.height - 220), // 220 accounts for widget height + padding
    bottom: 0
  };

  return (
    <>
      {/* DESKTOP: Draggable Widget */}
      <motion.div 
        drag 
        dragConstraints={windowSize.width > 0 ? constraints : { left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false} // Prevents throwing it off screen
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        // touch-none prevents cross-browser scrolling bugs when dragging
        className="fixed bottom-6 right-6 z-50 bg-black/70 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing hidden md:block w-64 touch-none"
      >
        <div className="flex justify-center mb-2 opacity-30 hover:opacity-100 transition-opacity">
          <GripHorizontal className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
          <Activity className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Live Telemetry</span>
        </div>
        
        <div className="space-y-2.5">
          {techStack.map((tech, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-mono text-gray-400 truncate">{tech.name}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[9px] font-mono text-green-400 uppercase tracking-wider">{tech.status}</span>
                <div className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* MOBILE: Expandable Pill */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex flex-col items-end pointer-events-none">
        <motion.div 
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl mb-2 overflow-hidden pointer-events-auto"
        >
          <div className="p-4 space-y-3">
             <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Telemetry</span>
            </div>
            {techStack.map((tech, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400">{tech.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-green-400 uppercase tracking-wider">{tech.status}</span>
                  <div className="relative flex h-1.5 w-1.5">
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl pointer-events-auto active:scale-95 transition-transform"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-[10px] font-mono text-white tracking-widest uppercase">System: Green</span>
          {isOpen ? <ChevronDown className="w-3 h-3 text-gray-400" /> : <ChevronUp className="w-3 h-3 text-gray-400" />}
        </button>
      </div>
    </>
  );
};

export default SystemStatus;