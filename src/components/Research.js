import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectorHeader from './ui/SectorHeader';

const appendices = [
  {
    ref: 'APPENDIX A',
    title: 'HouseFax',
    subtitle: 'AI-powered residential due diligence · active development',
    description:
      'A "Carfax for houses" — an underwriting copilot built on the principle that LLMs explain, databases ground, deterministic tools calculate, and robust evals police. Next.js/TypeScript frontend, Dockerized FastAPI on AWS (EC2/ECS, RDS, S3), Redis caching, and Postgres with PostGIS + pgvector.',
    highlights: [
      'Agentic orchestration with hand-rolled tool-calling for cap rates, cash flow, and mortgage math',
      'LlamaIndex multi-document RAG for HOA/inspection disclosure synthesis',
      'GitHub Actions eval harness blocking deploys on math errors, hallucinations, and fair-housing violations',
      'Integrates RentCast, ATTOM, Census, FRED, and FEMA APIs',
    ],
    tags: ['FastAPI', 'Next.js', 'pgvector', 'LlamaIndex', 'AWS', 'Eval Harness'],
  },
  {
    ref: 'APPENDIX B',
    title: 'ML Network Intrusion Detection',
    subtitle: 'UT Dallas research · 2024–2025',
    description:
      'Built ML models to detect "smokescreen" attacks — DDoS noise masking covert data exfiltration — using Netflow data, Isolation Forest, and One-Class SVM with Splunk log analysis.',
    highlights: [
      'Focused on reducing false positives by tuning contamination hyperparameters',
      'Visualized decision boundaries with Matplotlib; classified DDoS vs Probe vs exfiltration patterns',
    ],
    tags: ['Python', 'Scikit-learn', 'Splunk', 'Netflow', 'Anomaly Detection'],
  },
];

const Research = () => (
  <section id="research" className="site-section">
    <div className="site-container">
      <SectorHeader
        sector="06"
        code="R&D — technical directives"
        title="Technical Directive"
        sub="RAG evaluation research, agentic AI products, and security ML — the work that sits behind the solutions engineering."
      />

      {/* the paper, filed as an FIA-style document */}
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="readable border border-white/12 bg-black/70 backdrop-blur-sm"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-white/12 px-5 py-4 md:px-8">
          <p className="font-tele text-[10px] uppercase tracking-[0.28em] text-zinc-400">
            Document 066-2026 · From: Race Control (Eval) · To: All Teams
          </p>
          <span className="stamp ml-auto shrink-0">ACL Submission · 2026</span>
        </div>

        <div className="px-5 py-6 md:px-8 md:py-8">
          <h3 className="font-display text-3xl uppercase leading-tight text-white md:text-4xl">
            When the LLM Judge Silently Fails
          </h3>
          <p className="mt-2 font-tele text-xs uppercase tracking-[0.18em] text-data-blue">
            A context-overflow failure mode in faithful RAG evaluation
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
            Found a silent failure mode where an LLM-as-judge returns schema-valid JSON
            with all-zero scores when input context exceeds ~2,500 tokens — producing
            apparent pipeline collapses that are evaluation artifacts, not generation
            failures. After capping judge context and re-scoring, real regressions were
            far smaller than the artifact suggested.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
            {[
              '66 ablation runs over 60 hand-written questions on 12 RAG papers (3 replications per condition)',
              'Fully local pipeline: Qdrant, Ollama, consumer GPU — hybrid BM25+dense retrieval with BGE reranker',
              'Documented post-reranking filter failure (−12.9 pts) and passage-level recall masking at chunk boundaries',
              'Released pre- and post-fix judge traces with anonymized supplementary archive',
            ].map((item) => (
              <p
                key={item.slice(0, 40)}
                className="relative pl-5 text-sm leading-6 text-zinc-300 before:absolute before:left-0 before:top-[0.55rem] before:h-[2px] before:w-2.5 before:bg-data-blue"
              >
                {item}
              </p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
            <div className="flex flex-wrap gap-2">
              {['RAG', 'LLM Evaluation', 'Qdrant', 'Ollama', 'Ablation Study'].map((tag) => (
                <span
                  key={tag}
                  className="border border-white/12 bg-black/50 px-2 py-0.5 font-tele text-[10px] text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="/67_When_the_LLM_Judge_Silently.pdf"
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-2 border border-race-red/60 bg-race-red/10 px-4 py-2 font-tele text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-race-red/25"
            >
              Read Paper (PDF)
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </motion.article>

      {/* appendices — borderless with left rules */}
      <div className="readable mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {appendices.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.06 }}
            className="border-l-2 border-white/15 pl-6 transition-colors hover:border-race-red"
          >
            <p className="font-tele text-[10px] uppercase tracking-[0.3em] text-race-red">
              {item.ref}
            </p>
            <h4 className="mt-2 font-display text-2xl uppercase text-white">{item.title}</h4>
            <p className="mt-1 font-tele text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              {item.subtitle}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{item.description}</p>
            <ul className="mt-3 space-y-1.5">
              {item.highlights.map((h) => (
                <li key={h.slice(0, 35)} className="text-xs leading-5 text-zinc-400">
                  — {h}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/10 bg-black/40 px-2 py-0.5 font-tele text-[10px] text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Research;
