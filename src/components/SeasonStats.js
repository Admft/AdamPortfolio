import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '8+', label: 'Store deployments validated', sub: 'Mist → Rigado · KQL monitored' },
  { value: '100+', label: 'Customer issues resolved', sub: '95% satisfaction · ASSET InterTech' },
  { value: '50+', label: 'Engineers enabled onsite', sub: 'RTX · GE Aviation · BAE · Tinker AFB' },
  { value: '66', label: 'RAG ablation runs', sub: 'ACL submission · 2026' },
  { value: '4.0', label: 'Cornell GPA', sub: 'M.Eng Engineering Management' },
  { value: 'AZ-900', label: 'Superlicence', sub: 'AI-102 · AZ-104 · AZ-305 in progress', caution: true },
];

const SeasonStats = () => (
  <section id="stats" className="relative">
    <div className="kerb" />
    <div className="site-section">
      <div className="site-container">
        <div className="readable mb-10 flex items-center gap-3">
          <span className="font-tele text-[10px] uppercase tracking-[0.32em] text-race-red">
            Sector 02
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-tele text-[10px] uppercase tracking-[0.32em] text-zinc-500">
            Season stats — 2026 championship
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (index % 3) * 0.07 }}
              className="readable border-b border-white/10 px-2 py-8 sm:px-6 md:py-10 lg:[&:nth-child(3n+1)]:pl-0"
            >
              <p
                className={`font-display leading-none ${
                  stat.caution ? 'text-caution' : 'text-data-blue'
                }`}
                style={{ fontSize: 'clamp(3.4rem, 7vw, 6rem)' }}
              >
                {stat.value}
              </p>
              <p className="mt-3 font-tele text-[11px] uppercase tracking-[0.24em] text-white">
                {stat.label}
              </p>
              <p className="mt-1.5 font-tele text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SeasonStats;
