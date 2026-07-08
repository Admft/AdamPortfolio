import React from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Brain,
  Code2,
  Rocket,
} from 'lucide-react';
import Panel from './ui/Panel';
import SectionLabel from './ui/SectionLabel';

const focusAreas = [
  {
    icon: Cloud,
    title: 'Cloud & Data',
    body: 'Azure Log Analytics, KQL pipelines, Python automation, and executive reporting that turns telemetry into decisions stakeholders can act on.',
  },
  {
    icon: Brain,
    title: 'AI Systems',
    body: 'RAG evaluation research, agentic orchestration, LLM tool-calling, eval harnesses, and grounding strategies for production AI workflows.',
  },
  {
    icon: Code2,
    title: 'Software',
    body: 'Full-stack delivery with React, TypeScript, Node, and FastAPI — from internal automation tools to client-facing products and demo apps.',
  },
  {
    icon: Rocket,
    title: 'Forward Deployed',
    body: 'Onsite pilot execution, demo readiness, API debugging, and translating messy field findings into clear technical narratives for R&D and customers.',
  },
];

const targetRoles = [
  'Solutions Engineer',
  'Forward Deployed Engineer',
  'AI Engineer',
  'Software Engineer (startup generalist)',
];

const metrics = [
  { value: 'Azure', label: 'AZ-900' },
  { value: '66+', label: 'RAG runs' },
  { value: '100+', label: 'cases resolved' },
  { value: '4.0', label: 'Cornell GPA' },
];

const About = ({ isAMGMode }) => {
  const iconBox = isAMGMode
    ? 'border-red-500/25 bg-red-500/10 text-red-300'
    : 'border-purple-400/20 bg-purple-500/10 text-purple-300';

  return (
    <section id="about" className="site-section pt-28 md:pt-32 pb-4 md:pb-6 overflow-hidden">
      <div className="site-container">
        <div className="mb-14 md:mb-16 flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.7 }}
            className="relative shrink-0 mx-auto lg:mx-0 group"
          >
            <div
              className={`absolute -inset-3 blur-2xl opacity-25 group-hover:opacity-35 transition-opacity duration-500 rounded-[2rem] -z-10 ${
                isAMGMode
                  ? 'bg-gradient-to-br from-red-600/50 to-transparent'
                  : 'bg-gradient-to-br from-purple-600/50 to-blue-600/30'
              }`}
            />
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={`${process.env.PUBLIC_URL}/Adamheadshot.webp`}
                alt="Adam Moffat"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="flex-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.28em] text-zinc-500 mb-3"
            >
              Adam Moffat · Dallas, TX
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Cloud · AI ·{' '}
              <span className="text-transparent bg-clip-text accent-gradient">
                Software
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Solutions engineer who ships — Azure pipelines, RAG systems, full-stack
              tools, and field deployments. I debug hard problems, automate the
              reporting around them, and make the results legible to engineering and
              business stakeholders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {targetRoles.map((role) => (
                <span
                  key={role}
                  className={`chip ${isAMGMode ? 'chip-amg' : 'chip-base'} text-[11px]`}
                >
                  {role}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="mt-6 stat-strip justify-center lg:justify-start"
            >
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mb-8">
          <SectionLabel isAMGMode={isAMGMode}>Focus</SectionLabel>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            What I build and deploy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-14 items-start">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <Panel key={area.title} isAMGMode={isAMGMode} delay={index * 0.04}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border mb-4 ${iconBox}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">{area.title}</h3>
                <p className="text-sm text-zinc-400 leading-6">{area.body}</p>
              </Panel>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start mb-14">
          <Panel isAMGMode={isAMGMode} glow className="lg:col-span-3">
            <SectionLabel isAMGMode={isAMGMode}>Now</SectionLabel>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
              Associate Field Application Engineer
            </h3>
            <p className="text-zinc-500 text-sm mb-4">VusionGroup · Coppell, TX</p>
            <div className="space-y-3 text-sm md:text-base text-zinc-300 leading-7">
              <p>
                Technical bridge between North American operations and global R&D.
                Building Azure/KQL reporting pipelines, Python automation for
                executive decks, API integrations, and AI vision pilot support for
                enterprise retail deployments.
              </p>
              <p className="text-zinc-400">
                IoT and BLE field work (ESL, AP migrations, RSSI analysis) supports
                the cloud and software story — not the headline. The through-line is
                telemetry → insight → action.
              </p>
            </div>
          </Panel>

          <Panel isAMGMode={isAMGMode} delay={0.06} className="lg:col-span-2">
            <SectionLabel isAMGMode={isAMGMode}>Education &certs</SectionLabel>
            <div className="space-y-5">
              <div>
                <p className="text-white font-semibold">Cornell University</p>
                <p className="text-sm text-zinc-400 mt-1 leading-6">
                  M.Eng Engineering Management · GPA 4.0
                  <br />
                  Focus: Technical Sales Strategy &amp; Operations
                  <br />
                  <span className="text-zinc-500">Expected Dec 2027</span>
                </p>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-white font-semibold">UT Dallas</p>
                <p className="text-sm text-zinc-400 mt-1">
                  B.S. Computer Science · GPA 3.6
                  <br />
                  <span className="text-zinc-500">Cloud Computing, Network Security, Algorithms</span>
                </p>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                  Microsoft Azure
                </p>
                <p className="text-sm text-zinc-300">AZ-900 certified</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Pursuing AI Engineer (AI-102), Admin (AZ-104), Solutions Architect (AZ-305)
                </p>
              </div>
            </div>
          </Panel>
        </div>

        <Panel isAMGMode={isAMGMode} delay={0.1} className="mb-6">
          <SectionLabel isAMGMode={isAMGMode}>Outside the ticket queue</SectionLabel>
          <p className="text-zinc-300 text-sm md:text-base leading-7">
            Cornell MEM on nights and weekends, side projects like HouseFax (AI
            underwriting copilot), and published RAG evaluation research. Same
            standard everywhere: source-grounded outputs, reproducible pipelines, and
            results you can defend in a room full of engineers.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm border transition-all btn-primary"
            >
              View Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#research"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm border border-white/10 text-zinc-300 hover:border-white/20 hover:text-white transition-all"
            >
              RAG Research
            </motion.a>
          </div>
        </Panel>
      </div>
    </section>
  );
};

export default About;
