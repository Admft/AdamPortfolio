import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const TRAIL_LIFETIME = 3.5;
const MIN_SAMPLE_DISTANCE = 0.035;
const MARK_WIDTH = 0.13;
const MAX_TRAIL_POINTS = 140;

const MARK_VERTEX = /* glsl */ `
  attribute vec4 trailColor;
  varying vec4 vTrailColor;

  void main() {
    vTrailColor = trailColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const MARK_FRAGMENT = /* glsl */ `
  varying vec4 vTrailColor;

  void main() {
    gl_FragColor = vTrailColor;
  }
`;

const createTrail = () => ({ points: [] });

const samplePosition = new THREE.Vector3();

const addTrailPoint = (trail, position, time) => {
  const last = trail.points[trail.points.length - 1];
  if (last) {
    const dx = position.x - last.x;
    const dy = position.y - last.y;
    const dz = position.z - last.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (dist < MIN_SAMPLE_DISTANCE && time - last.time < 0.04) {
      return false;
    }
  }

  trail.points.push({
    x: position.x,
    y: position.y - 0.015,
    z: position.z,
    time,
  });

  if (trail.points.length > MAX_TRAIL_POINTS) {
    trail.points.shift();
  }

  return true;
};

const pruneTrail = (trail, now) => {
  trail.points = trail.points.filter((point) => now - point.time < TRAIL_LIFETIME);
};

const buildRibbonGeometry = (trail, now) => {
  const active = trail.points;
  if (active.length < 2) {
    return null;
  }

  const vertexCount = active.length * 2;
  const positions = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 4);
  const indices = [];

  for (let i = 0; i < active.length; i += 1) {
    const point = active[i];
    const age = (now - point.time) / TRAIL_LIFETIME;
    const alpha = Math.pow(1 - age, 1.2) * 0.85;

    let dx;
    let dz;
    if (i === 0) {
      dx = active[1].x - point.x;
      dz = active[1].z - point.z;
    } else if (i === active.length - 1) {
      dx = point.x - active[i - 1].x;
      dz = point.z - active[i - 1].z;
    } else {
      dx = active[i + 1].x - active[i - 1].x;
      dz = active[i + 1].z - active[i - 1].z;
    }

    const length = Math.hypot(dx, dz) || 1;
    const offsetX = (-dz / length) * MARK_WIDTH * 0.5;
    const offsetZ = (dx / length) * MARK_WIDTH * 0.5;

    const left = i * 2;
    const right = left + 1;

    positions[left * 3] = point.x + offsetX;
    positions[left * 3 + 1] = point.y;
    positions[left * 3 + 2] = point.z + offsetZ;

    positions[right * 3] = point.x - offsetX;
    positions[right * 3 + 1] = point.y;
    positions[right * 3 + 2] = point.z - offsetZ;

    for (const vertex of [left, right]) {
      colors[vertex * 4] = 0.58;
      colors[vertex * 4 + 1] = 0.57;
      colors[vertex * 4 + 2] = 0.54;
      colors[vertex * 4 + 3] = alpha;
    }

    if (i > 0) {
      const base = (i - 1) * 2;
      indices.push(base, base + 1, base + 2);
      indices.push(base + 1, base + 3, base + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('trailColor', new THREE.BufferAttribute(colors, 4));
  geometry.setIndex(indices);
  return geometry;
};

function TireDriftMark({ trailsRef, index }) {
  const meshRef = useRef();
  const geometryRef = useRef(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: MARK_VERTEX,
        fragmentShader: MARK_FRAGMENT,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
      }),
    []
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const now = clock.elapsedTime;
    const trail = trailsRef.current[index];
    const nextGeometry = buildRibbonGeometry(trail, now);

    if (!nextGeometry) {
      mesh.visible = false;
      return;
    }

    mesh.visible = true;
    if (geometryRef.current) {
      geometryRef.current.dispose();
    }
    geometryRef.current = nextGeometry;
    mesh.geometry = nextGeometry;
  });

  return (
    <mesh
      ref={meshRef}
      material={material}
      frustumCulled={false}
      renderOrder={1}
      visible={false}
    />
  );
}

export function DriftMarks({ tireRefs, intensityRef, lowPowerMode }) {
  const trailsRef = useRef([createTrail(), createTrail()]);
  const { invalidate } = useThree();

  useFrame(({ clock }) => {
    const now = clock.elapsedTime;
    const intensity = intensityRef?.current ?? 0;
    let updated = false;

    trailsRef.current.forEach((trail) => pruneTrail(trail, now));

    if (intensity > 0.01) {
      tireRefs.forEach((tireRef, index) => {
        if (!tireRef.current) return;
        tireRef.current.getWorldPosition(samplePosition);

        if (addTrailPoint(trailsRef.current[index], samplePosition, now)) {
          updated = true;
        }
      });
    }

    const alive = trailsRef.current.some((trail) => trail.points.length >= 2);

    if (lowPowerMode && (updated || alive || intensity > 0.01)) {
      invalidate();
    }
  });

  return (
    <>
      <TireDriftMark trailsRef={trailsRef} index={0} />
      <TireDriftMark trailsRef={trailsRef} index={1} />
    </>
  );
};
