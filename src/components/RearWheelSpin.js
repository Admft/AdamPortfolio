import { useCallback, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SPIN_AXIS = new THREE.Vector3(1, 0, 0);

const ensureSpinPivot = (wheel) => {
  if (!wheel || wheel.userData.spinPivot) {
    return wheel?.userData.spinPivot ?? null;
  }

  const parent = wheel.parent;
  if (!parent) return wheel;

  const pivot = new THREE.Group();
  pivot.position.copy(wheel.position);
  pivot.quaternion.copy(wheel.quaternion);
  pivot.scale.copy(wheel.scale);

  parent.add(pivot);
  pivot.add(wheel);

  wheel.position.set(0, 0, 0);
  wheel.quaternion.set(0, 0, 0, 1);
  wheel.scale.set(1, 1, 1);

  wheel.userData.spinPivot = pivot;
  return pivot;
};

export function RearWheelSpin({ wheelRefs, lowPowerMode }) {
  const pivotsRef = useRef({ left: null, right: null });
  const spinAngleRef = useRef(0);
  const spinVelocityRef = useRef(0);
  const lastScrollYRef = useRef(
    typeof window !== 'undefined' ? window.scrollY : 0
  );

  const resolvePivots = useCallback(() => {
    const { left, right } = wheelRefs.current;
    if (!left || !right) return false;

    if (!pivotsRef.current.left) {
      pivotsRef.current.left = ensureSpinPivot(left);
    }
    if (!pivotsRef.current.right) {
      pivotsRef.current.right = ensureSpinPivot(right);
    }

    return Boolean(pivotsRef.current.left && pivotsRef.current.right);
  }, [wheelRefs]);

  const applyScrollSpin = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollYRef.current;
    lastScrollYRef.current = scrollY;

    if (scrollDelta > 0) {
      const boost = Math.min(scrollDelta * 0.08, 2.5);
      spinVelocityRef.current = Math.min(
        spinVelocityRef.current + boost,
        lowPowerMode ? 12 : 22
      );
    }
  }, [lowPowerMode]);

  useEffect(() => {
    const handleScroll = () => applyScrollSpin();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [applyScrollSpin]);

  useFrame((_, delta) => {
    if (!resolvePivots()) return;

    applyScrollSpin();
    spinVelocityRef.current *= lowPowerMode ? 0.88 : 0.93;

    if (spinVelocityRef.current < 0.0005) return;

    const rotationDelta = spinVelocityRef.current * delta;
    spinAngleRef.current += rotationDelta;

    const { left, right } = pivotsRef.current;
    if (left) left.rotateOnAxis(SPIN_AXIS, rotationDelta);
    if (right) right.rotateOnAxis(SPIN_AXIS, rotationDelta);
  });

  return null;
}
