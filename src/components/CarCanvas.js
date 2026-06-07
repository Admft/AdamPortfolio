import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { Model as C63 } from './C63';

const getScrollRotation = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  return scrollProgress * Math.PI * 2;
};

const ScrollRotatingCar = ({ lowPowerMode }) => {
  const carRef = useRef();
  const { invalidate } = useThree();
  const targetRotationRef = useRef(0);
  const animationFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  const stopAnimation = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  useFrame(() => {
    if (!carRef.current || lowPowerMode) return;

    targetRotationRef.current = getScrollRotation();
    carRef.current.rotation.y = THREE.MathUtils.lerp(
      carRef.current.rotation.y,
      targetRotationRef.current,
      0.05
    );
  });

  useEffect(() => {
    if (!lowPowerMode) return undefined;

    const scheduleRotationUpdate = () => {
      if (!isVisibleRef.current || animationFrameRef.current !== null) {
        return;
      }

      animationFrameRef.current = requestAnimationFrame(function step() {
        animationFrameRef.current = null;

        const car = carRef.current;
        if (!car || !isVisibleRef.current) {
          return;
        }

        const target = targetRotationRef.current;
        const next = THREE.MathUtils.lerp(car.rotation.y, target, 0.18);
        car.rotation.y = next;
        invalidate();

        if (Math.abs(next - target) > 0.001) {
          animationFrameRef.current = requestAnimationFrame(step);
        }
      });
    };

    const queueRotationUpdate = () => {
      targetRotationRef.current = getScrollRotation();
      scheduleRotationUpdate();
    };

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
      if (!isVisibleRef.current) {
        stopAnimation();
        return;
      }
      queueRotationUpdate();
    };

    queueRotationUpdate();
    window.addEventListener('scroll', queueRotationUpdate, { passive: true });
    window.addEventListener('resize', queueRotationUpdate);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopAnimation();
      window.removeEventListener('scroll', queueRotationUpdate);
      window.removeEventListener('resize', queueRotationUpdate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [lowPowerMode, invalidate]);

  return (
    <group ref={carRef}>
      <C63
        scale={lowPowerMode ? 90 : 100}
        position={[2, -1, -2]}
      />
    </group>
  );
};

const CarCanvas = ({ isMobile, isLowPowerDesktop }) => {
  const lowPowerMode = isMobile || isLowPowerDesktop;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        frameloop={lowPowerMode ? 'demand' : 'always'}
        dpr={isMobile ? [0.85, 1.25] : isLowPowerDesktop ? [0.8, 1.1] : [1, 1.4]}
        gl={{
          antialias: !lowPowerMode,
          powerPreference: lowPowerMode ? 'low-power' : 'high-performance',
          alpha: true,
          stencil: false,
        }}      >
        <ambientLight intensity={0.45} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1.6}
          castShadow={false}
        />
        <Environment
          files="/potsdamer_platz_1k.hdr"
          resolution={lowPowerMode ? 64 : 128}
          background={false}
        />

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
            </PresentationControls>          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CarCanvas;
