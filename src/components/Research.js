import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Home,
  Shield,
  ExternalLink,
  Microscope,
} from 'lucide-react';
import Panel from './ui/Panel';
import SectionHeader from './ui/SectionHeader';

const publications = [
  {
    title: 'When the LLM Judge Silently Fails',
    subtitle: 'A Context-Overflow Failure Mode in Faithful RAG Evaluation',
    venue: 'ACL submission · 2026',
    icon: FileText,
    featured: true,
    description:
      'Found a silent failure mode where an LLM-as-judge returns schema-valid JSON with all-zero scores when input context exceeds ~2,500 tokens — producing apparent pipeline collapses that are evaluation artifacts, not generation failures. After capping judge context and re-scoring, real regressions were far smaller than the artifact suggested.',
    highlights: [
      '66 ablation runs over 60 hand-written questions on 12 RAG papers (3 replications per condition)',
      'Fully local pipeline: Qdrant, Ollama, consumer GPU — hybrid BM25+dense retrieval with BGE reranker',
      'Documented post-reranking filter failure (−12.9 pts) and passage-level recall masking at chunk boundaries',
      'Released pre- and post-fix judge traces with anonymized supplementary archive',
    ],
    tags: ['RAG', 'LLM Evaluation', 'Qdrant', 'Ollama', 'Ablation Study'],
    link: '/67_When_the_LLM_Judge_Silently.pdf',
    linkLabel: 'Read Paper (PDF)',
  },
];

const projects = [
  {
    title: 'HouseFax',
    subtitle: 'AI-Powered Residential Due Diligence',
    icon: Home,
    description:
      'A "Carfax for houses" — an underwriting copilot built on the principle that LLMs explain, databases ground, deterministic tools calculate, and robust evals police. Next.js/TypeScript frontend, Dockerized FastAPI on AWS (EC2/ECS, RDS, S3), Redis caching, and Postgres with PostGIS + pgvector.',
    highlights: [
      'Agentic orchestration with hand-rolled tool-calling for cap rates, cash flow, and mortgage math',
      'LlamaIndex multi-document RAG for HOA/inspection disclosure synthesis',
      'GitHub Actions eval harness blocking deploys on math errors, hallucinations, and fair-housing violations',
      'Integrates RentCast, ATTOM, Census, FRED, and FEMA APIs',
    ],
    tags: ['FastAPI', 'Next.js', 'pgvector', 'LlamaIndex', 'AWS', 'Eval Harness'],
    status: 'Active development',
  },
  {
    title: 'ML Network Intrusion Detection',
    subtitle: 'UT Dallas Research · 2024–2025',
    icon: Shield,
    description:
      'Built ML models to detect "smokescreen" attacks — DDoS noise masking covert data exfiltration — using Netflow data, Isolation Forest, and One-Class SVM with Splunk log analysis.',
    highlights: [
      'Focused on reducing false positives by tuning contamination hyperparameters',
      'Visualized decision boundaries with Matplotlib; classified DDoS vs Probe vs exfiltration patterns',
    ],
    tags: ['Python', 'Scikit-learn', 'Splunk', 'Netflow', 'Anomaly Detection'],
    status: 'Research',
  },
];

const Research = ({ isAMGMode }) => {
  const iconBox = isAMGMode
    ? 'border-red-500/25 bg-red-500/10 text-red-300'
    : 'border-purple-400/20 bg-purple-500/10 text-purple-300';

  return (
    <section id="research" className="site-section">
      <div className="site-container">
        <SectionHeader
          eyebrow="Research & AI"
          title="Papers and systems"
          description="RAG evaluation research, agentic AI products, and security ML — the work that sits behind the solutions engineering."
          isAMGMode={isAMGMode}
        />

        <div className="space-y-5 mb-8">
          {publications.map((pub, index) => {
            const Icon = pub.icon;
            return (
              <Panel key={pub.title} isAMGMode={isAMGMode} glow delay={index * 0.05}>
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${iconBox}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`chip ${isAMGMode ? 'chip-amg' : 'chip-base'} text-[10px] uppercase tracking-wider`}>
                        Publication
                      </span>
                      <span className="text-xs text-zinc-500">{pub.venue}</span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                      {pub.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4">{pub.subtitle}</p>

                    <p className="text-sm md:text-base text-zinc-300 leading-7 mb-4">
                      {pub.description}
                    </p>

                    <ul className="space-y-2 mb-5">
                      {pub.highlights.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="text-sm text-zinc-400 leading-6 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.65rem] before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-600"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {pub.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg text-xs border bg-black/30 text-zinc-300 border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {pub.link && (
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={pub.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-zinc-200 hover:border-white/25 hover:text-white transition-all ml-auto"
                        >
                          {pub.linkLabel}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Microscope className="w-4 h-4 text-zinc-500" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              AI Systems
            </p>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white">
            Active research &amp; builds
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Panel key={project.title} isAMGMode={isAMGMode} delay={0.08 + index * 0.05}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border mb-4 ${iconBox}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                    {project.status}
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-white mb-0.5">
                  {project.title}
                </h4>
                <p className="text-sm text-zinc-500 mb-3">{project.subtitle}</p>

                <p className="text-sm text-zinc-400 leading-6 mb-4">
                  {project.description}
                </p>

                <ul className="space-y-1.5 mb-4">
                  {project.highlights.map((item) => (
                    <li key={item.slice(0, 35)} className="text-xs text-zinc-500 leading-5">
                      · {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-[11px] border bg-black/20 text-zinc-400 border-white/8"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Panel>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Research;
