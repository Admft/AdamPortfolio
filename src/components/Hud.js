import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SECTORS = [
  { id: 'grid', label: 'S1 · GRID' },
  { id: 'stats', label: 'S2 · SEASON STATS' },
  { id: 'driver', label: 'S3 · DRIVER' },
  { id: 'pitwall', label: 'S4 · PIT WALL' },
  { id: 'garage', label: 'S5 · GARAGE' },
  { id: 'research', label: 'S6 · R&D' },
  { id: 'results', label: 'S7 · RESULTS' },
  { id: 'quali', label: 'S8 · QUALIFYING' },
  { id: 'radio', label: 'S9 · RADIO' },
];

const SYSTEMS = [
  'REACT.JS CORE',
  'WEBGL / THREE.JS',
  'FRAMER MOTION',
  'TAILWIND CSS',
  'AZURE UPLINK',
  'KQL PIPELINE',
];

const Hud = ({ trackMode, soundOn, toggleSound, setRpm, tick }) => {
  const [sectorLabel, setSectorLabel] = useState(SECTORS[0].label);
  const [systemsOpen, setSystemsOpen] = useState(false);

  const rpmFillRef = useRef(null);
  const gearRef = useRef(null);
  const speedRef = useRef(null);
  const rpmRef = useRef(0);
  const lastScrollRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const firstSectorRef = useRef(true);
  const tickRef = useRef(tick);
  tickRef.current = tick;

  const showSystems = trackMode || systemsOpen;

  // Live gauges written straight to the DOM — no per-frame re-renders.
  useEffect(() => {
    let frameId;

    const step = () => {
      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollRef.current);
      lastScrollRef.current = scrollY;

      const target = Math.min(1, delta / 42);
      rpmRef.current = Math.max(rpmRef.current * 0.93, target);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // idle rpm floor so the needle never fully dies
      const rpm = Math.max(0.06, rpmRef.current);

      if (rpmFillRef.current) {
        // the ref is a dark mask over the gradient — pull its left edge to reveal rpm
        rpmFillRef.current.style.left = `${rpm * 100}%`;
      }
      if (gearRef.current) {
        gearRef.current.textContent = String(1 + Math.min(7, Math.floor(progress * 8)));
      }
      if (speedRef.current) {
        speedRef.current.textContent = String(Math.round(progress * 312)).padStart(3, '0');
      }

      setRpm(rpm);
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [setRpm]);

  // Sector detection + shift tick on change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = SECTORS.find((s) => s.id === entry.target.id);
          if (!match) return;
          setSectorLabel((prev) => {
            if (prev === match.label) return prev;
            if (firstSectorRef.current) {
              firstSectorRef.current = false;
            } else {
              tickRef.current();
            }
            return match.label;
          });
        });
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    );

    SECTORS.forEach((sector) => {
      const el = document.getElementById(sector.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* expanded telemetry panel — forced open in track mode */}
      <AnimatePresence>
        {showSystems && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="hud-bar fixed inset-x-0 bottom-10 z-40 border-b border-white/10"
          >
            <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-7 gap-y-1.5 px-4 py-2">
              <span className="font-tele text-[9px] uppercase tracking-[0.28em] text-zinc-500">
                {trackMode ? 'Track mode — telemetry forced open' : 'System telemetry'}
              </span>
              {SYSTEMS.map((system) => (
                <span
                  key={system}
                  className="flex items-center gap-1.5 font-tele text-[9px] uppercase tracking-[0.16em] text-zinc-300"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  </span>
                  {system}
                  <span className="text-green-400">OPERATIONAL</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the instrument cluster bar */}
      <div className="hud-bar fixed inset-x-0 bottom-0 z-50 h-10">
        {trackMode && (
          <div className="redline-flicker absolute inset-x-0 top-0 h-[2px] bg-race-red" />
        )}
        <div className="mx-auto flex h-full max-w-6xl items-center gap-3 px-4 font-tele md:gap-5">
          {/* mode lamp */}
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              trackMode ? 'bg-race-red lamp-on' : 'bg-green-500'
            }`}
          />

          {/* current sector */}
          <span className="min-w-0 shrink truncate text-[10px] uppercase tracking-[0.2em] text-white">
            {sectorLabel}
          </span>

          {/* gear */}
          <span className="hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-zinc-500 sm:flex">
            Gear
            <span ref={gearRef} className="font-display text-base leading-none text-caution">
              1
            </span>
          </span>

          {/* rpm bar */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="hidden text-[9px] uppercase tracking-[0.2em] text-zinc-500 md:inline">
              RPM
            </span>
            <div className="relative h-2.5 min-w-0 flex-1 overflow-hidden rounded-sm bg-zinc-900">
              <div className="rpm-track absolute inset-0" />
              <div
                ref={rpmFillRef}
                className="absolute inset-y-0 right-0 bg-black/85"
                style={{ left: '6%' }}
              />
            </div>
          </div>

          {/* speed */}
          <span className="hidden items-baseline gap-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500 sm:flex">
            <span ref={speedRef} className="text-sm text-data-blue">
              000
            </span>
            km/h
          </span>

          {/* systems toggle (hidden in track mode — it's forced open) */}
          {!trackMode && (
            <button
              type="button"
              onClick={() => setSystemsOpen((v) => !v)}
              className={`hidden shrink-0 border px-2 py-1 text-[9px] uppercase tracking-[0.2em] transition-colors md:inline-flex ${
                systemsOpen
                  ? 'border-green-500/50 text-green-400'
                  : 'border-white/15 text-zinc-400 hover:text-white'
              }`}
            >
              SYS
            </button>
          )}

          {/* sound toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'Mute engine audio' : 'Enable engine audio'}
            className={`shrink-0 border px-2 py-1 text-[9px] uppercase tracking-[0.2em] transition-colors ${
              soundOn
                ? 'border-caution/60 text-caution'
                : 'border-white/15 text-zinc-400 hover:text-white'
            }`}
          >
            SND {soundOn ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Hud;
