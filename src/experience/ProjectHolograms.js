import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { projects } from "../portfolio/content";

function Panel({ project, index, brake, onProject }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 384;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#100c20";
    ctx.fillRect(0, 0, 768, 384);
    ctx.strokeStyle = "#a990dd";
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, 764, 380);
    ctx.fillStyle = "#bba2ed";
    ctx.font = "18px monospace";
    ctx.fillText(`CASE FILE / 0${index + 1}`, 40, 64);
    ctx.fillStyle = "#eee7ff";
    ctx.font = "32px sans-serif";
    const words = project.name.split(" ");
    let line = "",
      y = 160;
    words.forEach((word) => {
      if (ctx.measureText(`${line}${word}`).width > 680) {
        ctx.fillText(line, 40, y);
        line = "";
        y += 44;
      }
      line += `${word} `;
    });
    ctx.fillText(line, 40, y);
    ctx.fillStyle = "#bba2ed";
    ctx.font = "18px monospace";
    ctx.fillText(project.tags.slice(0, 2).join(" / "), 40, 322);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, [project, index]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh
      position={[index % 2 ? 2.6 : -2.6, 1.7, -4 - index * 5]}
      rotation={[0, index % 2 ? -0.2 : 0.2, 0]}
      onPointerOver={(event) => {
        event.stopPropagation();
        brake.current = true;
        onProject(project);
      }}
      onPointerOut={() => {
        brake.current = false;
      }}
      onClick={() => onProject(project)}
    >
      <planeGeometry args={[3.2, 1.6]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
export default function ProjectHolograms(props) {
  useEffect(
    () => () => {
      props.brake.current = false;
    },
    [props.brake],
  );
  return (
    <group>
      {projects.slice(0, 3).map((project, index) => (
        <Panel key={project.id} project={project} index={index} {...props} />
      ))}
    </group>
  );
}
