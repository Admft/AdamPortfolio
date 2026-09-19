import { useCallback, useEffect, useRef, useState } from "react";
export default function useAudio() {
  const audio = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const cue = useCallback((frequency = 500, duration = 0.08) => {
    const ctx = audio.current;
    if (!ctx || ctx.state !== "running") return;
    const osc = ctx.createOscillator(),
      gain = ctx.createGain();
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(30, frequency / 3),
      ctx.currentTime + duration,
    );
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }, []);
  async function toggle() {
    try {
      if (enabled) {
        await audio.current?.suspend();
        setEnabled(false);
        return;
      }
      if (!audio.current) {
        const Context = window.AudioContext || window.webkitAudioContext;
        if (!Context) return;
        const ctx = new Context();
        audio.current = ctx;
        const hum = ctx.createOscillator(),
          gain = ctx.createGain();
        hum.frequency.value = 48;
        gain.gain.value = 0.012;
        hum.connect(gain).connect(ctx.destination);
        hum.start();
      }
      await audio.current.resume();
      setEnabled(true);
      cue();
    } catch {
      setEnabled(false);
    }
  }
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        audio.current?.suspend();
        setEnabled(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      audio.current?.close();
    };
  }, []);
  return { enabled, toggle, cue };
}
