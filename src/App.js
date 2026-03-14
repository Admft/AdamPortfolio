import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { ReactLenis } from '@studio-freight/react-lenis';

import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Trivia from './components/Trivia';
import Contact from './components/Contact';
import { useKonamiCode } from './hooks/useKonamiCode';

// 1. The 3D Object: A floating, glowing geometric core
const TechCore = () => {
  const meshRef = useRef();

  // useFrame runs 60 times a second to animate the object
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, -2]}>
        {/* Icosahedron gives a great technical, node-based look */}
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color="#a855f7" // Purple to match your Tailwind theme
          wireframe={true} 
          emissive="#a855f7"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
};

function App() {
  const isAMGMode = useKonamiCode();

  return (
    // 2. Wrap the app in Lenis for premium, Awwwards-level scrolling
    <ReactLenis root>
      <div className={`relative min-h-screen text-white selection:bg-purple-500/30 transition-colors duration-700 ${isAMGMode ? 'amg-mode' : 'bg-[#050505]'}`}>
        
        {/* 3. The 3D Canvas Layer (Fixed behind everything) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Environment preset="city" /> {/* Instant realistic reflections */}
            <TechCore />
          </Canvas>
        </div>

        {/* Global Noise Overlay (Moved to absolute so it doesn't block scroll) */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-30" />
        
        {/* 4. Your existing UI (Layered safely on top) */}
        <div className="relative z-10">
          <Navbar isAMGMode={isAMGMode} />
          <main>
            <About />
            <Projects />
            <Trivia />
            <Contact />
          </main>
        </div>
        
      </div>
    </ReactLenis>
  );
}

export default App;