import React from 'react';
import { motion } from 'framer-motion';
import SectorHeader from './ui/SectorHeader';

const skillGroups = [
  {
    title: 'Cloud & data',
    items: ['Azure', 'KQL', 'Python', 'Pandas', 'Power BI', 'PostgreSQL'],
  },
  {
    title: 'Software',
    items: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'Next.js', 'Docker'],
  },
  {
    title: 'AI systems',
    items: ['RAG', 'LlamaIndex', 'Qdrant', 'Ollama', 'LLM evals', 'Scikit-learn'],
  },
  {
    title: 'Delivery',
    items: ['REST APIs', 'Playwright', 'Git', 'AWS', 'Postman', 'Android'],
  },
];

const SetupSheet = () => (
  <section id="skills" className="site-section">
    <div className="site-container">
      <SectorHeader
        label="Skills"
        title="What I build with"
        sub="Cloud analytics, full-stack product work, grounded AI systems, and the tools needed to ship them with customers."
      />

      <div className="readable grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.04 }}
            className="border-l border-white/15 pl-5"
          >
            <p className="font-tele text-[11px] uppercase tracking-[0.22em] text-race-red">
              {group.title}
            </p>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-zinc-300">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SetupSheet;
