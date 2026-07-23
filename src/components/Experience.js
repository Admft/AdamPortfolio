import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectorHeader from './ui/SectorHeader';

const stops = [
  {
    stop: '01',
    company: 'VusionGroup',
    title: 'Associate Field Application Engineer',
    boxIn: 'JAN 2026',
    boxOut: 'RUNNING',
    location: 'Coppell, TX',
    live: true,
    summary:
      'Primary technical liaison between North American operations and global R&D. Cloud analytics, Python automation, API integrations, and enterprise pilot execution for Walmart, Kroger, and international rollouts.',
    crewNotes: [
      'Built modular Azure/KQL reporting pipeline — query templating, CLI auth, chart plugins, and automated PowerPoint generation for weekly executive updates',
      'Designed Store Telemetry Heatmaps: joined Azure Log Analytics telemetry with Walmart floor-plan APIs for spatial onboarding and RSSI visualization',
      'Led Mist→Rigado AP migration validation with Ellisys RF analysis, Confluence runbooks, and post-deployment KQL monitoring across 8+ stores',
      'Debugged production blockers via Azure Log Analytics (e.g. isolated "Label type not supported" root cause in wmd2 with cross-workspace KQL)',
      'Kroger CEC demo support: Android regression, BlueDot/Pointr navigation, Jira triage, and 4-hour end-to-end demo validation',
      'Shipped internal tools: TopStock Playwright automation, store aisle navigator, PyInstaller heatmap GUI, and Power BI dashboard prototypes',
    ],
    tyres: ['Azure', 'KQL', 'Python', 'REST APIs', 'Power BI', 'Playwright', 'Android'],
  },
  {
    stop: '02',
    company: 'Causey',
    title: 'Founding Software Engineer',
    boxIn: '2026',
    boxOut: 'RUNNING',
    location: 'Remote · Cornell-born startup',
    live: true,
    summary:
      'Founding engineer building Causey — a platform so students can discover competitions that match their talent, not just the ones their school already knows about. Lead software architecture and core product engineering across the waitlist site and early product preview.',
    crewNotes: [
      'Own end-to-end product engineering: architecture, core features, and shipping the early build students can actually use',
      'Chess competition search is live — indexing US Chess (TLA) and Continental Chess, with state affiliates and FIDE on the roadmap',
      'Discover → match → compete flow: browse by category, deadline, and level; surface eligibility and cost before students commit',
      'Building toward STEM, debate, arts, and writing — same problem, broader talent surface',
    ],
    tyres: ['Next.js', 'TypeScript', 'Product', 'Architecture'],
    image: '/Causey.png',
    links: [
      { href: 'https://causey.dev', label: 'Waitlist' },
      { href: 'https://app.causey.dev/', label: 'Try the app' },
    ],
  },
  {
    stop: '03',
    company: 'ASSET InterTech',
    title: 'Field Application Engineer',
    boxIn: 'JAN 2025',
    boxOut: 'JAN 2026',
    location: 'Dallas, TX · Hybrid',
    summary:
      'Pre- and post-sales technical ownership for aerospace and defense accounts. JTAG boundary-scan, ScanWorks enablement, and complex hardware validation — strong foundation in reading schematics, netlists, and debugging at the pin level.',
    crewNotes: [
      'Managed 100+ support cases with 95% satisfaction; led 4+ end-to-end test projects from SOW to customized JTAG suites',
      'Delivered 5+ week-long onsite trainings for 40–50+ engineers at RTX, GE Aviation, BAE, and Tinker AFB',
      'Published technical articles on flash programming, pin-level diagnostics, and in-house testing ROI',
      'Alpha/beta tested CT mode; diagnosed false-positive loopback failures for Thales/DRT secure boards',
    ],
    tyres: ['JTAG', 'ScanWorks', 'Technical Sales', 'Documentation', 'QA'],
  },
  {
    stop: '04',
    company: 'CaringGuide',
    title: 'Software Engineer Intern',
    boxIn: 'APR 2023',
    boxOut: 'DEC 2023',
    location: 'Richardson, TX · Remote',
    summary:
      'Full-stack product work on a healthcare growth platform — React, Node, PostgreSQL, AWS Elastic Beanstalk, and Python lead-generation automation.',
    crewNotes: [
      'Built React/Node/Tailwind web app with containerized CI/CD on AWS Elastic Beanstalk',
      'Wrote Python scraper processing 1,000+ lead sources per run into PostgreSQL',
    ],
    tyres: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Python'],
  },
];

