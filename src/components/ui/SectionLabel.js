import React from 'react';

const SectionLabel = ({ children, isAMGMode, className = '' }) => (
  <div className={`flex items-center gap-3 mb-5 ${className}`}>
    <span
      className={`h-[2px] w-10 rounded-full ${
        isAMGMode ? 'bg-red-500' : 'bg-purple-400'
      }`}
    />
    <span className="text-[11px] tracking-[0.28em] uppercase text-zinc-400">
      {children}
    </span>
  </div>
);

export default SectionLabel;
