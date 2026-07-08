import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectorHeader from './ui/SectorHeader';

const entries = [
  {
    pos: 1,
    title: 'Cornell MEM Schedule Planner',
    entryClass: 'Product',
    lap: '2025 — LIVE',
    bestSector: 'Won the Cornell M.Eng residential hackathon; now saving MEM students from spreadsheet hell every semester',
    tyres: ['React', 'TypeScript', 'Vite', 'ExcelJS'],
    link: 'https://www.cornellmemscheduleplanner.com/',
    image: '/CornellSchedulePlanner.png',
    fastestLap: true,
  },
  {
    pos: 2,
    title: 'Store Telemetry Heatmaps',
    entryClass: 'Enterprise',
    lap: '2026 — LIVE',
    bestSector: 'Azure telemetry joined to Walmart floor plans — onboarding, RSSI, and weak-signal zones in one spatial view',
    tyres: ['Python', 'KQL', 'Azure', 'Pandas'],
    image: '/HeatMap.png',
  },
  {
    pos: 3,
    title: 'Executive Reporting Pipeline',
    entryClass: 'Enterprise',
    lap: '2026 — LIVE',
    bestSector: 'KQL templates → Azure exports → charts → finished exec decks, fully automated every week',
    tyres: ['Python', 'KQL', 'OpenPyXL', 'PowerPoint'],
    image: '/ReportingPipeline.png',
  },
  {
    pos: 4,
    title: 'FinTeach',
    entryClass: 'Hackathon',
    lap: '2024',
    bestSector: 'Award-winning financial planning tool for Texas teachers at HackUNT 2024',
    tyres: ['React', 'Flask', 'OpenAI', 'Plaid'],
    link: 'https://devpost.com/software/hackunt2024',
    image: '/finteach2.jpg',
  },
  {
    pos: 5,
    title: 'SkinByKaylaa',
    entryClass: 'Client',
    lap: '2024 — LIVE',
    bestSector: 'SEO-tuned pages and online booking driving local search for a Rockwall esthetician',
    tyres: ['React', 'SEO', 'Booking'],
    link: 'https://www.skinbykaylaa.vercel.app/',
    image: '/SkinByKaylaa.png',
  },
];

const PosBadge = ({ entry }) => (
  <div className="flex items-center gap-2">
    <span
      className={`font-display text-2xl leading-none md:text-3xl ${
        entry.fastestLap ? 'text-caution' : 'text-white'
      }`}
    >
      P{entry.pos}
    </span>
  </div>
);

const TitleCell = ({ entry }) => (
  <div className="flex items-center gap-3">
    <img
      src={entry.image}
      alt=""
      loading="lazy"
      className="hidden h-10 w-16 shrink-0 border border-white/10 object-cover sm:block"
    />
    <div>
      <p className="font-semibold text-white">{entry.title}</p>
      {entry.fastestLap && (
        <p className="mt-0.5 font-tele text-[9px] uppercase tracking-[0.24em] text-caution">
          ▸ Fastest lap — hackathon winner
        </p>
      )}
    </div>
  </div>
);

const StatusCell = ({ entry }) =>
  entry.link ? (
    <a
      href={entry.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-tele text-[11px] uppercase tracking-[0.14em] text-race-red transition-colors hover:text-white"
    >
      View <ExternalLink className="h-3 w-3" />
    </a>
  ) : (
    <span className="font-tele text-[10px] uppercase tracking-[0.14em] text-zinc-500">
      Enterprise — internal
    </span>
  );

const Projects = () => (
  <section id="results" className="site-section">
    <div className="site-container">
      <SectorHeader
        sector="07"
        code="Official classification"
        title="Race Results"
        sub="Final classification — pilot analytics from VusionGroup plus product builds from school and side projects."
      />

      {/* desktop: literal timing screen */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="readable hidden overflow-hidden border border-white/12 bg-black/70 backdrop-blur-sm md:block"
      >
        <div className="flex items-center justify-between border-b border-white/12 px-6 py-3">
          <p className="font-tele text-[10px] uppercase tracking-[0.28em] text-zinc-400">
            Dallas GP · Classification — Provisional
          </p>
          <p className="font-tele text-[10px] uppercase tracking-[0.28em] text-race-red">
            Race Control
          </p>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/12 font-tele text-[9px] uppercase tracking-[0.24em] text-zinc-500">
              <th className="px-6 py-3 font-medium">Pos</th>
              <th className="px-3 py-3 font-medium">Entry</th>
              <th className="px-3 py-3 font-medium">Class</th>
              <th className="px-3 py-3 font-medium">Lap Time</th>
              <th className="px-3 py-3 font-medium">Best Sector</th>
              <th className="px-6 py-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.title}
                className={`border-b border-white/8 transition-colors last:border-b-0 hover:bg-white/[0.04] ${
                  entry.fastestLap ? 'border-l-2 border-l-caution bg-caution/[0.045]' : ''
                }`}
              >
                <td className="px-6 py-4 align-middle">
                  <PosBadge entry={entry} />
                </td>
                <td className="px-3 py-4 align-middle">
                  <TitleCell entry={entry} />
                </td>
                <td className="px-3 py-4 align-middle font-tele text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                  {entry.entryClass}
                </td>
                <td className="px-3 py-4 align-middle font-tele text-[13px] text-data-blue">
                  {entry.lap}
                </td>
                <td className="max-w-xs px-3 py-4 align-middle text-[13px] leading-5 text-zinc-300">
                  {entry.bestSector}
                </td>
                <td className="px-6 py-4 text-right align-middle">
                  <StatusCell entry={entry} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-white/12 px-6 py-3 font-tele text-[9px] uppercase tracking-[0.2em] text-zinc-500">
          <span>
            <span className="text-caution">■</span> Fastest lap
          </span>
          <span>
            <span className="text-data-blue">■</span> Timing data
          </span>
          <span>All entries classified — no DNFs</span>
        </div>
      </motion.div>

      {/* mobile: stacked timing rows */}
      <div className="readable space-y-4 md:hidden">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.04 }}
            className={`border border-white/12 bg-black/70 p-4 ${
              entry.fastestLap ? 'border-l-2 border-l-caution' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <PosBadge entry={entry} />
              <span className="font-tele text-[11px] text-data-blue">{entry.lap}</span>
            </div>
            <div className="mt-2">
              <TitleCell entry={entry} />
            </div>
            <p className="mt-2 text-[13px] leading-5 text-zinc-300">{entry.bestSector}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.tyres.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/10 bg-black/40 px-2 py-0.5 font-tele text-[10px] text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <StatusCell entry={entry} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
