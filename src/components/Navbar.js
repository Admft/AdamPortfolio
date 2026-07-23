import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ trackMode, onTrackModeToggle, isStatsPage = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const prefix = isStatsPage ? '/' : '';
  const navLinks = [
    { name: 'About', href: `${prefix}#about` },
    { name: 'Experience', href: `${prefix}#experience` },
    { name: 'Skills', href: `${prefix}#skills` },
    { name: 'Research', href: `${prefix}#research` },
    { name: 'Projects', href: `${prefix}#projects` },
    { name: 'Contact', href: `${prefix}#contact` },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="site-container flex items-center justify-between px-6 py-3.5">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center bg-race-red font-display text-base leading-none text-white">
              63
            </span>
            <span className="font-display text-lg uppercase tracking-wide text-white">
              Moffat
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium tracking-wide text-zinc-400 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={onTrackModeToggle}
              className={`ml-1 flex items-center gap-2 border px-3.5 py-1.5 font-tele text-[10px] uppercase tracking-[0.2em] transition-all ${
                trackMode
                  ? 'border-race-red bg-race-red/90 text-white'
                  : 'border-white/15 bg-black/40 text-zinc-300 hover:border-race-red/60 hover:text-white'
              }`}
              aria-pressed={trackMode}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  trackMode ? 'bg-white lamp-on' : 'bg-zinc-500'
                }`}
              />
              Track Mode
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="border border-white/10 px-3 py-1.5 text-[13px] text-zinc-300 md:hidden"
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-5 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-3xl uppercase text-white hover:text-race-red"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={() => {
                  onTrackModeToggle();
                  setIsOpen(false);
                }}
                className={`mx-auto mt-2 border px-5 py-2.5 font-tele text-xs uppercase tracking-[0.2em] ${
                  trackMode
                    ? 'border-race-red bg-race-red text-white'
                    : 'border-white/15 bg-black/40 text-zinc-300'
                }`}
              >
                {trackMode ? 'Exit Track Mode' : 'Enter Track Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
