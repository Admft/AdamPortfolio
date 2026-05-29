import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';

const SectionHeader = ({
  eyebrow,
  title,
  description,
  isAMGMode,
  align = 'left',
  className = '',
}) => {
  const centered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-6 md:mb-8 ${centered ? 'text-center' : ''} ${className}`}
    >
      <SectionLabel isAMGMode={isAMGMode} className={centered ? 'justify-center' : ''}>
        {eyebrow}
      </SectionLabel>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-zinc-400 leading-7 max-w-2xl ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
