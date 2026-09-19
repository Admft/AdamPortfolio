export const artifactVertex = `
attribute vec3 aOrbit;
uniform float uTime;
uniform float uProgress;
uniform vec2 uPointer;
varying float vLight;
void main() {
  float angle = aOrbit.x + uTime * (0.06 + aOrbit.z * 0.025);
  float radius = 4.5 + aOrbit.y * 8.0;
  vec3 orbit = vec3(cos(angle) * radius, sin(aOrbit.x * 3.0 + uTime * 0.15) * 3.0 + 1.0, sin(angle) * radius);
  vec3 cluster = vec3(floor(aOrbit.y * 5.0) * 2.4 - 5.0, floor(aOrbit.z * 5.0) * 1.1 - 1.0, -4.0 + sin(aOrbit.x) * 0.2);
  float blueprint = smoothstep(0.12, 0.3, uProgress) * (1.0 - smoothstep(0.4, 0.6, uProgress));
  vec3 offset = mix(orbit, cluster, blueprint);
  float tunnel = smoothstep(0.43, 0.6, uProgress) * (1.0 - smoothstep(0.77, 0.9, uProgress));
  vec3 stream = vec3(cos(aOrbit.x) * (3.0 + aOrbit.y * 4.0), sin(aOrbit.x) * (3.0 + aOrbit.y * 4.0) + 1.0, mod(aOrbit.z * 70.0 + uTime * 15.0, 70.0) - 55.0);
  offset = mix(offset, stream, tunnel);
  offset.xy += uPointer * 0.35 * (1.0 - tunnel);
  vec3 local = position * (0.02 + aOrbit.y * 0.04);
  local.z *= 1.0 + tunnel * 22.0;
  vLight = 0.3 + aOrbit.z * 0.7;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(local + offset, 1.0);
}`;
export const artifactFragment = `
uniform vec3 uColor;
varying float vLight;
void main() { gl_FragColor = vec4(uColor * (0.7 + vLight), 0.65); }
`;
export function injectExplosion(
  material,
  uniform,
  amount,
  direction,
  blueprint,
) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uExplode = uniform;
    shader.uniforms.uBlueprint = blueprint;
    shader.uniforms.uDistance = { value: amount };
    shader.uniforms.uPanelDirection = { value: direction };
    shader.vertexShader =
      "attribute vec3 aBarycentric;\nvarying vec3 vBarycentric;\nuniform float uExplode;\nuniform float uDistance;\nuniform vec3 uPanelDirection;\n" +
      shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      vBarycentric = aBarycentric;
      vec3 direction = normalize(position + normal * 0.1 + vec3(0.001));
      transformed += (uPanelDirection + direction * 0.08) * uDistance * uExplode;
    `,
    );
    shader.fragmentShader =
      "uniform float uBlueprint;\nvarying vec3 vBarycentric;\n" +
      shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <opaque_fragment>",
      `
      #include <opaque_fragment>
      vec3 width = max(fwidth(vBarycentric), vec3(0.00001));
      vec3 antialiased = smoothstep(vec3(0.0), width * 1.15, vBarycentric);
      float edge = 1.0 - min(min(antialiased.x, antialiased.y), antialiased.z);
      // Screen-door dissolve keeps depth correct without a second wireframe pass.
      float threshold = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
      if (threshold < uBlueprint * (1.0 - edge)) discard;
      gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.43, 0.86, 0.92), uBlueprint * edge * 0.85);
    `,
    );
  };
  material.customProgramCacheKey = () => "am-blueprint-blend-v2";
}
