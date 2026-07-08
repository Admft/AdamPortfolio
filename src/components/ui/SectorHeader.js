import React from 'react';
import { motion } from 'framer-motion';

// Race-control style section header: SECTOR NN ——— CODE, then a huge title.
const SectorHeader = ({ sector, code, title, sub, align = 'left', className = '' }) => {
  const centered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`readable mb-10 md:mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}>
        <span className="font-tele text-[10px] tracking-[0.32em] text-race-red uppercase shrink-0">
          Sector {sector}
        </span>
        <span className={`h-px bg-white/10 ${centered ? 'w-10' : 'flex-1'}`} />
        <span className="font-tele text-[10px] tracking-[0.32em] text-zinc-500 uppercase shrink-0">
          {code}
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl uppercase text-white leading-[0.9] tracking-wide">
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-zinc-300 leading-7 max-w-2xl ${centered ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      )}
    </motion.div>
  );
};

export default SectorHeader;
