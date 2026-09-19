import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
// One point-cloud draw call; particles travel from the front lamps toward the project field.
export default function HeadlightBeams({ brake, mobile, reduced }) {
  const material = useRef();
  const geometry = useMemo(() => {
    const count = mobile ? 160 : 600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (i % 2 ? 1 : -1) * 0.55;
      positions[i * 3 + 1] = 0.65;
      positions[i * 3 + 2] = (i / count) * 8;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 1, -4), 12);
    return geo;
  }, [mobile]);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uOpacity: { value: 0 } }),
    [],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((state, delta) => {
    uniforms.uOpacity.value = THREE.MathUtils.damp(
      uniforms.uOpacity.value,
      brake.current ? 0.8 : 0,
      5,
      delta,
    );
    if (!reduced) uniforms.uTime.value += delta;
  });
  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
    uniform float uTime;
    varying float vFade;
    void main(){
      float travel = mod(position.z + uTime * 3.0, 8.0);
      vec3 p = vec3(position.x + sin(position.z * 125.0) * travel * .12, position.y + cos(position.z * 81.0) * travel * .07, -2.0 - travel);
      vFade = 1.0 - travel / 8.0;
      vec4 mv = modelViewMatrix * vec4(p,1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = min(6.0, 18.0 / max(1.0, -mv.z));
    }`}
        fragmentShader={`
      uniform float uOpacity;
      varying float vFade;
      void main(){float dotAlpha = 1.0 - smoothstep(.1,.5,length(gl_PointCoord - .5)); gl_FragColor = vec4(.68,.76,1.0,dotAlpha * vFade * uOpacity);}
    `}
      />
    </points>
  );
}
