import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

// Demand rendering: wake for interaction, keep the smoke/camera settling, then
// stop GPU work completely. No second requestAnimationFrame loop or timer.
export default function RenderActivity({ reduced }) {
  const { invalidate, setDpr } = useThree();
  const deadline = useRef(performance.now() + 5000);
  const samples = useRef({ slow: 0, frames: 0, lowered: false });
  useEffect(() => {
    const wake = (event) => {
      if (document.hidden) return;
      const settle = reduced ? 180 : event?.type === "pointermove" ? 450 : 5000;
      deadline.current = Math.max(deadline.current, performance.now() + settle);
      invalidate();
    };
    const events = [
      "scroll",
      "resize",
      "pointermove",
      "pointerdown",
      "keydown",
      "visibilitychange",
    ];
    events.forEach((name) =>
      window.addEventListener(name, wake, { passive: true }),
    );
    wake();
    return () =>
      events.forEach((name) => window.removeEventListener(name, wake));
  }, [invalidate, reduced]);
  useFrame((_, delta) => {
    if (document.hidden) return;
    if (performance.now() < deadline.current) {
      invalidate();
      // Ignore idle gaps and shader compilation; lower resolution only after
      // sustained slow active frames, without rebuilding model materials.
      if (delta > 0 && delta < 0.15 && !samples.current.lowered) {
        samples.current.frames++;
        if (delta > 0.024) samples.current.slow++;
        if (samples.current.frames >= 120) {
          if (samples.current.slow > 45) {
            setDpr(1);
            samples.current.lowered = true;
          }
          samples.current.frames = 0;
          samples.current.slow = 0;
        }
      }
    }
  });
  return null;
}
