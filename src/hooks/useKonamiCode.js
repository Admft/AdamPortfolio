import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export const useKonamiCode = () => {
  const [isAMGMode, setIsAMGMode] = useState(false);
  const [input, setInput] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newInput = [...input, e.key];
      // Keep only the last N keys
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setInput(newInput);

      // Check match
      if (JSON.stringify(newInput) === JSON.stringify(KONAMI_CODE)) {
        setIsAMGMode(prev => !prev);
        alert("🏎️ AMG MODE ACTIVATED: STAGE 2 TUNE LOADED"); // Or play an engine sound
        setInput([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return isAMGMode;
};