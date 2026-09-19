import React, {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import Scene from "./Scene";
import { projects, skills } from "../portfolio/content";
import ContactForm from "../portfolio/ContactForm";
import GitHubActivity from "../portfolio/GitHubActivity";
import useAudio from "./useAudio";
import "./experience.css";
gsap.registerPlugin(ScrollTrigger);
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function LoadingIndicator() {
  const { active, progress } = useProgress();
  return active ? (
    <div className="asset-progress" role="status">
      LOADING STUDIO <span>{Math.round(progress)}%</span>
      <progress max="100" value={progress} />
    </div>
  ) : null;
}
function canRender() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}
export default function CarExperience({ exit }) {
  const root = useRef(),
    progress = useRef(0),
    telemetry = useRef(),
    cursor = useRef(),
    brake = useRef(false);
  const [stage, setStage] = useState(0),
    [selected, setSelected] = useState(projects[0]);
  const [failed, setFailed] = useState(() => !canRender());
  const [hidden, setHidden] = useState(document.hidden);
  const [mobile, setMobile] = useState(
    () => window.matchMedia("(max-width: 700px)").matches,
  );
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const { enabled, toggle, cue } = useAudio();
  const fail = useCallback(() => setFailed(true), []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)"),
      size = window.matchMedia("(max-width: 700px)");
    const onMotion = (e) => setReduced(e.matches),
      onSize = (e) => setMobile(e.matches),
      visibility = () => setHidden(document.hidden);
    media.addEventListener("change", onMotion);
    size.addEventListener("change", onSize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", onMotion);
      size.removeEventListener("change", onSize);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    const controller = ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current = self.progress;
        setStage(Math.min(3, Math.floor(self.progress * 3.99)));
      },
    });
    return () => controller.kill();
  }, []);
  useEffect(() => {
    cue(stage === 3 ? 85 : 350, stage === 3 ? 0.4 : 0.08);
  }, [stage, cue]);
  useEffect(() => {
    if (mobile || reduced) return;
    const move = (e) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        cursor.current.dataset.active = e.target.closest(
          "a,button,input,textarea",
        )
          ? "true"
          : "false";
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mobile, reduced]);
  const stageNames = ["IGNITION", "BLUEPRINT", "DATA STREAM", "ASSEMBLY"];
  return (
    <div className={`car-experience car-stage-${stage}`} ref={root}>
      <a className="skip-link" href="#car-contact">
        Skip to contact
      </a>
      <div className="scene-layer" aria-hidden="true">
        {!failed && (
          <SceneBoundary onFailure={fail}>
            <Canvas
              camera={{
                position: [6.8, 3.1, 7.5],
                fov: 44,
                near: 0.1,
                far: 100,
              }}
              dpr={mobile ? 1.25 : 1.5}
              performance={{ min: 0.5 }}
              frameloop={hidden ? "never" : "demand"}
              gl={{
                antialias: true,
                powerPreference: "high-performance",
                alpha: false,
              }}
            >
              <Suspense fallback={null}>
                <Scene
                  stage={stage}
                  progress={progress}
                  telemetry={telemetry}
                  mobile={mobile}
                  reduced={reduced}
                  brake={brake}
                  onProject={setSelected}
                  onFailure={fail}
                />
              </Suspense>
            </Canvas>
          </SceneBoundary>
        )}
      </div>
      <div className="cinema-shade" />
      <header className="cinema-nav">
        <button onClick={exit} className="exit-button">
          <ArrowLeft size={15} /> Portfolio
        </button>
        <a className="cinema-brand" href="#car-top">
          AM<span> / ENGINEERING IN MOTION</span>
        </a>
        <button
          className="audio-button"
          onClick={toggle}
          aria-pressed={enabled}
        >
          {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>SOUND {enabled ? "ON" : "OFF"}</span>
        </button>
      </header>
      <div className="cinema-status">
        <span>
          <i /> LIVE EXPERIENCE
        </span>
        <span>
          {failed
            ? "STATIC MODE / 3D UNAVAILABLE"
            : reduced
              ? "REDUCED MOTION"
              : mobile
                ? "ADAPTIVE QUALITY"
                : "WEBGL / REAL TIME"}
        </span>
      </div>
      {failed && (
        <div className="webgl-notice" role="status">
          3D is unavailable on this device. You can still explore the work
          below.
        </div>
      )}
      {!failed && <LoadingIndicator />}
      <main>
        <section className="cinema-section ignition" id="car-top">
          <div className="cinema-title">
            <span className="cinema-label">
              ADAM MOFFAT / SALES ENGINEER & BUILDER
            </span>
            <h1>
              Driven by curiosity.
              <br />
              <span>Engineered for impact.</span>
            </h1>
            <p>
              Technical depth. Human connection.
              <br />
              Experience what happens when the two meet.
            </p>
          </div>
          <a className="scroll-prompt" href="#car-about">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={15} />
          </a>
          <div className="vehicle-caption">
            MERCEDES-AMG C63
            <br />
            <span>01 / THE WAKE UP</span>
          </div>
        </section>
        <section className="cinema-section blueprint" id="car-about">
          <div className="cinema-section-title">
            <span className="cinema-label">01 / THE BLUEPRINT</span>
            <h2>
              Under the surface.
              <br />
              <span>Beyond the spec sheet.</span>
            </h2>
            <p>
              The most valuable component is the connection
              <br />
              between what’s possible and what people need.
            </p>
          </div>
          <div className="blueprint-cards">
            {skills.map((skill) => (
              <article key={skill.number}>
                <span>{skill.number} / CAPABILITY</span>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="cinema-section data-stream" id="car-work">
          <div className="cinema-section-title">
            <span className="cinema-label">02 / THE DATA STREAM</span>
            <h2>
              Built to solve.
              <br />
              <span>Proven in the real world.</span>
            </h2>
          </div>
          <div className="project-console">
            <div
              className="console-tabs"
              role="tablist"
              aria-label="Project case studies"
            >
              {projects.map((project, i) => (
                <button
                  role="tab"
                  key={project.id}
                  id={`tab-${project.id}`}
                  aria-selected={selected.id === project.id}
                  aria-controls="project-readout"
                  tabIndex={selected.id === project.id ? 0 : -1}
                  onKeyDown={(e) => {
                    if (
                      ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                    ) {
                      e.preventDefault();
                      const next =
                        e.key === "Home"
                          ? 0
                          : e.key === "End"
                            ? projects.length - 1
                            : (i +
                                (e.key === "ArrowRight"
                                  ? 1
                                  : projects.length - 1)) %
                              projects.length;
                      setSelected(projects[next]);
                      document
                        .getElementById(`tab-${projects[next].id}`)
                        ?.focus();
                    }
                  }}
                  onClick={() => {
                    setSelected(project);
                    cue();
                  }}
                >
                  {String(i + 1).padStart(2, "0")} <span>{project.name}</span>
                </button>
              ))}
            </div>
            <article
              id="project-readout"
              role="tabpanel"
              aria-labelledby={`tab-${selected.id}`}
              tabIndex={0}
              onPointerEnter={() => {
                brake.current = true;
              }}
              onPointerLeave={() => {
                brake.current = false;
              }}
            >
              <span className="cinema-label">{selected.category}</span>
              <h3>{selected.name}</h3>
              <p>{selected.solution}</p>
              <p className="console-outcome">{selected.outcome}</p>
              <div className="console-metric">
                <strong>{selected.metric}</strong>
                <span>{selected.metricLabel}</span>
              </div>
              <div className="tags">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {selected.href && (
                <a
                  className="text-link"
                  href={selected.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit project <ArrowUpRight size={16} />
                </a>
              )}
            </article>
          </div>
        </section>
        <section className="cinema-section assembly" id="car-contact">
          <div className="cinema-section-title">
            <span className="cinema-label">03 / THE ASSEMBLY</span>
            <h2>
              All the pieces.
              <br />
              <span>Your next possibility.</span>
            </h2>
            <p>
              Let’s build the connection between your technology
              <br />
              and the people who need it.
            </p>
            <a className="text-link" href="mailto:arm393@cornell.edu">
              arm393@cornell.edu <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="assembly-contact">
            <ContactForm terminal />
            <GitHubActivity compact />
          </div>
        </section>
      </main>
      <footer className="cinema-footer">
        <span>© {new Date().getFullYear()} ADAM MOFFAT</span>
        <a
          href="https://sketchfab.com/3d-models/2018-mercedes-amg-c63-amg-cabriolet-af1793cf9d0946dda4e35e82c9ff518f"
          target="_blank"
          rel="noreferrer"
        >
          C63 model: Ddiaz Design · CC BY-NC-SA 4.0
        </a>
        <button onClick={exit}>RETURN TO PORTFOLIO ↗</button>
      </footer>
      <div className="cinema-hud">
        <span className="hud-stage">
          0{stage + 1}
          <span> / {stageNames[stage]}</span>
        </span>
        <div className="stage-markers">
          {stageNames.map((name, i) => (
            <a
              key={name}
              href={`#${["car-top", "car-about", "car-work", "car-contact"][i]}`}
              aria-label={`Go to ${name.toLowerCase()}`}
              aria-current={stage === i ? "step" : undefined}
              className={stage === i ? "active" : ""}
            />
          ))}
        </div>
        <span className="telemetry" ref={telemetry}>
          X 6.80 / Y 3.10 / Z 7.50
        </span>
      </div>
      {!mobile && !reduced && (
        <div className="depth-cursor" ref={cursor} aria-hidden="true">
          <span />
          <i />
        </div>
      )}
    </div>
  );
}
