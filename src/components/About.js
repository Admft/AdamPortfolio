import React from 'react';
import { motion } from 'framer-motion';
import SectorHeader from './ui/SectorHeader';

const focusAreas = [
  {
    index: '01',
    title: 'Cloud & Data',
    body: 'Azure Log Analytics, KQL pipelines, Python automation, and executive reporting that turns telemetry into decisions stakeholders can act on.',
  },
  {
    index: '02',
    title: 'AI Systems',
    body: 'RAG evaluation research, agentic orchestration, LLM tool-calling, eval harnesses, and grounding strategies for production AI workflows.',
  },
  {
    index: '03',
    title: 'Software',
    body: 'Full-stack delivery with React, TypeScript, Node, and FastAPI — from internal automation tools to client-facing products and demo apps.',
  },
  {
    index: '04',
    title: 'Forward Deployed',
    body: 'Onsite pilot execution, demo readiness, API debugging, and translating messy field findings into clear technical narratives for R&D and customers.',
  },
];

const targetRoles = [
  'Solutions Engineer',
  'Forward Deployed Engineer',
  'AI Engineer',
  'Startup Generalist',
];

const About = () => (
  <section id="driver" className="site-section">
    <div className="site-container">
      <SectorHeader
        sector="03"
        code="Driver profile — Car 63"
        title="The Driver"
        sub="Solutions engineer who ships — Azure pipelines, RAG systems, full-stack tools, and field deployments. I debug hard problems, automate the reporting around them, and make the results legible to engineering and business stakeholders."
      />

      <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* driver card */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4"
        >
          <div className="relative overflow-hidden border border-white/10 bg-black/70">
            <img
              src={`${process.env.PUBLIC_URL}/Adamheadshot.webp`}
              alt="Adam Moffat"
              className="aspect-square w-full object-cover"
            />
            <div className="absolute left-0 top-0 bg-race-red px-3 py-1.5 font-display text-2xl leading-none text-white">
              63
            </div>
            <div className="border-t-2 border-race-red bg-black/85 px-4 py-3">
              <p className="font-display text-xl uppercase text-white">Adam Moffat</p>
              <p className="mt-0.5 font-tele text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                Dallas, TX · VusionGroup
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {targetRoles.map((role) => (
              <span
                key={role}
                className="border border-white/15 bg-black/60 px-2.5 py-1 font-tele text-[10px] uppercase tracking-[0.14em] text-zinc-300"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.div>

        {/* numbered focus index — no cards, left rules */}
        <div className="readable lg:col-span-8">
          <div className="space-y-0">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.05 }}
                className="group flex gap-5 border-b border-white/10 py-6 first:pt-0 md:gap-8"
              >
                <span className="font-display text-4xl leading-none text-zinc-700 transition-colors group-hover:text-race-red md:text-5xl">
                  {area.index}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-xl uppercase tracking-wide text-white md:text-2xl">
                    {area.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base md:leading-7">
                    {area.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* current seat + superlicence — borderless, left rule */}
      <div className="readable grid grid-cols-1 gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-l-2 border-race-red pl-6"
        >
          <p className="font-tele text-[10px] uppercase tracking-[0.3em] text-race-red">
            Current seat
          </p>
          <h3 className="mt-2 font-display text-2xl uppercase text-white md:text-3xl">
            Associate Field Application Engineer
          </h3>
          <p className="mt-1 font-tele text-xs uppercase tracking-[0.16em] text-zinc-400">
            VusionGroup · Coppell, TX
          </p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300 md:text-base">
            <p>
              Technical bridge between North American operations and global R&D.
              Building Azure/KQL reporting pipelines, Python automation for executive
              decks, API integrations, and AI vision pilot support for enterprise
              retail deployments.
            </p>
            <p className="text-zinc-400">
              IoT and BLE field work (ESL, AP migrations, RSSI analysis) supports the
              cloud and software story — not the headline. The through-line is
              telemetry → insight → action.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="border-l-2 border-data-blue pl-6"
        >
          <p className="font-tele text-[10px] uppercase tracking-[0.3em] text-data-blue">
            Superlicence
          </p>
          <div className="mt-4 space-y-6">
            <div>
              <p className="font-semibold text-white">Cornell University</p>
              <p className="mt-1 text-sm leading-6 text-zinc-300">
                M.Eng Engineering Management · GPA 4.0
                <br />
                Focus: Technical Sales Strategy &amp; Operations
                <br />
                <span className="font-tele text-xs text-zinc-500">Expected Dec 2027</span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">UT Dallas</p>
              <p className="mt-1 text-sm leading-6 text-zinc-300">
                B.S. Computer Science · GPA 3.6
                <br />
                <span className="font-tele text-xs text-zinc-500">
                  Cloud Computing · Network Security · Algorithms
                </span>
              </p>
            </div>
            <div>
              <p className="font-tele text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                Microsoft Azure
              </p>
              <p className="mt-1 text-sm text-zinc-300">
                <span className="text-caution">AZ-900 certified</span> — pursuing AI
                Engineer (AI-102), Admin (AZ-104), Solutions Architect (AZ-305)
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="readable mt-12 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8"
      >
        <p className="mr-auto max-w-xl text-sm leading-6 text-zinc-400">
          Cornell MEM on nights and weekends, founding engineer at Causey, HouseFax
          on the side, published RAG evaluation research. Same standard everywhere:
          source-grounded outputs, reproducible pipelines, results you can defend
          in a room full of engineers.
        </p>
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex items-center gap-2 border px-6 py-3 font-tele text-xs uppercase tracking-[0.2em] transition-colors"
        >
          Media kit / Resume
        </a>
        <a
          href="#research"
          className="inline-flex items-center gap-2 border border-white/15 px-6 py-3 font-tele text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-white/35 hover:text-white"
        >
          RAG Research
        </a>
      </motion.div>
    </div>
  </section>
);

export default About;
