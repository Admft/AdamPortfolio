import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isAMGMode, setIsAMGMode, isStatsPage = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: isStatsPage ? '/#about' : '#about' },
    { name: 'Experience', href: isStatsPage ? '/#experience' : '#experience' },
    { name: 'Research', href: isStatsPage ? '/#research' : '#research' },
    { name: 'Projects', href: isStatsPage ? '/#projects' : '#projects' },
    { name: 'Trivia', href: isStatsPage ? '/#trivia' : '#trivia' },
    { name: 'Contact', href: isStatsPage ? '/#contact' : '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="site-container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2.5">
            <img
              src={`${process.env.PUBLIC_URL}/Adamheadshot.webp`}
              alt="Adam Moffat"
              className="h-9 w-9 rounded-full object-cover border border-white/15"
            />
            <span className="font-display text-lg font-bold text-white">Adam</span>
            {isAMGMode && (
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 hidden sm:inline">
                AMG
              </span>
            )}
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => setIsAMGMode((prev) => !prev)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                isAMGMode
                  ? 'bg-red-500/90 text-white border-red-400/80'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/20'
              }`}
            >
              {isAMGMode ? 'AMG' : 'Standard'}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-sm text-zinc-300 px-3 py-1.5 border border-white/10 rounded-lg"
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
                  className={`font-display text-2xl font-bold text-white ${
                    isAMGMode ? 'hover:text-red-400' : 'hover:text-purple-300'
                  }`}
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={() => setIsAMGMode((prev) => !prev)}
                className={`mt-2 mx-auto px-5 py-2.5 rounded-full border text-sm font-medium ${
                  isAMGMode
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
