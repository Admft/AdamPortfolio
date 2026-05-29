import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Presentation,
  Bug,
  LineChart,
} from 'lucide-react';
import SectionLabel from './ui/SectionLabel';

const Card = ({ children, className = '', delay = 0, isAMGMode, glow = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
    whileHover={{ scale: 1.015 }}
    className={[
      'rounded-[28px] p-6 md:p-8 backdrop-blur-md shadow-2xl transition-all duration-300',
      glow ? 'glow-card' : '',
      isAMGMode
        ? 'bg-black/65 border border-white/10 hover:border-red-500/40'
        : 'bg-white/5 border border-white/10 hover:border-purple-500/30',
      className,
    ].join(' ')}
  >
    {children}
  </motion.div>
);

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
  return (
    <section id="about" className="pt-28 pb-16 px-6 relative overflow-hidden">
      <div
        className={`absolute top-12 left-[18%] w-72 h-72 rounded-full blur-[130px] -z-10 ${
          isAMGMode ? 'bg-red-700/10' : 'bg-purple-600/20'
        }`}
      />
      <div
        className={`absolute bottom-10 right-[15%] w-80 h-80 rounded-full blur-[140px] -z-10 ${
          isAMGMode ? 'bg-white/5' : 'bg-blue-600/10'
        }`}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="relative shrink-0 group"
          >
            <div
              className={`absolute inset-0 blur-2xl opacity-30 group-hover:opacity-40 transition-all duration-500 -z-10 rounded-full ${
                isAMGMode
                  ? 'bg-gradient-to-br from-red-600/40 to-transparent'
                  : 'bg-gradient-to-br from-purple-600 to-blue-600'
              }`}
            />
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <img
                src={`${process.env.PUBLIC_URL}/Adamheadshot.webp`}
                alt="Adam Moffat"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <div className="text-center md:text-left pt-2 flex-1">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white"
            >
              Solutions{' '}
              <span
                className={
                  isAMGMode
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 via-red-500 to-red-300'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500'
                }
              >
                Engineering.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-zinc-300 max-w-xl leading-relaxed"
            >
              Pre-sales at VusionGroup. Cornell M.Eng. I debug the hard problems
              and translate them into something sales and customers can act on.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start"
            >
              {metrics.map((metric) => (
                <span
                  key={metric.label}
                  className={`px-3 py-1.5 rounded-full text-xs border ${
                    isAMGMode
                      ? 'bg-red-500/10 text-red-200 border-red-500/20'
                      : 'bg-purple-500/10 text-purple-200 border-purple-500/20'
                  }`}
                >
                  <span className="font-semibold">{metric.value}</span>{' '}
                  <span className="text-zinc-400">{metric.label}</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card isAMGMode={isAMGMode} className="md:col-span-2" glow>
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <SectionLabel isAMGMode={isAMGMode}>Current Role</SectionLabel>
              <span
                className={`px-3 py-1 text-[10px] md:text-xs rounded-full border uppercase tracking-[0.18em] whitespace-nowrap ${
                  isAMGMode
                    ? 'bg-red-500/10 text-red-300 border-red-500/20'
                    : 'bg-green-500/10 text-green-300 border-green-500/20'
                }`}
              >
                Pilot Execution
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Associate Field Application Engineer
            </h3>
            <p className="text-zinc-400 mb-5 uppercase tracking-[0.18em] text-sm">
              VusionGroup
            </p>
            <p className="text-zinc-200 text-sm md:text-base leading-8 max-w-3xl">
              Retail IoT pilots across ESL, BLE, Features, and connected-store
              deployments. Onsite work, RF validation, Azure Log Analytics, KQL
              dashboards, and Python reporting for executive stakeholders.
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-8 max-w-3xl mt-4">
              Supporting Walmart, Kroger, Best Buy, Mexico, and Canada rollouts
              by validating performance, clearing blockers, and tying pilots to
              operational outcomes.
            </p>
          </Card>

          <Card isAMGMode={isAMGMode} delay={0.08}>
            <SectionLabel isAMGMode={isAMGMode}>Education</SectionLabel>

            <div className="space-y-6">
              <div>
                <p className="text-white font-semibold text-xl">Cornell University</p>
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
                <p className="text-white font-semibold text-xl">UT Dallas</p>
                <p className="text-sm text-zinc-400 mt-1 leading-6">
                  B.S. Computer Science, GPA 3.6
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                  Certifications
                </p>
                <p className="text-sm text-zinc-300">Microsoft Azure AZ-900</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Pursuing Azure Admin, AI Engineer, Solutions Architect
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 mb-6">
          <SectionLabel isAMGMode={isAMGMode}>Capabilities</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            What I do in the field
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <Card key={cap.title} isAMGMode={isAMGMode} delay={index * 0.06}>
                <div className="flex gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${
                      isAMGMode
                        ? 'border-red-500/25 bg-red-500/10 text-red-300'
                        : 'border-purple-400/20 bg-purple-500/10 text-purple-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
                    <p className="text-sm text-zinc-400 leading-7">{cap.body}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card isAMGMode={isAMGMode} delay={0.1}>
            <SectionLabel isAMGMode={isAMGMode}>VusionGroup</SectionLabel>
            <ul className="space-y-3 text-sm text-zinc-300 leading-7">
              <li>Walmart ESL/BLE pilot support, AP migration, Rigado/Mist traffic segregation</li>
              <li>Kroger CEC demos: Android regression, BlueDot/Pointr, Retail Media</li>
              <li>Store telemetry heatmaps mapped to physical floor plans</li>
            </ul>
          </Card>

          <Card isAMGMode={isAMGMode} delay={0.16}>
            <SectionLabel isAMGMode={isAMGMode}>ASSET InterTech</SectionLabel>
            <ul className="space-y-3 text-sm text-zinc-300 leading-7">
              <li>Pre and post-sales for RTX, GE Aviation, BAE, Tinker AFB, Thales/DRT</li>
              <li>Onsite JTAG Boundary-Scan trainings and ScanWorks enablement</li>
              <li>ROI guides, flash programming docs, interconnect validation content</li>
            </ul>
          </Card>
        </div>

        <Card isAMGMode={isAMGMode} delay={0.12} className="mb-6">
          <SectionLabel isAMGMode={isAMGMode}>The Stack</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stackGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500 mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`px-3 py-2 rounded-xl text-xs md:text-sm border ${
                        isAMGMode
                          ? 'bg-zinc-950 text-zinc-200 border-white/10'
                          : 'bg-white/5 text-white border-white/10'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card isAMGMode={isAMGMode} className="relative overflow-hidden" delay={0.2}>
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-red-500/10 to-transparent pointer-events-none" />
          <SectionLabel isAMGMode={isAMGMode}>Beyond the Pitch</SectionLabel>
          <p className="text-zinc-200 text-sm md:text-lg leading-8 max-w-3xl relative z-10">
            When I am not in a pilot or building a report, I am working through my
            Cornell M.Eng, shipping side projects, traveling, golfing, or wrenching
            on my C63s. Same standard everywhere: clean execution and results you
            can measure.
          </p>
        </Card>

        <div className="mt-12 text-center md:text-left">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold uppercase tracking-[0.16em] border transition-all ${
              isAMGMode
                ? 'bg-red-500 text-white border-red-400 hover:bg-red-400'
                : 'bg-white text-black border-white hover:bg-zinc-200'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current opacity-80" />
            View Resume
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;
