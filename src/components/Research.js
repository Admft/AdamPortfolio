import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectorHeader from './ui/SectorHeader';

const Research = () => (
  <section id="research" className="site-section">
    <div className="site-container">
      <SectorHeader
        sector="06"
        code="R&D — technical directives"
        title="Technical Directive"
        sub="Published RAG evaluation research and security ML — the work that sits behind the solutions engineering."
      />

      {/* ACL submission */}
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

      {/* ML Network Intrusion Detection */}
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="readable mt-8 border-l-2 border-white/15 pl-6 transition-colors hover:border-race-red md:mt-10 md:pl-8"
      >
        <p className="font-tele text-[10px] uppercase tracking-[0.3em] text-race-red">
          UT Dallas Research · 2024–2025
        </p>
        <h3 className="mt-2 font-display text-2xl uppercase text-white md:text-3xl">
          ML Network Intrusion Detection
        </h3>
        <p className="mt-1 font-tele text-[11px] uppercase tracking-[0.14em] text-zinc-500">
          Anomaly detection for smokescreen attacks
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300">
          Built ML models to detect &ldquo;smokescreen&rdquo; attacks — DDoS noise masking
          covert data exfiltration — using Netflow data, Isolation Forest, and
          One-Class SVM with Splunk log analysis. Tuned contamination hyperparameters
          to cut false positives, visualized decision boundaries with Matplotlib, and
          classified DDoS vs Probe vs exfiltration patterns.
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {['Python', 'Scikit-learn', 'Splunk', 'Netflow', 'Anomaly Detection'].map((tag) => (
            <span
              key={tag}
              className="border border-white/10 bg-black/40 px-2 py-0.5 font-tele text-[10px] text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  </section>
);

export default Research;
