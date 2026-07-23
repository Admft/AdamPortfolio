import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const TRAIL_LIFETIME = 3.5;
const MIN_SAMPLE_DISTANCE = 0.035;
const MARK_WIDTH = 0.13;
const MAX_TRAIL_POINTS = 140;
const MAX_VERTICES = MAX_TRAIL_POINTS * 2;
const MAX_INDICES = (MAX_TRAIL_POINTS - 1) * 6;

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
  const points = trail.points;
  let write = 0;
  for (let i = 0; i < points.length; i += 1) {
    if (now - points[i].time < TRAIL_LIFETIME) {
      points[write] = points[i];
      write += 1;
    }
  }
  points.length = write;
};

const updateRibbonGeometry = (geometry, buffers, trail, now) => {
  const active = trail.points;
  if (active.length < 2) {
    geometry.setDrawRange(0, 0);
    return false;
  }

  const { positions, colors, indices } = buffers;
  let indexCount = 0;

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
      indices[indexCount] = base;
      indices[indexCount + 1] = base + 1;
      indices[indexCount + 2] = base + 2;
      indices[indexCount + 3] = base + 1;
      indices[indexCount + 4] = base + 3;
      indices[indexCount + 5] = base + 2;
      indexCount += 6;
    }
  }

  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.trailColor.needsUpdate = true;
  geometry.index.needsUpdate = true;
  geometry.setDrawRange(0, indexCount);
  return true;
};

function TireDriftMark({ trailsRef, index }) {
  const meshRef = useRef();

  const buffers = useMemo(
    () => ({
      positions: new Float32Array(MAX_VERTICES * 3),
      colors: new Float32Array(MAX_VERTICES * 4),
      indices: new Uint16Array(MAX_INDICES),
    }),
    []
  );

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(buffers.positions, 3));
    geo.setAttribute('trailColor', new THREE.BufferAttribute(buffers.colors, 4));
    geo.setIndex(new THREE.BufferAttribute(buffers.indices, 1));
    geo.setDrawRange(0, 0);
    return geo;
  }, [buffers]);

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

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const trail = trailsRef.current[index];
    const visible = updateRibbonGeometry(geometry, buffers, trail, clock.elapsedTime);
    mesh.visible = visible;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
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

    // Same invalidate rules as before — only low-power demand mode needs them.
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
}
