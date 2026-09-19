import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Grid, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
import Burnout from "./Burnout";
import HeadlightBeams from "./HeadlightBeams";
import ProjectHolograms from "./ProjectHolograms";
import RenderActivity from "./RenderActivity";
import {
  artifactVertex,
  artifactFragment,
  injectExplosion,
} from "./shaders/artifacts";
const palette = ["#c6ee96", "#6be6fa", "#b39aff", "#c6ee96"];
function Car({ progress, mobile, reduced }) {
  const { scene } = useGLTF("/c63-balanced.glb");
  const group = useRef();
  const explode = useMemo(() => ({ value: 0 }), []);
  const blueprint = useMemo(() => ({ value: 0 }), []);
  const model = useMemo(() => {
    const copy = SkeletonUtils.clone(scene);
    const box = new THREE.Box3().setFromObject(copy);
    const size = box.getSize(new THREE.Vector3());
    const scale = 5 / Math.max(size.x, size.y, size.z);
    const center = box.getCenter(new THREE.Vector3());
    const wheels = [];
    copy.traverse((node) => {
      const name = node.name.replace(/[^a-z0-9]/gi, "");
      if (/^3DWheelRear[LR]$/.test(name)) {
        wheels.push({
          node,
          rest: node.quaternion.clone(),
          sign: name.endsWith("R") ? -1 : 1,
        });
        node.traverse((part) => {
          part.userData.burnoutWheel = true;
        });
      }
    });
    const geometryCache = new Map();
    const materials = [];
    const textures = [];
    const textureCache = new Map();
    copy.traverse((mesh) => {
      if (!mesh.isMesh) return;
      mesh.frustumCulled = true;
      // Barycentric edges let one material fade continuously into wire geometry.
      // Keep skinning/UV attributes while sharing prepared geometry across meshes.
      const original = mesh.geometry;
      if (!geometryCache.has(original)) {
        const geometry = original.index
          ? original.toNonIndexed()
          : original.clone();
        const barycentric = new Float32Array(
          geometry.attributes.position.count * 3,
        );
        for (let i = 0; i < geometry.attributes.position.count; i++)
          barycentric[i * 3 + (i % 3)] = 1;
        geometry.setAttribute(
          "aBarycentric",
          new THREE.BufferAttribute(barycentric, 3),
        );
        geometryCache.set(original, geometry);
      }
      mesh.geometry = geometryCache.get(original);
      const source = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      const next = source.map((mat) => {
        const cloned = mat.clone();
        cloned.forceSinglePass = true;
        if (mobile)
          Object.keys(cloned).forEach((key) => {
            const texture = cloned[key];
            if (
              !texture?.isTexture ||
              !texture.image ||
              texture.image.width <= 768
            )
              return;
            if (!textureCache.has(texture)) {
              const canvas = document.createElement("canvas");
              canvas.width = 768;
              canvas.height = Math.max(
                1,
                Math.round((texture.image.height / texture.image.width) * 768),
              );
              const context = canvas.getContext("2d");
              if (!context) return;
              context.drawImage(
                texture.image,
                0,
                0,
                canvas.width,
                canvas.height,
              );
              const small = texture.clone();
              small.image = canvas;
              small.needsUpdate = true;
              textureCache.set(texture, small);
              textures.push(small);
            }
            cloned[key] = textureCache.get(texture);
          });
        if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
        const direction = mesh.geometry.boundingBox
          .getCenter(new THREE.Vector3())
          .normalize();
        if (direction.lengthSq() < 0.01) direction.set(0, 1, 0);
        injectExplosion(
          cloned,
          mesh.userData.burnoutWheel ? { value: 0 } : explode,
          Math.max(size.x, size.y, size.z) * 0.2,
          direction,
          blueprint,
        );
        materials.push(cloned);
        return cloned;
      });
      mesh.material = Array.isArray(mesh.material) ? next : next[0];
    });
    copy.position.set(
      -center.x * scale,
      -box.min.y * scale + 0.05,
      -center.z * scale,
    );
    copy.scale.setScalar(scale);
    return {
      copy,
      materials,
      textures,
      wheels,
      geometries: [...geometryCache.values()],
    };
  }, [scene, mobile, explode, blueprint]);
  useEffect(
    () => () => {
      model.materials.forEach((m) => m.dispose());
      model.geometries.forEach((geometry) => geometry.dispose());
      model.textures.forEach((t) => t.dispose());
    },
    [model],
  );
  useFrame((state, delta) => {
    const p = progress.current;
    const step = Math.min(delta, 0.05);
    const amount =
      THREE.MathUtils.smoothstep(p, 0.09, 0.3) *
      (1 - THREE.MathUtils.smoothstep(p, 0.39, 0.62));
    const blueprintTarget =
      THREE.MathUtils.smoothstep(p, 0.14, 0.32) *
      (1 - THREE.MathUtils.smoothstep(p, 0.4, 0.61));
    explode.value = THREE.MathUtils.damp(
      explode.value,
      reduced ? 0 : amount,
      2.4,
      step,
    );
    blueprint.value = THREE.MathUtils.damp(
      blueprint.value,
      reduced ? 0 : blueprintTarget,
      2.4,
      step,
    );
    if (group.current)
      group.current.rotation.y = reduced
        ? -0.45
        : -0.45 + Math.sin(state.clock.elapsedTime * 0.12) * 0.06;
  });
  return (
    <group ref={group}>
      <primitive object={model.copy} dispose={null} />
      <Burnout
        wheels={model.wheels}
        carRef={group}
        mobile={mobile}
        reduced={reduced}
      />
    </group>
  );
}
function Artifacts({ progress, mobile, reduced }) {
  const count = mobile ? 180 : 650;
  const geometry = useMemo(() => {
    const base = new THREE.BoxGeometry(1, 1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index.clone();
    Object.entries(base.attributes).forEach(([key, attr]) =>
      geo.setAttribute(key, attr.clone()),
    );
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      data[i * 3] = i * 2.399963;
      data[i * 3 + 1] = ((i * 73) % count) / count;
      data[i * 3 + 2] = ((i * 137) % count) / count;
    }
    geo.setAttribute("aOrbit", new THREE.InstancedBufferAttribute(data, 3));
    geo.instanceCount = count;
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -20), 65);
    base.dispose();
    return geo;
  }, [count]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color(palette[0]) },
    }),
    [],
  );
  const color = useMemo(() => new THREE.Color(), []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((state, delta) => {
    if (!reduced) uniforms.uTime.value += Math.min(delta, 0.05);
    uniforms.uProgress.value = progress.current;
    uniforms.uPointer.value.lerp(state.pointer, 0.03);
    uniforms.uColor.value.lerp(
      color.set(palette[Math.min(3, Math.floor(progress.current * 3.99))]),
      0.03,
    );
  });
  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={artifactVertex}
        fragmentShader={artifactFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
function CameraRig({ progress, telemetry, reduced, brake }) {
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const smooth = useRef(0),
    last = useRef(0);
  useFrame((state, delta) => {
    smooth.current = THREE.MathUtils.damp(
      smooth.current,
      progress.current,
      brake.current ? 1.2 : 4,
      delta,
    );
    const p = smooth.current;
    const frames = [
      [6.8, 3.1, 7.5],
      [6, 4.5, 6],
      [5.8, 2.8, 7.8],
      [0.3, 9, 5],
    ];
    const t = Math.min(p * 3, 2.999);
    const i = Math.floor(t);
    const mix = THREE.MathUtils.smoothstep(t - i, 0, 1);
    const a = frames[i],
      b = frames[Math.min(i + 1, 3)];
    target.set(
      reduced ? 6.8 : THREE.MathUtils.lerp(a[0], b[0], mix),
      reduced ? 3.1 : THREE.MathUtils.lerp(a[1], b[1], mix),
      reduced ? 7.5 : THREE.MathUtils.lerp(a[2], b[2], mix),
    );
    if (state.size.width < 700) target.multiplyScalar(1.3);
    state.camera.position.lerp(target, 1 - Math.exp(-delta * 5));
    const tunnel =
      THREE.MathUtils.smoothstep(p, 0.43, 0.62) *
      (1 - THREE.MathUtils.smoothstep(p, 0.73, 0.93));
    // Keep the complete car to the right of the project console, outside the cabin.
    look.set(reduced ? 0 : -2.2 * tunnel, 1, 0);
    state.camera.lookAt(look);
    if (state.clock.elapsedTime - last.current > 0.12 && telemetry.current) {
      telemetry.current.textContent = `X ${state.camera.position.x.toFixed(2)}  /  Y ${state.camera.position.y.toFixed(2)}  /  Z ${state.camera.position.z.toFixed(2)}`;
      last.current = state.clock.elapsedTime;
    }
  });
  return null;
}
function ContextMonitor({ onFailure }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (e) => {
      e.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}
export default function Scene({
  progress,
  telemetry,
  mobile,
  reduced,
  brake,
  onProject,
  onFailure,
  stage,
}) {
  return (
    <>
      <color attach="background" args={["#020202"]} />
      <fog attach="fog" args={["#020202", 14, 55]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 7, 4]} intensity={3.2} color="#e3edd9" />
      <directionalLight
        position={[-4, 3, -2]}
        intensity={1.1}
        color="#6cbfff"
      />
      <Environment files="/potsdamer_platz_1k.hdr" environmentIntensity={0.6} />
      <Car progress={progress} mobile={mobile} reduced={reduced} />
      <Artifacts progress={progress} mobile={mobile} reduced={reduced} />
      <Grid
        position={[0, -0.02, 0]}
        args={[80, 80]}
        cellSize={1}
        sectionSize={5}
        cellColor="#172820"
        sectionColor="#416149"
        fadeDistance={25}
        fadeStrength={1.5}
        infiniteGrid
      />
      <CameraRig
        progress={progress}
        telemetry={telemetry}
        reduced={reduced}
        brake={brake}
      />
      {stage === 2 && <ProjectHolograms brake={brake} onProject={onProject} />}
      {stage === 2 && (
        <HeadlightBeams brake={brake} mobile={mobile} reduced={reduced} />
      )}
      <RenderActivity reduced={reduced} />
      <ContextMonitor onFailure={onFailure} />
    </>
  );
}
