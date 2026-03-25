import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isAMGMode, setIsAMGMode, isStatsPage = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: isStatsPage ? '/#about' : '#about' },
    { name: 'Projects', href: isStatsPage ? '/#projects' : '#projects' },
    { name: 'Trivia', href: isStatsPage ? '/#trivia' : '#trivia' },
    { name: 'Contact', href: isStatsPage ? '/#contact' : '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-0 right-0 z-50 mx-auto w-[92%] max-w-6xl rounded-2xl transition-all duration-300 ${scrolled
            ? 'bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl'
            : 'bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full ${isAMGMode
                ? 'bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.7)]'
                : 'bg-green-400 shadow-[0_0_18px_rgba(74,222,128,0.6)]'
                }`}
            />
            <span className="text-xl font-semibold tracking-[0.18em] uppercase text-white">
              Adam
            </span>
            {isAMGMode && (
              <span className="text-sm tracking-[0.35em] uppercase text-zinc-400">
                AMG
              </span>
            )}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full ${isAMGMode ? 'bg-red-500' : 'bg-purple-400'
                  }`} />
              </a>
            ))}

            <button
              onClick={() => setIsAMGMode((prev) => !prev)}
              className={`px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-[0.18em] transition-all ${isAMGMode
                  ? 'bg-red-500 text-white border-red-400'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/20'
                }`}
            >
              {isAMGMode ? 'AMG On' : 'AMG Off'}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white px-3 py-2 border border-white/10 rounded-lg"
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg pt-28 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold uppercase tracking-[0.12em] text-white transition-colors ${isAMGMode ? 'hover:text-red-400' : 'hover:text-purple-300'
                    }`}
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={() => setIsAMGMode((prev) => !prev)}
                className={`mt-4 mx-auto px-5 py-3 rounded-full border text-sm font-semibold uppercase tracking-[0.15em] ${isAMGMode
                    ? 'bg-red-500 text-white border-red-400'
                    : 'bg-white/5 text-zinc-300 border-white/10'
                  }`}
              >
                {isAMGMode ? 'Disable AMG' : 'Enable AMG'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
