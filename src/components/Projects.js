import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectorHeader from './ui/SectorHeader';

const housefax = {
  title: 'HouseFax',
  entryClass: 'Flagship',
  lap: '2026 — ACTIVE',
  blurb: 'Know the house before you buy it.',
  description:
    'An end-to-end response to a high-stakes user problem: residential buyers need a defensible view of risk, not another generic chatbot. HouseFax combines a Next.js/TypeScript product, Dockerized FastAPI services on AWS, property-data integrations, deterministic financial tools, and grounded AI into a source-cited due-diligence workflow.',
  highlights: [
    'Agentic tool-calling for cap rates, cash flow, and mortgage math — the model never freelances the numbers',
    'LlamaIndex multi-document RAG for HOA and inspection disclosure synthesis into a structured verdict',
    'GitHub Actions eval harness blocking deploys on math errors, hallucinations, and fair-housing violations',
    'Integrates RentCast, ATTOM, Census, FRED, and FEMA for source-cited residential due diligence',
  ],
  tyres: ['FastAPI', 'Next.js', 'pgvector', 'LlamaIndex', 'AWS', 'Eval Harness'],
  image: '/HouseFax.png',
};

const entries = [
  {
    title: 'Cornell MEM Schedule Planner',
    entryClass: 'Product',
    lap: '2025 — LIVE',
    description:
      'Started with a direct user pain point: MEM students were building schedules manually in spreadsheets. I turned the catalog and program constraints into a conflict-aware planner, shipped it during Cornell’s residential intensive, and kept it live for the cohort.',
    highlights: [
      'Hackathon winner — shipped during the residential intensive',
      'TypeScript + Vite frontend with ExcelJS export for advisors and students',
      'Constraint-aware scheduling across required and elective tracks',
    ],
    tyres: ['React', 'TypeScript', 'Vite', 'ExcelJS'],
    link: 'https://www.cornellmemscheduleplanner.com/',
    image: '/CornellSchedulePlanner.png',
  },
  {
    title: 'Store Telemetry Heatmaps',
    entryClass: 'Enterprise',
    lap: '2026 — LIVE',
    description:
      'Built after field and HQ teams needed a shared way to diagnose store-level deployment health. The tool joins Azure telemetry to Walmart floor plans so onboarding failures, RSSI, and weak-signal zones become an actionable spatial view instead of raw KQL.',
    highlights: [
      'Spatial overlay of ping health and onboarding failures on store layouts',
      'KQL + Pandas pipeline from Azure into heatmap-ready datasets',
      'Used during onsite pilot monitoring at Walmart HQ in Bentonville',
    ],
    tyres: ['Python', 'KQL', 'Azure', 'Pandas'],
    image: '/HeatMap.png',
  },
  {
    title: 'Executive Reporting Pipeline',
    entryClass: 'Enterprise',
    lap: '2026 — LIVE',
    description:
      'Replaced a recurring manual reporting workflow with a deployable pipeline: KQL templates pull live Azure metrics, Python transforms the data, and editable charts land in finished PowerPoint decks for weekly operational decisions.',
    highlights: [
      'End-to-end: query → CSV → charts → finished PowerPoint',
      'Covers device health, battery, onboardings, and ping KPIs',
      'Charts stay editable in the deck for leadership follow-ups',
    ],
    tyres: ['Python', 'KQL', 'OpenPyXL', 'PowerPoint'],
    image: '/ReportingPipeline.png',
  },
  {
    title: 'FinTeach',
    entryClass: 'Hackathon',
    lap: '2024',
    description:
      'Built around a specific underserved user: Texas teachers navigating financial planning. The HackUNT 2024 project combined Plaid-connected context with OpenAI-assisted guidance in a React and Flask product, earning hackathon recognition.',
    highlights: [
      'Recognized at HackUNT 2024',
      'React frontend with Flask API and OpenAI-assisted planning flows',
      'Plaid integration for real account balances and cash-flow context',
    ],
    tyres: ['React', 'Flask', 'OpenAI', 'Plaid'],
    link: 'https://devpost.com/software/hackunt2024',
    image: '/finteach2.jpg',
  },
  {
    title: 'SkinByKaylaa',
    entryClass: 'Client',
    lap: '2024 — LIVE',
    description:
      'A client deployment, not a template exercise: translated a local esthetician’s acquisition workflow into SEO-focused service pages and online booking so search traffic could convert directly into appointments.',
    highlights: [
      'Local SEO structure for Rockwall beauty search',
      'Online booking wired into the service catalog',
      'React SPA deployed on Vercel',
    ],
    tyres: ['React', 'SEO', 'Booking'],
    link: 'https://www.skinbykaylaa.vercel.app/',
    image: '/SkinByKaylaa.png',
  },
];

