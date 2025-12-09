import { useEffect, useState, useRef } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export const useKonamiCode = () => {
  const [isAMGMode, setIsAMGMode] = useState(false);
  const [input, setInput] = useState([]);
  const isAMGModeRef = useRef(false);

  useEffect(() => {
    isAMGModeRef.current = isAMGMode;
  }, [isAMGMode]);

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
        // Check current state before toggling to show appropriate message
        const currentMode = isAMGModeRef.current;
        const newMode = !currentMode;
        
        // Show alert based on current state (before toggle)
        if (newMode) {
          alert("🏎️ AMG MODE ACTIVATED: STAGE 2 TUNE LOADED");
        } else {
          alert("🔙 Returning to normal mode");
        }
        
        setIsAMGMode(newMode);
        setInput([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return isAMGMode;
};