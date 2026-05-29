import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Presentation,
  Bug,
  LineChart,
} from 'lucide-react';
import Panel from './ui/Panel';
import SectionLabel from './ui/SectionLabel';

const capabilities = [
  {
    icon: Search,
    title: 'Pre-Sales Discovery',
    body: 'Technical discovery, stakeholder interviews, solution fit analysis, and pilot readiness across retail IoT and enterprise environments.',
  },
  {
    icon: Presentation,
    title: 'Demos & Pilot Support',
    body: 'Demo readiness, Android regression testing, BLE validation, hardware setup, and field execution for CEC and rollout work.',
  },
  {
    icon: Bug,
    title: 'Root Cause Analysis',
    body: 'Azure Log Analytics, KQL trace analysis, AP/RSSI performance, API debugging, and source-level isolation beneath the UI.',
  },
  {
    icon: LineChart,
    title: 'ROI Reporting',
    body: 'Python and KQL pipelines, executive PowerPoint automation, RSSI heatmaps, and telemetry reporting for sales and product teams.',
  },
];

const stackGroups = [
  {
    label: 'Sales Engineering',
    items: [
      'POC / POV Delivery',
      'Solution Demos',
      'Technical Enablement',
      'ROI Storytelling',
      'Executive Reporting',
    ],
  },
  {
    label: 'Cloud & Automation',
    items: ['Azure', 'KQL', 'Python', 'Power BI', 'REST APIs', 'Postman'],
  },
  {
    label: 'IoT & Field',
    items: ['BLE / RF', 'ESL', 'RSSI Analysis', 'JTAG', 'Network Segregation'],
  },
  {
    label: 'Software',
    items: ['React', 'Node.js', 'Java', 'SQL', 'AWS', 'Android Studio'],
  },
];

const metrics = [
  { value: 'Enterprise', label: 'pilots' },
  { value: '100+', label: 'cases' },
  { value: '50+', label: 'engineers' },
  { value: 'AZ-900', label: 'certified' },
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
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
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
              Adam Moffat
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              Solutions{' '}
              <span className="text-transparent bg-clip-text accent-gradient">
                Engineering
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-base md:text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Pre-sales at VusionGroup. Cornell M.Eng. I debug the hard problems
              and translate them into something sales and customers can act on.
            </motion.p>

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start mb-14">
          <Panel isAMGMode={isAMGMode} glow className="lg:col-span-3">
            <div className="flex flex-wrap justify-between items-start gap-3 mb-5">
              <SectionLabel isAMGMode={isAMGMode} className="mb-0">
                Current Role
              </SectionLabel>
              <span className={`chip ${isAMGMode ? 'chip-amg' : 'chip-base'} uppercase tracking-[0.14em] text-[10px]`}>
                Pilot Execution
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
              Associate Field Application Engineer
            </h3>
            <p className="text-zinc-500 text-sm mb-4">VusionGroup</p>
            <div className="space-y-3 text-sm md:text-base text-zinc-300 leading-7">
              <p>
                Retail IoT pilots across ESL, BLE, Features, and connected-store
                deployments. Onsite work, RF validation, Azure Log Analytics, KQL
                dashboards, and Python reporting for executive stakeholders.
              </p>
              <p className="text-zinc-400">
                Supporting Walmart, Kroger, Best Buy, Mexico, and Canada rollouts
                by validating performance, clearing blockers, and tying pilots to
                operational outcomes.
              </p>
            </div>
          </Panel>

          <Panel isAMGMode={isAMGMode} delay={0.06} className="lg:col-span-2">
            <SectionLabel isAMGMode={isAMGMode}>Education</SectionLabel>

            <div className="space-y-5">
              <div>
                <p className="text-white font-semibold">Cornell University</p>
                <p className="text-sm text-zinc-400 mt-1 leading-6">
                  M.Eng Engineering Management, GPA 4.0
                  <br />
                  Focus: Technical Sales Strategy
                  <br />
                  <span className="text-zinc-500">Expected Dec 2027</span>
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <p className="text-white font-semibold">UT Dallas</p>
                <p className="text-sm text-zinc-400 mt-1">B.S. Computer Science, GPA 3.6</p>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                  Certifications
                </p>
                <p className="text-sm text-zinc-300">Microsoft Azure AZ-900</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Pursuing Azure Admin, AI Engineer, Solutions Architect
                </p>
              </div>
            </div>
          </Panel>
        </div>

        <div className="mb-8">
          <SectionLabel isAMGMode={isAMGMode}>Capabilities</SectionLabel>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            What I do in the field
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-14 items-start">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <Panel key={cap.title} isAMGMode={isAMGMode} delay={index * 0.04}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border mb-4 ${iconBox}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-zinc-400 leading-6">{cap.body}</p>
              </Panel>
            );
          })}
        </div>

        <Panel isAMGMode={isAMGMode} delay={0.08} className="mb-14">
          <SectionLabel isAMGMode={isAMGMode}>Experience</SectionLabel>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <h3 className="font-display text-lg font-bold text-white mb-3">VusionGroup</h3>
              <ul className="space-y-2.5 text-sm text-zinc-300 leading-6">
                <li>Walmart ESL/BLE pilot support, AP migration, Rigado/Mist traffic segregation</li>
                <li>Kroger CEC demos: Android regression, BlueDot/Pointr, Retail Media</li>
                <li>Store telemetry heatmaps mapped to physical floor plans</li>
              </ul>
            </div>
            <div className="md:border-l md:border-white/10 md:pl-10">
              <h3 className="font-display text-lg font-bold text-white mb-3">ASSET InterTech</h3>
              <ul className="space-y-2.5 text-sm text-zinc-300 leading-6">
                <li>Pre and post-sales for RTX, GE Aviation, BAE, Tinker AFB, Thales/DRT</li>
                <li>Onsite JTAG Boundary-Scan trainings and ScanWorks enablement</li>
                <li>ROI guides, flash programming docs, interconnect validation content</li>
              </ul>
            </div>
          </div>
        </Panel>

        <Panel isAMGMode={isAMGMode} delay={0.1} className="mb-5">
          <SectionLabel isAMGMode={isAMGMode}>The Stack</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {stackGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-2.5">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1.5 rounded-lg text-xs border bg-black/30 text-zinc-300 border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel isAMGMode={isAMGMode} delay={0.14} className="mb-6">
          <SectionLabel isAMGMode={isAMGMode}>Beyond the Pitch</SectionLabel>
          <p className="text-zinc-300 text-sm md:text-base leading-7">
            When I am not in a pilot or building a report, I am working through my
            Cornell M.Eng, shipping side projects, traveling, golfing, or wrenching
            on my C63s. Same standard everywhere: clean execution and results you
            can measure.
          </p>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 mt-5 px-6 py-3 rounded-full font-semibold text-sm border transition-all btn-primary"
          >
            View Resume
          </motion.a>
        </Panel>
      </div>
    </section>
  );
};

export default About;
