import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectorHeader from './ui/SectorHeader';

const stops = [
  {
    stop: '01',
    company: 'VusionGroup',
    title: 'Associate Field Application Engineer',
    boxIn: 'Jan 2026',
    boxOut: 'Present',
    location: 'Coppell, TX',
    live: true,
    summary:
      'Embedded between North American operations, enterprise customers, and global R&D. I investigate deployment blockers, build the analytics and automation the field needs, validate fixes onsite, and turn production evidence into clear product feedback.',
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
    boxOut: 'Present',
    location: 'Remote · Cornell-born startup',
    live: true,
    summary:
      'Founding engineer building Causey directly alongside the founding team and early users. I own software architecture and core product delivery across the public site and competition-discovery app, turning an underserved user journey into shipped product.',
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
    boxIn: 'Jan 2025',
    boxOut: 'Jan 2026',
    location: 'Dallas, TX · Hybrid',
    summary:
      'Owned pre- and post-sales technical outcomes for aerospace and defense customers. Scoped problems, reproduced failures, built customized JTAG test solutions, trained engineers onsite, and stayed accountable through validation and handoff.',
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
    boxIn: 'Apr 2023',
    boxOut: 'Dec 2023',
    location: 'Richardson, TX · Remote',
    summary:
      'Delivered full-stack product work for a healthcare growth platform, moving between user-facing React features, Node/PostgreSQL services, AWS deployment, and Python data automation.',
    crewNotes: [
      'Built React/Node/Tailwind web app with containerized CI/CD on AWS Elastic Beanstalk',
      'Wrote Python scraper processing 1,000+ lead sources per run into PostgreSQL',
    ],
    tyres: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Python'],
  },
];

const Experience = () => (
  <section id="experience" className="site-section">
    <div className="site-container">
      <SectorHeader
        label="Experience"
        title="Work history"
        sub="A track record of owning outcomes at the customer–engineering boundary: scope the problem, build what is missing, deploy it, and stay through validation."
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
                <span className="border border-white/15 bg-black/40 px-2.5 py-1 text-zinc-300">
                  {stop.boxIn}
                  {stop.boxOut ? ` — ${stop.boxOut}` : ''}
                </span>
                {stop.live && (
                  <span className="border border-race-red/60 bg-race-red/10 px-2.5 py-1 text-race-red">
                    Current
                  </span>
                )}
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
              Highlights
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
                Stack
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
          Why this fits Forward Deployed
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
          I am strongest when the requirements are incomplete, the problem is already
          live, and solving it requires both engineering depth and customer context.
          Field debugging gives me the evidence; software, data, and AI systems turn
          that evidence into a durable solution.
        </p>
      </motion.div>
    </div>
  </section>
);

export default Experience;
