import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const DUST_VERTEX = /* glsl */ `
  attribute float alpha;
  uniform float pointSize;
  varying float vAlpha;

  void main() {
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float size = pointSize * (140.0 / max(-mvPosition.z, 1.0));
    gl_PointSize = clamp(size, 2.0, 14.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const CLOUD_VERTEX = /* glsl */ `
  attribute float alpha;
  attribute float puffScale;
  uniform float pointSize;
  varying float vAlpha;

  void main() {
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float size = pointSize * puffScale * (150.0 / max(-mvPosition.z, 1.0));
    gl_PointSize = clamp(size, 6.0, 28.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const DUST_FRAGMENT = /* glsl */ `
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float soft = 1.0 - smoothstep(0.2, 0.5, dist);
    gl_FragColor = vec4(vec3(0.72, 0.73, 0.76), soft * vAlpha);
  }
`;

const CLOUD_FRAGMENT = /* glsl */ `
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float soft = 1.0 - smoothstep(0.05, 0.5, dist);
    gl_FragColor = vec4(vec3(0.68, 0.69, 0.72), soft * vAlpha * 0.55);
  }
`;

const createPool = (count, withClouds = false) => ({
  count,
  positions: new Float32Array(count * 3),
  velocities: new Float32Array(count * 3),
  life: new Float32Array(count),
  maxLife: new Float32Array(count),
  alpha: new Float32Array(count),
  startAlpha: new Float32Array(count),
  puffScale: withClouds ? new Float32Array(count) : null,
  nextIndex: 0,
});

const spawnDust = (pool, intensity, origin) => {
  const i = pool.nextIndex % pool.count;
  pool.nextIndex += 1;

  const spread = 0.1 + intensity * 0.06;
  pool.positions[i * 3] = origin[0] + (Math.random() - 0.5) * spread;
  pool.positions[i * 3 + 1] = origin[1] + Math.random() * 0.02;
  pool.positions[i * 3 + 2] = origin[2] + (Math.random() - 0.5) * spread * 0.3;

  const speed = 14 + intensity * 20;
  pool.velocities[i * 3] = (Math.random() - 0.5) * 8;
  pool.velocities[i * 3 + 1] = 1 + Math.random() * 2;
  pool.velocities[i * 3 + 2] = -speed - Math.random() * 8;

  pool.life[i] = 1;
  pool.maxLife[i] = 0.5 + Math.random() * 0.45;
  pool.startAlpha[i] = 0.2 + Math.random() * 0.15 + intensity * 0.2;
  pool.alpha[i] = pool.startAlpha[i];
};

const spawnCloud = (pool, intensity, origin) => {
  const i = pool.nextIndex % pool.count;
  pool.nextIndex += 1;

  const spread = 0.12 + intensity * 0.08;
  pool.positions[i * 3] = origin[0] + (Math.random() - 0.5) * spread;
  pool.positions[i * 3 + 1] = origin[1] + Math.random() * 0.03;
  pool.positions[i * 3 + 2] = origin[2] + (Math.random() - 0.5) * spread * 0.3;

  const speed = 10 + intensity * 14;
  pool.velocities[i * 3] = (Math.random() - 0.5) * 10;
  pool.velocities[i * 3 + 1] = 2 + Math.random() * 3;
  pool.velocities[i * 3 + 2] = -speed - Math.random() * 6;

  pool.life[i] = 1;
  pool.maxLife[i] = 0.7 + Math.random() * 0.55;
  pool.startAlpha[i] = 0.14 + Math.random() * 0.12 + intensity * 0.14;
  pool.alpha[i] = pool.startAlpha[i];
  pool.puffScale[i] = 0.45 + Math.random() * 0.2;
};

const updatePool = (pool, delta, intensity, isCloud) => {
  let hasAlive = false;

  for (let i = 0; i < pool.count; i += 1) {
    if (pool.life[i] <= 0) {
      pool.alpha[i] = 0;
      pool.positions[i * 3 + 1] = -999;
      if (isCloud) pool.puffScale[i] = 0;
      continue;
    }

    hasAlive = true;
    pool.life[i] -= delta / pool.maxLife[i];

    pool.positions[i * 3] += pool.velocities[i * 3] * delta;
    pool.positions[i * 3 + 1] += pool.velocities[i * 3 + 1] * delta;
    pool.positions[i * 3 + 2] += pool.velocities[i * 3 + 2] * delta;

    pool.velocities[i * 3] *= 1 - delta * (isCloud ? 0.45 : 0.6);
    pool.velocities[i * 3 + 1] += delta * (isCloud ? 1.6 : 1.2);
    pool.velocities[i * 3 + 2] *= 1 - delta * 0.1;

    const lifeRatio = pool.life[i];
    pool.alpha[i] = lifeRatio * pool.startAlpha[i];

    if (isCloud) {
      const growth = 1 - lifeRatio;
      pool.puffScale[i] = 0.5 + growth * 1.4 + intensity * 0.2;
    }
  }

  return hasAlive;
};

function useParticleGeometry(pool, withPuffScale = false) {
  return useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pool.positions, 3));
    geo.setAttribute('alpha', new THREE.BufferAttribute(pool.alpha, 1));
    if (withPuffScale) {
      geo.setAttribute('puffScale', new THREE.BufferAttribute(pool.puffScale, 1));
    }
    return geo;
  }, [pool, withPuffScale]);
}


