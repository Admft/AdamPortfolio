import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const specs = [
  { label: 'Role', value: 'Forward Deployed Engineer' },
  { label: 'Based in', value: 'Dallas, TX' },
  { label: 'Cloud', value: 'Azure AZ-900' },
  { label: 'Loop', value: 'Discover · Build · Deploy' },
];

const Hero = ({ trackMode = false }) => (
  <section
    id="grid"
    className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 pb-20"
  >
    <div
      aria-hidden
      className="ghost-outline pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display leading-none"
      style={{ fontSize: 'clamp(16rem, 42vw, 40rem)' }}
    >
      63
    </div>

    <div className="site-container relative w-full">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="readable mb-6 font-tele text-[11px] uppercase tracking-[0.28em] text-race-red"
      >
        {trackMode ? 'Track mode · Car 63' : 'Portfolio · Adam Moffat'}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display uppercase leading-[0.84]"
        style={{ fontSize: 'clamp(4.2rem, 15vw, 13.5rem)' }}
      >
        <span className="headline-solid block">Adam</span>
        <span className="headline-red block">Moffat</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="readable mt-6 max-w-xl text-base leading-7 text-zinc-300 md:text-lg"
      >
        Forward Deployed Engineer turning ambiguous customer problems into deployed
        software — from discovery and prototyping to production debugging and product
        feedback.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="readable mt-12 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 md:grid-cols-4"
      >
        {specs.map((spec) => (
          <div key={spec.label}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{spec.label}</p>
            <p className="mt-1 text-sm text-data-blue md:text-[15px]">{spec.value}</p>
          </div>
        ))}
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5 text-race-red" />
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
