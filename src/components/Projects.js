import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Rocket,
  Dumbbell,
  Map,
  BarChart3,
  FileSpreadsheet,
  Shield,
} from 'lucide-react';

const projects = [
  {
    title: 'Store Telemetry Heatmaps',
    description:
      'Analytics pipeline combining Azure backend telemetry with Walmart store map coordinates to visualize onboarding, RSSI, ping success, and weak-signal zones.',
    link: '',
    image: '/SportsApp.jpg',
    icon: <Map className="w-6 h-6" />,
    tags: ['Python', 'KQL', 'Azure', 'Pandas', 'Matplotlib'],
    featured: true,
    category: 'Solutions Engineering',
  },
  {
    title: 'Golden Store Benchmark',
    description:
      'Reporting workflow using Walmart Store 1216 as an operational benchmark to compare Best Buy pilot performance across onboarding, ping behavior, and AP performance.',
    link: '',
    image: '/finteach2.jpg',
    icon: <BarChart3 className="w-6 h-6" />,
    tags: ['Python', 'KQL', 'Excel', 'Pandas'],
    featured: true,
    category: 'Solutions Engineering',
  },
  {
    title: 'Executive Reporting Pipeline',
    description:
      'Python system running KQL templates, exporting Azure telemetry, generating charts, and publishing repeatable assets for weekly stakeholder updates.',
    link: '',
    image: '/Dynafit.jpg',
    icon: <FileSpreadsheet className="w-6 h-6" />,
    tags: ['Python', 'KQL', 'OpenPyXL', 'PowerPoint'],
    featured: true,
    category: 'Solutions Engineering',
  },
  {
    title: 'FinTeach',
    description:
      'Award-winning financial planning tool for Texas teachers with real-time insights. Built with React, Flask, OpenAI, and Plaid.',
    link: 'https://devpost.com/software/hackunt2024',
    image: '/finteach2.jpg',
    icon: <Rocket className="w-6 h-6" />,
    tags: ['React', 'Flask', 'OpenAI', 'Plaid'],
    category: 'Product Engineering',
  },
  {
    title: 'Network Intrusion Detection',
    description:
      'ML research detecting DDoS and smokescreen attacks with reduced false positives using Isolation Forest and One-Class SVM.',
    link: '',
    image: '/SportsApp.jpg',
    icon: <Shield className="w-6 h-6" />,
    tags: ['Python', 'Scikit-learn', 'Splunk'],
    category: 'Research',
  },
  {
    title: 'DynaFit',
    description:
      'AI-driven fitness app for personalized workout plans and tracking. React Native, Java, and AWS.',
    link: '',
    image: '/Dynafit.jpg',
    icon: <Dumbbell className="w-6 h-6" />,
    tags: ['React Native', 'Java', 'AWS'],
    category: 'Product Engineering',
  },
];

const Projects = ({ isAMGMode }) => {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-25" />
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-3xl">
          <p className="text-[11px] tracking-[0.32em] uppercase text-zinc-500 mb-4">
            08 — Selected Works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Pilots, pipelines & products
          </h2>
          <p className="text-zinc-400 text-lg leading-8">
            Technical work spanning enterprise reporting, pilot analytics, and
            full-stack product builds — the kind of execution I bring into
            pre-sales and solutions engineering engagements.
          </p>
          <div
            className={`h-1 w-20 rounded-full mt-6 ${
              isAMGMode ? 'bg-red-500' : 'bg-purple-500'
            }`}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className={`group relative border rounded-[24px] overflow-hidden transition-all duration-300 shadow-lg glow-card ${
                project.featured
                  ? isAMGMode
                    ? 'md:col-span-1 bg-black/55 border-red-500/20 hover:border-red-500/45'
                    : 'md:col-span-1 bg-white/[0.06] border-purple-500/20 hover:border-purple-500/45'
                  : isAMGMode
                    ? 'bg-black/45 border-white/10 hover:border-red-500/40'
                    : 'bg-white/5 border-white/10 hover:border-purple-500/40'
              }`}
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md ${
                      isAMGMode
                        ? 'border-red-500/30 bg-red-500/15 text-red-200'
                        : 'border-purple-400/30 bg-purple-500/15 text-purple-200'
                    }`}
                  >
                    {project.icon}
                  </span>
                </div>
                {project.featured && (
                  <span
                    className={`absolute top-4 right-4 z-20 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border backdrop-blur-md ${
                      isAMGMode
                        ? 'border-red-400/30 bg-red-500/20 text-red-100'
                        : 'border-purple-400/30 bg-purple-500/20 text-purple-100'
                    }`}
                  >
                    Pilot Analytics
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                  {project.category}
                </p>
                <h3
                  className={`text-2xl font-bold mb-2 transition-colors ${
                    isAMGMode
                      ? 'group-hover:text-red-400'
                      : 'group-hover:text-purple-400'
                  }`}
                >
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-4 leading-7">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-bold text-white transition-colors ${
                      isAMGMode ? 'hover:text-red-400' : 'hover:text-purple-400'
                    }`}
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Enterprise / internal delivery
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
