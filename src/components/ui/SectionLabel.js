import React from 'react';

const SectionLabel = ({ children, isAMGMode, className = '' }) => (
  <div className={`flex items-center gap-2.5 mb-4 ${className}`}>
    <span
      className={`h-px w-8 ${isAMGMode ? 'bg-red-500' : 'bg-purple-400'}`}
    />
    <span className="text-[10px] tracking-[0.24em] uppercase text-zinc-500">
      {children}
    </span>
  </div>
);

export default SectionLabel;
