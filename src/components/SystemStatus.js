import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const techStack = [
  { name: 'React.js Core', status: 'operational' },
  { name: 'WebGL / Three.js', status: 'operational' },
  { name: 'Framer Motion', status: 'operational' },
  { name: 'Tailwind CSS', status: 'operational' },
  { name: 'React Lenis', status: 'operational' },
];

const SystemStatus = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl pointer-events-none hidden md:block"
    >
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
        <Activity className="w-4 h-4 text-purple-400" />
        <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Live Telemetry</span>
      </div>
      
      <div className="space-y-3">
        {techStack.map((tech, i) => (
          <div key={i} className="flex items-center justify-between gap-8">
            <span className="text-[11px] font-mono text-gray-400">{tech.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-green-400 uppercase tracking-wider">{tech.status}</span>
              {/* The glowing pulsing dot */}
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SystemStatus;