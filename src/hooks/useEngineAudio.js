import { useCallback, useEffect, useRef, useState } from 'react';

// Ambient engine hum + sector-change tick, built on raw WebAudio.
// Muted by default; the AudioContext is only created on the first
// user toggle so autoplay policies are respected.
const useEngineAudio = () => {
  const [enabled, setEnabled] = useState(false);
  const engineRef = useRef(null);

  const buildEngine = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;

    const ctx = new AudioCtx();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 240;
    filter.Q.value = 0.7;
    filter.connect(master);

    const oscA = ctx.createOscillator();
    oscA.type = 'sawtooth';
    oscA.frequency.value = 46;

    const oscB = ctx.createOscillator();
    oscB.type = 'sawtooth';
    oscB.frequency.value = 69;
    oscB.detune.value = 9;

    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 23;

    const mixA = ctx.createGain();
    mixA.gain.value = 0.45;
    const mixB = ctx.createGain();
    mixB.gain.value = 0.25;
    const mixSub = ctx.createGain();
    mixSub.gain.value = 0.6;

    oscA.connect(mixA).connect(filter);
    oscB.connect(mixB).connect(filter);
    sub.connect(mixSub).connect(filter);

    oscA.start();
    oscB.start();
    sub.start();

    return { ctx, master, filter, oscA, oscB, sub };
  };

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;

      if (next) {
        if (!engineRef.current) {
          engineRef.current = buildEngine();
        }
        const engine = engineRef.current;
        if (engine) {
          engine.ctx.resume();
          engine.master.gain.setTargetAtTime(0.035, engine.ctx.currentTime, 0.4);
        }
      } else if (engineRef.current) {
        const engine = engineRef.current;
        engine.master.gain.setTargetAtTime(0, engine.ctx.currentTime, 0.15);
      }

      return next;
    });
  }, []);

  // rpm in [0, 1] — pitches the hum with scroll velocity.
  const setRpm = useCallback((rpm) => {
    const engine = engineRef.current;
    if (!engine) return;
    const t = engine.ctx.currentTime;
    engine.oscA.frequency.setTargetAtTime(46 + rpm * 74, t, 0.08);
    engine.oscB.frequency.setTargetAtTime(69 + rpm * 111, t, 0.08);
    engine.sub.frequency.setTargetAtTime(23 + rpm * 32, t, 0.08);
    engine.filter.frequency.setTargetAtTime(240 + rpm * 620, t, 0.08);
  }, []);

  // Short gearbox tick on sector change.
  const tick = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const { ctx } = engine;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 1250;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.028, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }, []);

  useEffect(() => () => {
    if (engineRef.current) {
      engineRef.current.ctx.close();
      engineRef.current = null;
    }
  }, []);

  return { enabled, toggle, setRpm, tick };
};

export default useEngineAudio;
