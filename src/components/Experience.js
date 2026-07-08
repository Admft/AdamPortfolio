import React from 'react';
import {
  Cloud,
  Database,
  Wrench,
  Shield,
} from 'lucide-react';
import Panel from './ui/Panel';
import SectionHeader from './ui/SectionHeader';

const roles = [
  {
    company: 'VusionGroup',
    title: 'Associate Field Application Engineer',
    period: 'Jan 2026 – Present',
    location: 'Coppell, TX',
    icon: Cloud,
    highlight: true,
    summary:
      'Primary technical liaison between North American operations and global R&D. Cloud analytics, Python automation, API integrations, and enterprise pilot execution for Walmart, Kroger, and international rollouts.',
    bullets: [
      'Built modular Azure/KQL reporting pipeline — query templating, CLI auth, chart plugins, and automated PowerPoint generation for weekly executive updates',
      'Designed Store Telemetry Heatmaps: joined Azure Log Analytics telemetry with Walmart floor-plan APIs for spatial onboarding and RSSI visualization',
      'Led Mist→Rigado AP migration validation with Ellisys RF analysis, Confluence runbooks, and post-deployment KQL monitoring across 8+ stores',
      'Debugged production blockers via Azure Log Analytics (e.g. isolated "Label type not supported" root cause in wmd2 with cross-workspace KQL)',
      'Kroger CEC demo support: Android regression, BlueDot/Pointr navigation, Jira triage, and 4-hour end-to-end demo validation',
      'Shipped internal tools: TopStock Playwright automation, store aisle navigator, PyInstaller heatmap GUI, and Power BI dashboard prototypes',
    ],
    tags: ['Azure', 'KQL', 'Python', 'REST APIs', 'Power BI', 'Playwright', 'Android'],
  },
  {
    company: 'ASSET InterTech',
    title: 'Field Application Engineer',
    period: 'Jan 2025 – Jan 2026',
    location: 'Dallas, TX · Hybrid',
    icon: Shield,
    summary:
      'Pre- and post-sales technical ownership for aerospace and defense accounts. JTAG boundary-scan, ScanWorks enablement, and complex hardware validation — strong foundation in reading schematics, netlists, and debugging at the pin level.',
    bullets: [
      'Managed 100+ support cases with 95% satisfaction; led 4+ end-to-end test projects from SOW to customized JTAG suites',
      'Delivered 5+ week-long onsite trainings for 40–50+ engineers at RTX, GE Aviation, BAE, and Tinker AFB',
      'Published technical articles on flash programming, pin-level diagnostics, and in-house testing ROI',
      'Alpha/beta tested CT mode; diagnosed false-positive loopback failures for Thales/DRT secure boards',
    ],
    tags: ['JTAG', 'ScanWorks', 'Technical Sales', 'Documentation', 'QA'],
  },
  {
    company: 'CaringGuide',
    title: 'Software Engineer Intern',
    period: 'Apr – Dec 2023',
    location: 'Richardson, TX · Remote',
    icon: Database,
    summary:
      'Full-stack product work on a healthcare growth platform — React, Node, PostgreSQL, AWS Elastic Beanstalk, and Python lead-generation automation.',
    bullets: [
      'Built React/Node/Tailwind web app with containerized CI/CD on AWS Elastic Beanstalk',
      'Wrote Python scraper processing 1,000+ lead sources per run into PostgreSQL',
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Python'],
  },
];

const Experience = ({ isAMGMode }) => {
  const iconBox = isAMGMode
    ? 'border-red-500/25 bg-red-500/10 text-red-300'
    : 'border-purple-400/20 bg-purple-500/10 text-purple-300';

  return (
    <section id="experience" className="site-section">
      <div className="site-container">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've shipped"
          description="Cloud, AI, and software engineering in production — with IoT field work as the deployment context, not the career center."
          isAMGMode={isAMGMode}
        />

        <div className="space-y-5">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Panel
                key={role.company}
                isAMGMode={isAMGMode}
                glow={role.highlight}
                delay={index * 0.05}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${iconBox}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                          {role.title}
                        </h3>
                        <p className="text-zinc-400 text-sm mt-0.5">
                          {role.company} · {role.location}
                        </p>
                      </div>
                      <span className={`chip ${isAMGMode ? 'chip-amg' : 'chip-base'} text-[10px] uppercase tracking-wider shrink-0`}>
                        {role.period}
                      </span>
                    </div>

                    <p className="text-sm md:text-base text-zinc-300 leading-7 mb-4">
                      {role.summary}
                    </p>

                    <ul className="space-y-2 mb-5">
                      {role.bullets.map((bullet) => (
                        <li
                          key={bullet.slice(0, 40)}
                          className="text-sm text-zinc-400 leading-6 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.65rem] before:w-1.5 before:h-1.5 before:rounded-full before:bg-zinc-600"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs border bg-black/30 text-zinc-300 border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>

        <Panel isAMGMode={isAMGMode} delay={0.15} className="mt-5">
          <div className="flex items-start gap-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${iconBox}`}>
              <Wrench className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                IoT &amp; field context
              </h3>
              <p className="text-sm text-zinc-400 leading-6">
                BLE/RSSI analysis, ESL hardware investigations, power profiler root-cause
                work, and onsite retail deployments give me credibility in the room — but
                the systems I care most about building are cloud pipelines, AI workflows,
                and software that scales beyond a single store visit.
              </p>
            </div>
          </div>
        </Panel>
        <Panel isAMGMode={isAMGMode} delay={0.2} className="mt-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-4">
            Technical stack
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Cloud & Data', items: ['Azure', 'KQL', 'Log Analytics', 'Power BI', 'Python', 'Pandas'] },
              { label: 'AI & ML', items: ['RAG', 'LlamaIndex', 'pgvector', 'Ollama', 'Scikit-learn', 'LLM Evals'] },
              { label: 'Software', items: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Playwright'] },
              { label: 'Integration', items: ['REST APIs', 'Postman', 'AWS', 'Docker', 'Git', 'Android Studio'] },
            ].map((group) => (
              <div key={group.label}>
                <p className="text-xs font-medium text-zinc-300 mb-2">{group.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded-md text-[11px] border bg-black/25 text-zinc-400 border-white/8"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
};

export default Experience;
