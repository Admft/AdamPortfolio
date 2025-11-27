import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Trivia from './components/Trivia';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      {/* Global Noise Overlay */}
      <div className="bg-noise" />
      
      <Navbar />
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