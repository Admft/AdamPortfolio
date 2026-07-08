import React, { Suspense, useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { Model as C63 } from './C63';
import { RearTireDriftEffects } from './RearTireDriftEffects';
import { RearWheelSpin } from './RearWheelSpin';
import { DriftMarks } from './DriftMarks';

const getScrollRotation = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  return scrollProgress * Math.PI * 2;
};

const getScrollCarOpacity = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 1;
  const progress = window.scrollY / maxScroll;
  // 100% at top, 0% at middle, 100% at bottom
  return 2 * Math.abs(progress - 0.5);
};

const ScrollRotatingCar = ({ lowPowerMode }) => {
  const carRef = useRef();
  const { invalidate } = useThree();
  const targetRotationRef = useRef(0);
  const animationFrameRef = useRef(null);
  const isVisibleRef = useRef(true);
  const driftIntensityRef = useRef(0);
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const leftTireRef = useRef();
  const rightTireRef = useRef();
  const wheelRefs = useRef({ left: null, right: null });
  const tireRefs = useMemo(() => [leftTireRef, rightTireRef], []);

  const updateDriftFromScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollYRef.current;
    lastScrollYRef.current = scrollY;

    if (scrollDelta !== 0) {
      const boost = Math.min(Math.abs(scrollDelta) / 6, 1);
      driftIntensityRef.current = Math.max(driftIntensityRef.current, boost);
    }
  }, []);

  const stopAnimation = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  useFrame(() => {
    if (!carRef.current) return;

    updateDriftFromScroll();
    driftIntensityRef.current *= lowPowerMode ? 0.94 : 0.97;

    if (lowPowerMode) return;

    targetRotationRef.current = getScrollRotation();
    carRef.current.rotation.y = THREE.MathUtils.lerp(
      carRef.current.rotation.y,
      targetRotationRef.current,
      0.05
    );
  });

  useEffect(() => {
    const handleScroll = () => {
      updateDriftFromScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateDriftFromScroll]);

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
        driftIntensityRef.current *= 0.94;
        invalidate();

        if (Math.abs(next - target) > 0.001) {
          animationFrameRef.current = requestAnimationFrame(step);
        }
      });
    };

    const queueRotationUpdate = () => {
      updateDriftFromScroll();
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
  }, [lowPowerMode, invalidate, updateDriftFromScroll]);

  const carScale = lowPowerMode ? 90 : 100;

  return (
    <>
      <group ref={carRef}>
        <C63 scale={carScale} position={[2, -1, -2]} wheelRefs={wheelRefs} />
        <RearWheelSpin wheelRefs={wheelRefs} lowPowerMode={lowPowerMode} />
        <RearTireDriftEffects
          carRef={carRef}
          tireRefs={tireRefs}
          intensityRef={driftIntensityRef}
          lowPowerMode={lowPowerMode}
          carScale={carScale}
        />
      </group>
      <DriftMarks
        tireRefs={tireRefs}
        intensityRef={driftIntensityRef}
        lowPowerMode={lowPowerMode}
      />
    </>
  );
};

const CarCanvas = ({ isMobile, isLowPowerDesktop }) => {
  const lowPowerMode = isMobile || isLowPowerDesktop;
  const layerRef = useRef(null);

  const updateCarOpacity = useCallback(() => {
    if (!layerRef.current) return;
    layerRef.current.style.opacity = String(getScrollCarOpacity());
  }, []);

  useEffect(() => {
    updateCarOpacity();
    window.addEventListener('scroll', updateCarOpacity, { passive: true });
    window.addEventListener('resize', updateCarOpacity);
    return () => {
      window.removeEventListener('scroll', updateCarOpacity);
      window.removeEventListener('resize', updateCarOpacity);
    };
  }, [updateCarOpacity]);

  return (
    <div
      ref={layerRef}
      className="fixed inset-0 z-[1] pointer-events-none car-layer"
    >
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
