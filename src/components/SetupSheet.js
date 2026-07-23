import React from 'react';
import { motion } from 'framer-motion';
import SectorHeader from './ui/SectorHeader';

const gearRatios = [
  { gear: 'GEAR 1', value: 'Azure' },
  { gear: 'GEAR 2', value: 'KQL' },
  { gear: 'GEAR 3', value: 'Python' },
  { gear: 'GEAR 4', value: 'React' },
  { gear: 'GEAR 5', value: 'TypeScript' },
  { gear: 'GEAR 6', value: 'FastAPI' },
  { gear: 'GEAR 7', value: 'PostgreSQL' },
  { gear: 'GEAR 8', value: 'Three.js / WebGL' },
];

const setupRows = [
  { label: 'FRONT WING ANGLE', value: 'React 18 · Framer Motion' },
  { label: 'REAR WING ANGLE', value: 'Tailwind CSS' },
  { label: 'TIRE PRESSURE — FL / FR', value: 'TypeScript / Node.js' },
  { label: 'TIRE PRESSURE — RL / RR', value: 'FastAPI / PostgreSQL' },
  { label: 'BRAKE BIAS', value: '54% RAG / 46% LLM Evals' },
  { label: 'DIFF — ENTRY / MID / EXIT', value: 'LlamaIndex / Qdrant / Ollama' },
  { label: 'ERS DEPLOYMENT MAP', value: 'Power BI · Pandas · Scikit-learn' },
  { label: 'TELEMETRY UPLINK', value: 'Azure Log Analytics · KQL' },
  { label: 'PIT EQUIPMENT', value: 'Docker · Git · AWS · Postman · Playwright' },
  { label: 'RADIO FREQUENCY', value: 'REST APIs · Android Studio' },
];

const SetupSheet = () => (
  <section id="garage" className="site-section">
    <div className="site-container">
      <SectorHeader
        sector="05"
        code="Garage — car 63 setup"
        title="Setup Sheet"
        sub="The tools behind the forward-deployed loop — from telemetry and APIs to production software, AI evaluation, and customer-ready delivery."
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="readable border border-white/12 bg-black/70 backdrop-blur-sm"
      >
        {/* sheet header */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/12 px-5 py-4 md:px-8">
          <p className="font-display text-xl uppercase text-white md:text-2xl">
            Car 63 — Setup Sheet
          </p>
          <p className="font-tele text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            Round 07 · Dallas GP · Session: Race
          </p>
          <span className="stamp ml-auto">Scrutineered · AZ-900</span>
        </div>

        <div className="grid grid-cols-1 gap-x-12 px-5 py-6 md:grid-cols-2 md:px-8 md:py-8">
          {/* left column: setup values */}
          <div>
            <p className="mb-4 font-tele text-[10px] uppercase tracking-[0.3em] text-race-red">
              Chassis &amp; aero
            </p>
            <div className="space-y-3">
              {setupRows.map((row) => (
                <div key={row.label} className="flex items-baseline font-tele text-xs md:text-[13px]">
                  <span className="uppercase tracking-[0.12em] text-zinc-400">{row.label}</span>
                  <span className="leader" />
                  <span className="text-right text-data-blue">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* right column: gear ratios */}
          <div className="mt-8 md:mt-0">
            <p className="mb-4 font-tele text-[10px] uppercase tracking-[0.3em] text-race-red">
              Gear ratios
            </p>
            <div className="space-y-3">
              {gearRatios.map((row, i) => (
                <div key={row.gear} className="flex items-baseline font-tele text-xs md:text-[13px]">
                  <span className="w-16 uppercase tracking-[0.12em] text-zinc-400">{row.gear}</span>
                  <span className="mr-3 text-zinc-600">{String(i + 1).padStart(2, '0')}:1</span>
                  <span className="leader" />
                  <span className="text-right text-data-blue">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-dashed border-white/15 pt-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-tele text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                    Race engineer
                  </p>
                  <p
                    className="mt-1 text-xl text-zinc-200"
                    style={{ fontFamily: 'cursive' }}
                  >
                    A. Moffat
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-tele text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                    Sheet no.
                  </p>
                  <p className="mt-1 font-tele text-sm text-caution">063-2026-R07</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SetupSheet;
