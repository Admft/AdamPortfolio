import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const LIGHT_INTERVAL = 520;

const specs = [
  { label: 'TEAM', value: 'VUSIONGROUP' },
  { label: 'BASE', value: 'DALLAS, TX' },
  { label: 'LICENCE', value: 'AZURE AZ-900' },
  { label: 'DISCIPLINES', value: 'CLOUD · AI · SOFTWARE' },
];

const Hero = () => {
  const [litCount, setLitCount] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);

  useEffect(() => {
    if (litCount < 5) {
      const id = window.setTimeout(() => setLitCount((c) => c + 1), LIGHT_INTERVAL);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setLightsOut(true), 950);
    return () => window.clearTimeout(id);
  }, [litCount]);

  return (
    <section
      id="grid"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 pb-20"
    >
      {/* giant ghost car number behind everything */}
      <div
        aria-hidden
        className="ghost-outline pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display leading-none"
        style={{ fontSize: 'clamp(16rem, 42vw, 40rem)' }}
      >
        63
      </div>

      <div className="site-container relative w-full">
        {/* race control strip */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="readable mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-tele text-[10px] uppercase tracking-[0.3em] text-zinc-400"
        >
          <span className="text-race-red">Round 07 — Dallas GP</span>
          <span className="hidden sm:inline text-zinc-600">{'///'}</span>
          <span>Grid Slot P1</span>
          <span className="hidden sm:inline text-zinc-600">{'///'}</span>
          <span className="text-data-blue">Car 63 — A. Moffat</span>
        </motion.div>

        {/* the name — solid, oversized, straight over the car */}
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
          className="readable mt-6 max-w-xl font-tele text-xs md:text-sm uppercase tracking-[0.22em] leading-6 text-zinc-200"
        >
          Solutions Engineer <span className="text-caution">{'//'}</span> Azure pipelines,
          RAG systems, full-stack tools <span className="text-caution">{'//'}</span> deployed
          in the field, defensible in the data.
        </motion.p>

        {/* start lights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center gap-5"
        >
          <div className="flex gap-2.5 rounded-lg border border-white/10 bg-black/70 px-3.5 py-2.5">
            {[0, 1, 2, 3, 4].map((col) => (
              <div key={col} className="flex flex-col gap-1.5">
                {[0, 1].map((row) => (
                  <span
                    key={row}
                    className={`start-light h-3 w-3 rounded-full bg-zinc-800 ${
                      !lightsOut && col < litCount ? 'lit' : ''
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
          <p className="readable font-tele text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            {lightsOut ? (
              <span className="text-caution">Lights out — scroll to launch</span>
            ) : (
              'Waiting for lights…'
            )}
          </p>
        </motion.div>

        {/* grid spec strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="readable mt-14 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 md:grid-cols-4"
        >
          {specs.map((spec) => (
            <div key={spec.label}>
              <p className="font-tele text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                {spec.label}
              </p>
              <p className="mt-1 font-tele text-xs md:text-sm text-data-blue">{spec.value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: lightsOut ? 1 : 0.35 }}
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
};

export default Hero;
