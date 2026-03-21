import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Trivia from './components/Trivia';
import Contact from './components/Contact';
import SystemStatus from './components/SystemStatus';
import { Model as C63 } from './components/C63';

const ScrollRotatingCar = ({ lowPowerMode }) => {
  const carRef = useRef();
  const { invalidate } = useThree();

  useFrame(() => {
    if (!carRef.current || lowPowerMode) return;

    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    const targetRotation = scrollProgress * Math.PI * 2;

    carRef.current.rotation.y = THREE.MathUtils.lerp(
      carRef.current.rotation.y,
      targetRotation,
      0.05
    );
  });

  useEffect(() => {
    if (!lowPowerMode) return undefined;

    const updateRotation = () => {
      if (!carRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      carRef.current.rotation.y = scrollProgress * Math.PI * 2;
      invalidate();
    };

    updateRotation();
    window.addEventListener('scroll', updateRotation, { passive: true });
    window.addEventListener('resize', updateRotation);

    return () => {
      window.removeEventListener('scroll', updateRotation);
      window.removeEventListener('resize', updateRotation);
    };
  }, [invalidate, lowPowerMode]);

  return (
    <group ref={carRef}>
      <C63 scale={lowPowerMode ? 90 : 100} position={[2, -1, -2]} />
    </group>
  );
};

function App() {
  const [isAMGMode, setIsAMGMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPowerDesktop, setIsLowPowerDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const evaluateDevice = (isMobileViewport) => {
      setIsMobile(isMobileViewport);
      const cpuThreads = navigator.hardwareConcurrency || 8;
      const memoryGB = navigator.deviceMemory || 8;
      setIsLowPowerDesktop(!isMobileViewport && (cpuThreads <= 4 || memoryGB <= 4));
    };

    evaluateDevice(mediaQuery.matches);

    const handleViewportChange = (event) => evaluateDevice(event.matches);
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  const lowPowerMode = isMobile || isLowPowerDesktop;

  return (

    <div
      className={`relative min-h-screen text-white selection:bg-red-500/20 transition-colors duration-500 ${isAMGMode ? 'amg-mode' : 'base-mode'
        }`}
    >
      {isAMGMode && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            frameloop={lowPowerMode ? 'demand' : 'always'}
            dpr={isMobile ? [0.6, 0.9] : isLowPowerDesktop ? [0.8, 1.1] : [1, 1.4]}
            gl={{
              antialias: !lowPowerMode,
              powerPreference: lowPowerMode ? 'low-power' : 'high-performance',
              alpha: true,
            }}
          >
            <ambientLight intensity={0.45} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.6} castShadow={false} />
            <Environment preset="city" resolution={lowPowerMode ? 64 : 128} />

            <Suspense fallback={null}>
              {lowPowerMode ? (
                <group rotation={[0, -Math.PI / 4, 0]}>
                  <ScrollRotatingCar lowPowerMode />
                </group>
              ) : (
                <PresentationControls
                  global
                  config={{ mass: 2, tension: 500 }}
                  snap={{ mass: 4, tension: 1500 }}
                  rotation={[0, -Math.PI / 4, 0]}
                  polar={[-Math.PI / 3, Math.PI / 3]}
                  azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                >
                  <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
                    <ScrollRotatingCar lowPowerMode={false} />
                  </Float>
                </PresentationControls>
              )}
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-20" />

      <div className="relative z-10">
        <Navbar isAMGMode={isAMGMode} setIsAMGMode={setIsAMGMode} />
        <main>
          <About isAMGMode={isAMGMode} />
          <Projects isAMGMode={isAMGMode} />
          <Trivia isAMGMode={isAMGMode} />
          <Contact isAMGMode={isAMGMode} />
        </main>
        <SystemStatus isAMGMode={isAMGMode} />
      </div>
    </div>
  );
}

export default App;
