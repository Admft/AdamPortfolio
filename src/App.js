import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import { ReactLenis } from '@studio-freight/react-lenis';
import * as THREE from 'three'; // Import Three.js for the math functions

import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Trivia from './components/Trivia';
import Contact from './components/Contact';
import SystemStatus from './components/SystemStatus';
import { useKonamiCode } from './hooks/useKonamiCode';

// Import your C63 model!
import { Model as C63 } from './components/C63';

// THE UPGRADE: A wrapper component that ties rotation to the scrollbar
const ScrollRotatingCar = () => {
  const carRef = useRef();

  // useFrame runs 60 times a second
  useFrame(() => {
    if (!carRef.current) return;

    // 1. Calculate how far down the page we are (from 0 to 1)
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // 2. Target rotation: We want a full 360-degree spin (Math.PI * 2) by the bottom
    const targetRotation = scrollProgress * Math.PI * 2;

    // 3. Smoothly interpolate (lerp) the current rotation to the target rotation
    carRef.current.rotation.y = THREE.MathUtils.lerp(
      carRef.current.rotation.y,
      targetRotation,
      0.05 // The "weight" of the car. Lower = heavier/smoother, Higher = snappier
    );
  });

  return (
    <group ref={carRef}>
      {/* If the C63 is too big/small, adjust the scale here */}
      <C63 scale={100} position={[2, -1, -2]} />
    </group>
  );
};

function App() {
  const isAMGMode = useKonamiCode();

  return (
    <ReactLenis root>
      <div className={`relative min-h-screen text-white selection:bg-purple-500/30 transition-colors duration-700 ${isAMGMode ? 'amg-mode' : 'bg-[#050505]'}`}>
        
        {/* THE 3D SHOWCASE LAYER */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
            <Environment preset="city" /> 

            <Suspense fallback={null}>
              <PresentationControls 
                global 
                config={{ mass: 2, tension: 500 }} 
                snap={{ mass: 4, tension: 1500 }} 
                rotation={[0, -Math.PI / 4, 0]} 
                polar={[-Math.PI / 3, Math.PI / 3]} 
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
              >
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                  {/* Swap out the static model for our new scrolling wrapper */}
                  <ScrollRotatingCar />
                </Float>
              </PresentationControls>
            </Suspense>

          </Canvas>
        </div>

        <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-30" />
        
        {/* UI LAYER */}
        <div className="relative z-10">
          <Navbar isAMGMode={isAMGMode} />
          <main>
            <About />
            <Projects />
            <Trivia />
            <Contact />
          </main>
          <SystemStatus />
        </div>
        
      </div>
    </ReactLenis>
  );
}

export default App;