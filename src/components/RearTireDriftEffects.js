import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DriftParticles } from './DriftParticles';

// Caliper joint positions from GLB, offset to tire contact patch
const FALLBACK_TIRE_POSITIONS = [
  [0.758, 0.02, -1.4],
  [-0.758, 0.02, -1.4],
];

const TIRE_GROUND_OFFSET = new THREE.Vector3(0, -0.35, 0);
const localPosition = new THREE.Vector3();

const findRearWheel = (root, side) => {
  const exact = side === 'L'
    ? ['Calliper Rear L_04', '3DWheel Rear L']
    : ['Calliper Rear R_05', '3DWheel Rear R'];

  let found = null;
  root.traverse((obj) => {
    if (found) return;
    if (exact.includes(obj.name)) {
      found = obj;
      return;
    }
    const name = obj.name || '';
    if (side === 'L' && /rear\s*l/i.test(name) && /calliper|wheel/i.test(name)) {
      found = obj;
    }
    if (side === 'R' && /rear\s*r/i.test(name) && /calliper|wheel/i.test(name)) {
      found = obj;
    }
  });
  return found;
};

export function RearTireDriftEffects({
  carRef,
  tireRefs,
  intensityRef,
  lowPowerMode,
  carScale,
  carPosition,
}) {
  const effectsInnerRef = useRef();
  const bonesRef = useRef({ left: null, right: null });

  useFrame(() => {
    const car = carRef.current;
    const inner = effectsInnerRef.current;
    if (!car || !inner) return;

    if (!bonesRef.current.left || !bonesRef.current.right) {
      bonesRef.current.left = findRearWheel(car, 'L');
      bonesRef.current.right = findRearWheel(car, 'R');
    }

    const bones = [bonesRef.current.left, bonesRef.current.right];

    bones.forEach((bone, index) => {
      const marker = tireRefs[index]?.current;
      if (!marker) return;

      if (!bone) return;

      localPosition.copy(TIRE_GROUND_OFFSET);
      bone.localToWorld(localPosition);
      inner.worldToLocal(localPosition);
      marker.position.copy(localPosition);
    });
  });

  return (
    <group position={carPosition} scale={carScale}>
      <group ref={effectsInnerRef} scale={0.01}>
        {FALLBACK_TIRE_POSITIONS.map((position, index) => (
          <group key={index}>
            <object3D ref={tireRefs[index]} position={position} />
            <DriftParticles
              markerRef={tireRefs[index]}
              intensityRef={intensityRef}
              lowPowerMode={lowPowerMode}
            />
          </group>
        ))}
      </group>
    </group>
  );
}