const spawnOrigin = [0, 0, 0];

export function DriftParticles({
  intensityRef,
  lowPowerMode,
  markerRef,
  ...props
}) {
  const dustPoolRef = useRef(createPool(lowPowerMode ? 24 : 40));
  const cloudPoolRef = useRef(createPool(lowPowerMode ? 10 : 18, true));
  const { invalidate } = useThree();

  const dustGeometry = useParticleGeometry(dustPoolRef.current);
  const cloudGeometry = useParticleGeometry(cloudPoolRef.current, true);

  const dustMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { pointSize: { value: lowPowerMode ? 5.5 : 7.5 } },
        vertexShader: DUST_VERTEX,
        fragmentShader: DUST_FRAGMENT,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.NormalBlending,
      }),
    [lowPowerMode]
  );

  const cloudMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { pointSize: { value: lowPowerMode ? 8 : 11 } },
        vertexShader: CLOUD_VERTEX,
        fragmentShader: CLOUD_FRAGMENT,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.NormalBlending,
      }),
    [lowPowerMode]
  );

  useFrame((_, delta) => {
    const intensity = Math.max(0, intensityRef?.current ?? 0);

    if (markerRef?.current) {
      const { x, y, z } = markerRef.current.position;
      spawnOrigin[0] = x;
      spawnOrigin[1] = y;
      spawnOrigin[2] = z;
    }

    if (intensity > 0.01) {
      const dustSpawns = Math.min(Math.ceil(intensity * 2 + intensity * delta * 10), 3);
      for (let s = 0; s < dustSpawns; s += 1) {
        spawnDust(dustPoolRef.current, Math.min(intensity, 1), spawnOrigin);
      }

      const cloudSpawns = Math.min(Math.ceil(intensity * 1.2 + intensity * delta * 4), 1);
      for (let s = 0; s < cloudSpawns; s += 1) {
        spawnCloud(cloudPoolRef.current, Math.min(intensity, 1), spawnOrigin);
      }
    }

    const dustAlive = updatePool(dustPoolRef.current, delta, intensity, false);
    const cloudsAlive = updatePool(cloudPoolRef.current, delta, intensity, true);

    dustGeometry.attributes.position.needsUpdate = true;
    dustGeometry.attributes.alpha.needsUpdate = true;
    cloudGeometry.attributes.position.needsUpdate = true;
    cloudGeometry.attributes.alpha.needsUpdate = true;
    cloudGeometry.attributes.puffScale.needsUpdate = true;

    if (lowPowerMode && (dustAlive || cloudsAlive || intensity > 0.01)) {
      invalidate();
    }
  });

  return (
    <group {...props}>
      <points geometry={cloudGeometry} material={cloudMaterial} frustumCulled={false} />
      <points geometry={dustGeometry} material={dustMaterial} frustumCulled={false} />
    </group>
  );
};
