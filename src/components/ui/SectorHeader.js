import React from 'react';
import { motion } from 'framer-motion';

// Clear section header: short label, big title, one supporting line.
const SectorHeader = ({ label, title, sub, align = 'left', className = '' }) => {
  const centered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`readable mb-10 md:mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <p className="mb-3 font-tele text-[11px] uppercase tracking-[0.28em] text-race-red">
          {label}
        </p>
      )}
      <h2 className="font-display text-4xl uppercase leading-[0.9] tracking-wide text-white md:text-6xl">
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 max-w-2xl leading-7 text-zinc-300 ${centered ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      )}
    </motion.div>
  );
};

export default SectorHeader;
