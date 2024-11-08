import React, { useState, useEffect } from 'react';
import { Stars, Menu } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full py-4 z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/80 backdrop-blur-md shadow-[0_0_15px_rgba(123,31,162,0.5)]' : 'bg-black/40'
    }`}>
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-950/30 to-black" />
        {Array.from({ length: 25 }).map((_, i) => (
          <Stars
            key={i}
            className="absolute animate-pulse text-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${0.3 + Math.random()})`,
            }}
            size={16}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <div className="relative flex items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <Stars className="h-8 w-8 text-purple-500 animate-spin-slow" />
            <div className="group">
              <h1 className="text-3xl font-bold relative">
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent hover:from-fuchsia-300 hover:via-purple-400 hover:to-blue-500 transition-all duration-300">
                  Adam Moffat
                </span>
                {/* Glow effect */}
                <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-75 group-hover:opacity-100" />
              </h1>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white/90 hover:text-purple-400 transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-12">
            {['About', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group"
              >
                <span className="relative z-10 text-lg text-white/80 group-hover:text-white transition-colors duration-300">
                  {item}
                </span>
                {/* Animated underline with glow */}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-lg shadow-purple-500/50" />
                {/* Hover glow effect */}
                <span className="absolute inset-0 -z-10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-lg" />
              </a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md transition-all duration-300 ${
              isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <div className="py-4 px-6 space-y-4">
              {['About', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-lg text-white/80 hover:text-white hover:bg-purple-900/20 px-4 py-2 rounded-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;