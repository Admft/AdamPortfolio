import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Trivia from './components/Trivia';

function App() {
  return (
    <div className="App">
      <Navbar />
      <About />
      <Projects />
      <Trivia />
      <Contact />
    </div>
  );
}

export default App;