const TagRow = ({ tags }) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map((tag) => (
      <span
        key={tag}
        className="border border-white/10 bg-black/40 px-2 py-0.5 font-tele text-[10px] text-zinc-400"
      >
        {tag}
      </span>
    ))}
  </div>
);

const StatusLink = ({ entry }) => {
  const links = entry.links?.length
    ? entry.links
    : entry.link
      ? [{ href: entry.link, label: 'View project' }]
      : null;

  if (!links) {
    return (
      <span className="font-tele text-[10px] uppercase tracking-[0.14em] text-zinc-500">
        Enterprise — internal
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
      {links.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-tele text-[11px] uppercase tracking-[0.14em] text-race-red transition-colors hover:text-white"
        >
          {item.label} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
};

const Projects = () => (
  <section id="projects" className="site-section">
    <div className="site-container">
      <SectorHeader
        label="Projects"
        title="Selected work"
        sub="Proof of the operating model: start with a real user or deployment constraint, build the missing system, and ship an outcome people can use."
      />

      {/* HouseFax — main highlight */}
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="readable overflow-hidden border border-caution/35 bg-black/70 backdrop-blur-sm"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/12 px-5 py-3 md:px-8">
          <p className="font-tele text-[10px] uppercase tracking-[0.28em] text-caution">
            Featured project
          </p>
          <p className="ml-auto font-tele text-[10px] uppercase tracking-[0.24em] text-data-blue">
            {housefax.lap}
          </p>
        </div>

        <div className="border-b border-white/10 bg-black">
          <img
            src={housefax.image}
            alt="HouseFax product screenshot"
            loading="lazy"
            className="block w-full h-auto"
          />
        </div>
        <div className="px-5 py-6 md:px-8 md:py-8">
          <p className="font-tele text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            {housefax.entryClass}
          </p>
          <h3 className="mt-2 font-display text-3xl uppercase leading-tight text-white md:text-4xl">
            {housefax.title}
          </h3>
          <p className="mt-2 font-tele text-xs uppercase tracking-[0.16em] text-data-blue">
            {housefax.blurb}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300">{housefax.description}</p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
            {housefax.highlights.map((h) => (
              <li
                key={h.slice(0, 40)}
                className="relative pl-5 text-sm leading-6 text-zinc-300 before:absolute before:left-0 before:top-[0.55rem] before:h-[2px] before:w-2.5 before:bg-caution"
              >
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-white/10 pt-5">
            <TagRow tags={housefax.tyres} />
          </div>
        </div>
      </motion.article>

      {/* Remaining entries — article cards */}
      <div className="readable mt-10 space-y-8 md:mt-12">
        {entries.map((entry, index) => (
          <motion.article
            key={entry.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.04 }}
            className="overflow-hidden border border-white/12 bg-black/70 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,280px)_1fr] lg:grid-cols-[minmax(0,340px)_1fr]">
              <div className="relative min-h-[180px] border-b border-white/10 md:min-h-full md:border-b-0 md:border-r">
                <img
                  src={entry.image}
                  alt={`${entry.title} screenshot`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
              <div className="px-5 py-5 md:px-7 md:py-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p className="font-tele text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                    {entry.entryClass}
                  </p>
                  <p className="font-tele text-[11px] text-data-blue">{entry.lap}</p>
                </div>
                <h3 className="mt-2 font-display text-2xl uppercase leading-tight text-white md:text-3xl">
                  {entry.title}
                </h3>
                {entry.role && (
                  <p className="mt-1 font-tele text-[11px] uppercase tracking-[0.14em] text-data-blue">
                    {entry.role}
                  </p>
                )}
                <p className="mt-3 text-sm leading-7 text-zinc-300">{entry.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {entry.highlights.map((h) => (
                    <li key={h.slice(0, 35)} className="text-xs leading-5 text-zinc-400">
                      — {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                  <TagRow tags={entry.tyres} />
                  <div className="ml-auto">
                    <StatusLink entry={entry} />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