const Experience = () => (
  <section id="pitwall" className="site-section">
    <div className="site-container">
      <SectorHeader
        sector="04"
        code="Pit stop log — career stints"
        title="Pit Wall"
        sub="Every stint on the timing sheet. Cloud, AI, and software engineering in production — including founding startup work — with IoT field work as the deployment context, not the career center."
      />

      <div className="readable relative border-l-2 border-white/10 pl-6 md:pl-10">
        {stops.map((stop, index) => (
          <motion.article
            key={stop.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.05 }}
            className="relative pb-14 last:pb-0"
          >
            {/* pit-lane node */}
            <span
              className={`absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 md:-left-[47px] ${
                stop.live
                  ? 'border-race-red bg-race-red lamp-on'
                  : 'border-zinc-600 bg-carbon'
              }`}
            />

            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="font-display text-5xl leading-none text-zinc-800 md:text-7xl">
                {stop.stop}
              </span>
              <div>
                <h3 className="font-display text-2xl uppercase leading-tight text-white md:text-3xl">
                  {stop.company}
                </h3>
                <p className="mt-0.5 text-sm text-zinc-400">
                  {stop.title} · {stop.location}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-3 font-tele text-[10px] uppercase tracking-[0.2em]">
                <span className="border border-caution/50 bg-caution/10 px-2.5 py-1 text-caution">
                  Box in · {stop.boxIn}
                </span>
                <span
                  className={`border px-2.5 py-1 ${
                    stop.live
                      ? 'border-race-red/60 bg-race-red/10 text-race-red'
                      : 'border-white/15 bg-black/40 text-zinc-400'
                  }`}
                >
                  {stop.live ? '● ' : ''}
                  {stop.boxOut}
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
              {stop.summary}
            </p>

            {stop.image && (
              <img
                src={stop.image}
                alt={`${stop.company} product`}
                loading="lazy"
                className="mt-5 w-full max-w-3xl border border-white/10 object-cover object-top"
              />
            )}

            <p className="mt-5 font-tele text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Crew notes
            </p>
            <ul className="mt-2 max-w-3xl space-y-2">
              {stop.crewNotes.map((note) => (
                <li
                  key={note.slice(0, 40)}
                  className="relative pl-5 text-sm leading-6 text-zinc-300 before:absolute before:left-0 before:top-[0.55rem] before:h-[2px] before:w-2.5 before:bg-data-blue"
                >
                  {note}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="font-tele text-[9px] uppercase tracking-[0.28em] text-zinc-500">
                Tyres fitted
              </span>
              {stop.tyres.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/12 bg-black/50 px-2 py-0.5 font-tele text-[10px] text-data-blue"
                >
                  {tag}
                </span>
              ))}
              {stop.links?.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center gap-1.5 border border-race-red/50 bg-race-red/10 px-2.5 py-0.5 font-tele text-[10px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-race-red/25"
                >
                  {item.label}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {/* pit wall note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="readable mt-12 border-l-2 border-caution bg-caution/5 py-4 pl-6 pr-4"
      >
        <p className="font-tele text-[10px] uppercase tracking-[0.28em] text-caution">
          Pit wall note — IoT &amp; field context
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
          BLE/RSSI analysis, ESL hardware investigations, power profiler root-cause
          work, and onsite retail deployments give me credibility in the room — but the
          systems I care most about building are cloud pipelines, AI workflows, and
          software that scales beyond a single store visit.
        </p>
      </motion.div>
    </div>
  </section>
);

export default Experience;
