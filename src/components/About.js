import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Presentation,
  Bug,
  LineChart,
  ArrowUpRight,
} from 'lucide-react';

const Card = ({ children, className = '', delay = 0, isAMGMode, glow = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
    whileHover={{ scale: 1.012 }}
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

const SectionEyebrow = ({ children, isAMGMode, index }) => (
  <div className="flex items-center gap-3 mb-5">
    {index && (
      <span
        className={`font-mono text-[10px] tracking-[0.2em] ${
          isAMGMode ? 'text-red-500/80' : 'text-purple-400/80'
        }`}
      >
        {index}
      </span>
    )}
    <span
      className={`h-[2px] w-10 rounded-full ${
        isAMGMode ? 'bg-red-500' : 'bg-purple-400'
      }`}
    />
    <span className="text-[11px] tracking-[0.28em] uppercase text-zinc-400">
      {children}
    </span>
  </div>
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
    body: 'Customer demo readiness, Android regression testing, BLE validation, hardware setup, and field execution for CEC and rollout initiatives.',
  },
  {
    icon: Bug,
    title: 'Root Cause Analysis',
    body: 'Azure Log Analytics, KQL trace analysis, AP/RSSI performance, API debugging, and source-level isolation beneath the UI.',
  },
  {
    icon: LineChart,
    title: 'ROI Reporting',
    body: 'Python/KQL pipelines, executive PowerPoint automation, RSSI heatmaps, and telemetry storytelling for sales and product stakeholders.',
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
  { value: 'Enterprise', label: 'Pilot Programs', detail: 'Walmart · Kroger · Best Buy' },
  { value: '100+', label: 'Technical Cases', detail: 'Aerospace · Defense · Medical' },
  { value: '50+', label: 'Engineers Enabled', detail: 'Trainings & onsite support' },
  { value: 'AZ-900', label: 'Certified', detail: 'Azure fundamentals' },
];

const About = ({ isAMGMode }) => {
  return (
    <section
      id="about"
      className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />
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
        <div className="mb-14 flex flex-col md:flex-row items-center md:items-start gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="relative shrink-0 group"
          >
            <div
              className={`absolute inset-0 blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500 -z-10 rounded-full ${
                isAMGMode
                  ? 'bg-gradient-to-br from-red-600/50 to-transparent'
                  : 'bg-gradient-to-br from-purple-600 to-blue-600'
              }`}
            />
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 ring-1 ring-white/10">
              <img
                src={`${process.env.PUBLIC_URL}/Adamheadshot.webp`}
                alt="Adam Moffat"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <div className="text-center md:text-left pt-4 flex-1">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] tracking-[0.32em] uppercase text-zinc-500 mb-4"
            >
              Adam Moffat · Pre-Sales & Solutions Engineering
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl font-bold mb-5 tracking-tight text-white leading-[1.05]"
            >
              Technical enough to{' '}
              <span
                className={
                  isAMGMode
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-red-500 to-red-300'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500'
                }
              >
                debug the system.
              </span>
              <br />
              Commercial enough to{' '}
              <span className="text-zinc-300">sell the outcome.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed"
            >
              Associate Field Application Engineer at VusionGroup. Cornell M.Eng
              candidate. I turn field telemetry, pilot validation, and technical
              discovery into enterprise buying confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] border transition-all ${
                  isAMGMode
                    ? 'bg-red-500/15 text-red-200 border-red-500/30 hover:bg-red-500/25'
                    : 'bg-purple-500/15 text-purple-200 border-purple-500/30 hover:bg-purple-500/25'
                }`}
              >
                Selected Works
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] border border-white/10 text-zinc-300 hover:border-white/25 hover:text-white transition-all"
              >
                Contact
              </a>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-14">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={`metric-pill rounded-2xl border p-4 md:p-5 ${
                isAMGMode
                  ? 'border-white/10 bg-black/40'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <p
                className={`font-display text-2xl md:text-3xl font-bold ${
                  isAMGMode ? 'text-red-400' : 'text-purple-300'
                }`}
              >
                {metric.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                {metric.label}
              </p>
              <p className="mt-2 text-xs text-zinc-500 leading-5">{metric.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card isAMGMode={isAMGMode} className="md:col-span-2" glow>
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <SectionEyebrow isAMGMode={isAMGMode} index="01">
                Current Role
              </SectionEyebrow>
              <span
                className={`px-3 py-1 text-[10px] md:text-xs rounded-full border uppercase tracking-[0.18em] whitespace-nowrap ${
                  isAMGMode
                    ? 'bg-red-500/10 text-red-300 border-red-500/20'
                    : 'bg-green-500/10 text-green-300 border-green-500/20'
                }`}
              >
                Enterprise Pilot Execution
              </span>
            </div>

            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
              Associate Field Application Engineer
            </h3>
            <p className="text-zinc-400 mb-5 uppercase tracking-[0.18em] text-sm">
              VusionGroup
            </p>
            <p className="text-zinc-200 text-sm md:text-base leading-8 max-w-3xl">
              Supporting retail IoT pilots across ESL, BLE, Features, and
              connected-store environments — from onsite deployment and RF
              validation to Azure Log Analytics investigations, KQL dashboarding,
              and Python reporting automation for executive stakeholders.
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-8 max-w-3xl mt-4">
              Contributing to Walmart, Kroger, Best Buy, Mexico, and Canada
              initiatives by validating solution performance, isolating technical
              blockers, and positioning pilots around measurable operational
              value.
            </p>
          </Card>

          <Card isAMGMode={isAMGMode} delay={0.08}>
            <SectionEyebrow isAMGMode={isAMGMode} index="02">
              Education
            </SectionEyebrow>

            <div className="space-y-6">
              <div>
                <p className="text-white font-semibold text-xl">Cornell University</p>
                <p className="text-sm text-zinc-400 mt-1 leading-6">
                  M.Eng Engineering Management
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
                  B.S. Computer Science · GPA 3.6
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

        <div className="mt-14 mb-6">
          <SectionEyebrow isAMGMode={isAMGMode} index="03">
            What I Do Best
          </SectionEyebrow>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            From discovery to executive ROI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <Card key={cap.title} isAMGMode={isAMGMode} delay={index * 0.06}>
                <div className="flex gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          <Card isAMGMode={isAMGMode} delay={0.1}>
            <SectionEyebrow isAMGMode={isAMGMode} index="04">
              Experience · VusionGroup
            </SectionEyebrow>
            <ul className="space-y-3 text-sm text-zinc-300 leading-7">
              <li className="flex gap-2">
                <span className={isAMGMode ? 'text-red-500' : 'text-purple-400'}>▸</span>
                Walmart ESL/BLE pilot support, AP migration, and Rigado/Mist traffic segregation
              </li>
              <li className="flex gap-2">
                <span className={isAMGMode ? 'text-red-500' : 'text-purple-400'}>▸</span>
                Kroger CEC demo readiness — Android regression, BlueDot/Pointr, Retail Media
              </li>
              <li className="flex gap-2">
                <span className={isAMGMode ? 'text-red-500' : 'text-purple-400'}>▸</span>
                Store telemetry heatmaps linking Azure backend data to physical floor plans
              </li>
            </ul>
          </Card>

          <Card isAMGMode={isAMGMode} delay={0.16}>
            <SectionEyebrow isAMGMode={isAMGMode} index="05">
              Experience · ASSET InterTech
            </SectionEyebrow>
            <ul className="space-y-3 text-sm text-zinc-300 leading-7">
              <li className="flex gap-2">
                <span className={isAMGMode ? 'text-red-500' : 'text-purple-400'}>▸</span>
                Pre/post-sales for RTX, GE Aviation, BAE, Tinker AFB, and Thales/DRT
              </li>
              <li className="flex gap-2">
                <span className={isAMGMode ? 'text-red-500' : 'text-purple-400'}>▸</span>
                Advanced onsite JTAG Boundary-Scan trainings and ScanWorks enablement
              </li>
              <li className="flex gap-2">
                <span className={isAMGMode ? 'text-red-500' : 'text-purple-400'}>▸</span>
                Technical content: ROI guides, flash programming docs, interconnect validation
              </li>
            </ul>
          </Card>
        </div>

        <Card isAMGMode={isAMGMode} delay={0.12} className="mb-6">
          <SectionEyebrow isAMGMode={isAMGMode} index="06">
            The Stack
          </SectionEyebrow>
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

        <Card
          isAMGMode={isAMGMode}
          className="relative overflow-hidden"
          delay={0.2}
        >
          <div
            className={`absolute inset-y-0 right-0 w-1/2 pointer-events-none ${
              isAMGMode
                ? 'bg-gradient-to-l from-red-500/10 to-transparent'
                : 'bg-gradient-to-l from-purple-500/10 to-transparent'
            }`}
          />
          <SectionEyebrow isAMGMode={isAMGMode} index="07">
            Beyond the Demo
          </SectionEyebrow>
          <p className="text-zinc-200 text-sm md:text-lg leading-8 max-w-3xl relative z-10">
            By day: enterprise pilots, retail IoT deployments, technical reporting,
            and customer-facing validation. Off the clock: Cornell M.Eng coursework,
            side projects, travel, golf, and fine-tuning my C63s AMG. I care about
            systems that perform, look clean, and create measurable impact.
          </p>
        </Card>

        <div className="mt-12 text-center">
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
            View Solutions Engineering Resume
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;
