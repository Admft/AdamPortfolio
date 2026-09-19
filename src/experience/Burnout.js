import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A bounded pool shares one draw call. Puffs spawn at each actual rear-wheel
// contact patch, then rise and disperse independently of wheel rotation.
export default function Burnout({ wheels, carRef, mobile, reduced }) {
  const previousScroll = useRef(window.scrollY);
  const speed = useRef(0);
  const emission = useRef(0);
  const next = useRef(0);
  const scratch = useMemo(() => new THREE.Vector3(), []);
  const rotation = useMemo(() => new THREE.Quaternion(), []);
  const axis = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const angle = useRef(0);
  const alive = useRef(false);
  const origins = useMemo(
    () => wheels.map(() => new THREE.Vector3()),
    [wheels],
  );
  const pool = useMemo(() => {
    const count = mobile ? 64 : 128;
    const positions = new Float32Array(count * 3);
    const alpha = new Float32Array(count);
    const size = new Float32Array(count);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
    );
    geometry.setAttribute(
      "aAlpha",
      new THREE.BufferAttribute(alpha, 1).setUsage(THREE.DynamicDrawUsage),
    );
    geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(size, 1).setUsage(THREE.DynamicDrawUsage),
    );
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 2, -3), 12);
    return {
      count,
      positions,
      alpha,
      size,
      age: new Float32Array(count).fill(10),
      velocities: new Float32Array(count * 3),
      geometry,
    };
  }, [mobile]);
  useEffect(() => () => pool.geometry.dispose(), [pool]);
  useFrame((state, frameDelta) => {
    const delta = Math.min(frameDelta, 0.05);
    const scroll = window.scrollY;
    const movement = Math.abs(scroll - previousScroll.current);
    previousScroll.current = scroll;
    const target = reduced
      ? 0
      : Math.min(1, movement / Math.max(delta * 1800, 1));
    speed.current = THREE.MathUtils.damp(
      speed.current,
      target,
      target > speed.current ? 18 : 3.2,
      delta,
    );
    if (speed.current < 0.001 && !alive.current) return;
    angle.current =
      (angle.current + speed.current * 42 * delta) % (Math.PI * 2);
    wheels.forEach(({ node, rest, sign }) => {
      rotation.setFromAxisAngle(axis, angle.current * sign);
      node.quaternion.copy(rest).multiply(rotation);
    });
    emission.current += reduced
      ? 0
      : speed.current * (mobile ? 40 : 100) * delta;
    if (emission.current >= 1 && carRef.current) {
      // Only update the two wheel ancestor chains, never the entire model tree.
      wheels.forEach(({ node }, i) => {
        node.getWorldPosition(origins[i]);
        carRef.current.worldToLocal(origins[i]);
      });
    }
    while (emission.current >= 1 && wheels.length && carRef.current) {
      emission.current -= 1;
      scratch.copy(origins[next.current % wheels.length]);
      const index = next.current++ % pool.count;
      pool.positions[index * 3] = scratch.x + (Math.random() - 0.5) * 0.13;
      pool.positions[index * 3 + 1] = 0.12;
      pool.positions[index * 3 + 2] = scratch.z;
      pool.velocities[index * 3] = (Math.random() - 0.5) * 0.55;
      pool.velocities[index * 3 + 1] = 0.28 + Math.random() * 0.42;
      pool.velocities[index * 3 + 2] = -0.55 - Math.random() * 0.7;
      pool.age[index] = 0;
    }
    alive.current = false;
    for (let i = 0; i < pool.count; i++) {
      pool.age[i] += delta;
      const life = pool.age[i] / 2.8;
      pool.alpha[i] =
        reduced || life >= 1
          ? 0
          : Math.min(life * 12, 1) * Math.pow(1 - life, 1.5) * 0.42;
      pool.size[i] = 0.28 + life * 1.9;
      if (life >= 1) continue;
      alive.current = true;
      for (let k = 0; k < 3; k++)
        pool.positions[i * 3 + k] += pool.velocities[i * 3 + k] * delta;
    }
    Object.values(pool.geometry.attributes).forEach((attribute) => {
      attribute.needsUpdate = true;
    });
  });
  return (
    <points geometry={pool.geometry} renderOrder={2}>
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={{ uPixelRatio: { value: mobile ? 1 : 1.5 } }}
        vertexShader={`
      attribute float aAlpha;
      attribute float aSize;
      uniform float uPixelRatio;
      varying float vAlpha;
      void main() {
        vAlpha = aAlpha;
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * view;
        gl_PointSize = clamp(aSize * 360.0 * uPixelRatio / max(-view.z, 1.0), 1.0, 160.0);
      }
    `}
        fragmentShader={`
      varying float vAlpha;
      void main() {
        vec2 uv = gl_PointCoord - .5;
        float edge = 1.0 - smoothstep(.08, .5, length(uv));
        float cloud = .8 + .2 * sin(uv.x * 19.0) * cos(uv.y * 17.0);
        gl_FragColor = vec4(vec3(.72, .76, .8), edge * cloud * vAlpha);
      }
    `}
      />
    </points>
  );
}
