import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', delay = 0, isAMGMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
    whileHover={{ scale: 1.015 }}
    className={[
      'rounded-[28px] p-6 md:p-8 backdrop-blur-md shadow-2xl transition-all duration-300',
      isAMGMode
        ? 'bg-black/65 border border-white/10 hover:border-red-500/40'
        : 'bg-white/5 border border-white/10 hover:border-purple-500/30',
      className,
    ].join(' ')}
  >
    {children}
  </motion.div>
);

const SectionEyebrow = ({ children, isAMGMode }) => (
  <div className="flex items-center gap-3 mb-5">
    <span
      className={`h-[2px] w-10 rounded-full ${isAMGMode ? 'bg-red-500' : 'bg-purple-400'
        }`}
    />
    <span className="text-[11px] tracking-[0.28em] uppercase text-zinc-400">
      {children}
    </span>
  </div>
);

const About = ({ isAMGMode }) => {
  const stack = [
    'POC/POV Delivery',
    'Consultative Selling',
    'Azure',
    'Python',
    'KQL',
    'JTAG',
    'REST APIs',
  ];

  return (
    <section
      id="about"
      className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden"
    >
      <div
        className={`absolute top-12 left-[18%] w-72 h-72 rounded-full blur-[130px] -z-10 ${isAMGMode ? 'bg-red-700/10' : 'bg-purple-600/20'
          }`}
      />
      <div
        className={`absolute bottom-10 right-[15%] w-80 h-80 rounded-full blur-[140px] -z-10 ${isAMGMode ? 'bg-white/5' : 'bg-blue-600/10'
          }`}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row items-center md:items-start gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="relative shrink-0 group"
          >
            <div
              className={`absolute inset-0 blur-2xl opacity-30 group-hover:opacity-40 transition-all duration-500 -z-10 rounded-full ${isAMGMode
                ? 'bg-gradient-to-br from-red-600/40 to-transparent'
                : 'bg-gradient-to-br from-purple-600 to-blue-600'
                }`}
            />
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <img
                src={`${process.env.PUBLIC_URL}/Adamheadshot.webp`}
                alt="Adam Moffat"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <div className="text-center md:text-left pt-4">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white"
            >
              Solutions <br />
              <span
                className={
                  isAMGMode
                    ? 'text-zinc-200'
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
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed"
            >
              Associate Field Application Engineer at VusionGroup.
              Cornell M.Eng candidate. Bridging the gap between complex
              technical architecture and enterprise ROI.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            isAMGMode={isAMGMode}
            className="md:col-span-2"
          >
            <div className="flex justify-between items-start gap-4 mb-6">
              <SectionEyebrow isAMGMode={isAMGMode}>
                Current Role
              </SectionEyebrow>

              <span
                className={`px-3 py-1 text-[10px] md:text-xs rounded-full border uppercase tracking-[0.18em] whitespace-nowrap ${isAMGMode
                  ? 'bg-red-500/10 text-red-300 border-red-500/20'
                  : 'bg-green-500/10 text-green-300 border-green-500/20'
                  }`}
              >
                Pre-Sales Pilot Focus
              </span>
            </div>

            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
              Associate Field Application Engineer
            </h3>
            <p className="text-zinc-400 mb-5 uppercase tracking-[0.18em] text-sm">
              VusionGroup
            </p>
            <p className="text-zinc-200 text-sm md:text-base leading-8 max-w-3xl">
              Securing enterprise pilot deployments through complex network
              segregation and technical discovery. Orchestrating Python
              automation pipelines and Azure Kusto dashboards to prove solution
              ROI to executive leadership and accelerate technical sales cycles.
            </p>
          </Card>

          <Card isAMGMode={isAMGMode} delay={0.08}>
            <SectionEyebrow isAMGMode={isAMGMode}>Education</SectionEyebrow>

            <div className="space-y-6">
              <div>
                <p className="text-white font-semibold text-xl">
                  Cornell University
                </p>
                <p className="text-sm text-zinc-400 mt-1 leading-6">
                  M.Eng Engineering Management
                  <br />
                  Focus: Technical Sales
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <p className="text-white font-semibold text-xl">UT Dallas</p>
                <p className="text-sm text-zinc-400 mt-1 leading-6">
                  B.S. Computer Science
                </p>
              </div>
            </div>
          </Card>

          <Card isAMGMode={isAMGMode} delay={0.16}>
            <SectionEyebrow isAMGMode={isAMGMode}>The Stack</SectionEyebrow>

            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-2 rounded-xl text-xs md:text-sm border ${isAMGMode
                    ? 'bg-zinc-950 text-zinc-200 border-white/10'
                    : 'bg-white/5 text-white border-white/10'
                    }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          <Card
            isAMGMode={isAMGMode}
            className="md:col-span-2 relative overflow-hidden"
            delay={0.24}
          >
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-red-500/10 to-transparent pointer-events-none" />
            <SectionEyebrow isAMGMode={isAMGMode}>Beyond the Pitch</SectionEyebrow>

            <p className="text-zinc-200 text-sm md:text-lg leading-8 max-w-3xl relative z-10">
              By day, I am scoping solutions and pursuing my Master&apos;s
              degree. Off the clock, I am an avid traveler, an avid golfer, and
              constantly tweaking my C63s AMG. Whether in academics, travel, or
              automotive tuning, I care about aesthetics, performance, and
              precision execution.
            </p>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold uppercase tracking-[0.16em] border transition-all ${isAMGMode
              ? 'bg-red-500 text-white border-red-400 hover:bg-red-400'
              : 'bg-white text-black border-white hover:bg-zinc-200'
              }`}
          >
            <span className="h-2 w-2 rounded-full bg-current opacity-80" />
            View Full Resume
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;