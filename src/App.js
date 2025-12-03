import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Trivia from './components/Trivia';
import Contact from './components/Contact';
// 1. Import your hook (ensure the file path matches where you saved it)
import { useKonamiCode } from './hooks/useKonamiCode';

function App() {
  // 2. Activate the hook
  const isAMGMode = useKonamiCode();

  return (
    // 3. Add the conditional class 'amg-mode' if active
    <div className={`relative min-h-screen text-white selection:bg-red-500/30 transition-all duration-700 ${isAMGMode ? 'amg-mode' : 'bg-[#050505]'}`}>
      
      {/* Global Noise Overlay (Keep this, it looks good on Carbon too) */}
      <div className="bg-noise" />
      
      {/* 4. Pass the mode to Navbar so it can maybe change logo color (optional) */}
      <Navbar isAMGMode={isAMGMode} />
      
      <main className="relative z-10">
        <About />
        <Projects />
        <Trivia />
        <Contact />
      </main>
    </div>
  );
}

export default App;