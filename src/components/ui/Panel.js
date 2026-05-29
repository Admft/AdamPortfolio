import React from 'react';
import { motion } from 'framer-motion';

const Panel = ({
  children,
  className = '',
  delay = 0,
  isAMGMode,
  glow = false,
  as: Tag = motion.div,
  ...props
}) => (
  <Tag
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ type: 'spring', stiffness: 320, damping: 28, delay }}
    className={[
      'panel',
      glow ? 'panel-glow' : '',
      isAMGMode ? 'panel-amg' : 'panel-base',
      className,
    ].join(' ')}
    {...props}
  >
    {children}
  </Tag>
);

export default Panel;
