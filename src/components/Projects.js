import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Rocket,
  Dumbbell,
  Map,
  FileSpreadsheet,
  Brain,
  Globe,
} from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const fieldProjects = [
  {
    title: 'Store Telemetry Heatmaps',
    description:
      'Azure telemetry mapped to Walmart store layouts. Onboarding, RSSI, ping success, and weak-signal zones in one view.',
    link: '',
    image: '/HeatMap.png',
    icon: Map,
    tags: ['Python', 'KQL', 'Azure', 'Pandas'],
    screenshot: true,
  },
  {
    title: 'Executive Reporting Pipeline',
    description:
      'KQL templates, Azure exports, chart generation, and repeatable decks for weekly stakeholder updates.',
    link: '',
    image: '/ReportingPipeline.png',
    icon: FileSpreadsheet,
    tags: ['Python', 'KQL', 'OpenPyXL', 'PowerPoint'],
    screenshot: true,
  },
];

const buildProjects = [
  {
    title: 'SkinByKaylaa',
    description:
      'Client site for a Rockwall esthetician. SEO-tuned pages, online booking, and a service showcase built to drive local search and appointments.',
    link: 'https://www.skinbykaylaa.vercel.app/',
    image: '/SkinByKaylaa.png',
    icon: Globe,
    tags: ['React', 'SEO', 'Booking', 'Client Work'],
  },
  {
    title: 'FinTeach',
    description:
      'Award-winning financial planning tool for Texas teachers. React, Flask, OpenAI, and Plaid.',
    link: 'https://devpost.com/software/hackunt2024',
    image: '/finteach2.jpg',
    icon: Rocket,
    tags: ['React', 'Flask', 'OpenAI', 'Plaid'],
  },
  {
    title: 'KTP SportsApp',
    description:
      'Predictive sports analytics with real-time game and player insights. React, Redux, Java, and nba_api.',
    link: '',
    image: '/SportsApp.jpg',
    icon: Brain,
    tags: ['React', 'Redux', 'Java', 'NBA API'],
  },
  {
    title: 'DynaFit',
    description:
      'AI-driven fitness app for personalized workout plans and tracking. React Native, Java, and AWS.',
    link: '',
    image: '/Dynafit.jpg',
    icon: Dumbbell,
    tags: ['React Native', 'Java', 'AWS'],
  },
];

const getProductGridClass = (count) => {
  const base = 'grid gap-5 items-stretch';

  if (count <= 1) return `${base} grid-cols-1`;
  if (count === 2) return `${base} grid-cols-1 sm:grid-cols-2`;
  if (count === 3) return `${base} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
  if (count === 4) return `${base} grid-cols-1 sm:grid-cols-2`;
  if (count % 4 === 0) return `${base} grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`;
  if (count % 3 === 0) return `${base} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;

  return `${base} grid-cols-1 sm:grid-cols-2`;
};

const ProjectCard = ({ project, index, isAMGMode, size = 'standard' }) => {
  const Icon = project.icon;
  const hoverTitle = isAMGMode ? 'group-hover:text-red-400' : 'group-hover:text-purple-400';
  const isFeatured = size === 'featured';
  const imageHeight = isFeatured ? 'h-52 md:h-64' : 'h-44 md:h-48';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05 }}
      className={`group panel flex h-full flex-col overflow-hidden p-0 ${
        isAMGMode ? 'panel-amg' : 'panel-base'
      }`}
    >
      <div
        className={`overflow-hidden relative shrink-0 ${
          project.screenshot ? `bg-zinc-950 ${imageHeight}` : imageHeight
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full transition-transform duration-500 ${
            project.screenshot
              ? 'object-contain p-3 group-hover:scale-[1.02]'
              : 'object-cover group-hover:scale-105'
          }`}
        />
        <div className="absolute top-3 left-3 z-20">
          <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border backdrop-blur-md ${
              isAMGMode
                ? 'border-red-500/30 bg-red-500/15 text-red-200'
                : 'border-purple-400/30 bg-purple-500/15 text-purple-200'
            }`}
          >
            <Icon className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className={`flex flex-col ${isFeatured ? 'p-5 md:p-6' : 'p-4 md:p-5'}`}>
        <h3
          className={`font-display font-bold mb-2 transition-colors ${hoverTitle} ${
            isFeatured ? 'text-xl' : 'text-lg'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-zinc-400 mb-4 leading-6 ${
            isFeatured ? 'text-sm md:text-base' : 'text-sm'
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/30 text-zinc-400 border border-white/10"
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
            className={`inline-flex items-center gap-2 text-sm font-medium text-white transition-colors ${hoverTitle}`}
          >
            View Project <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            {project.screenshot ? 'Enterprise delivery' : 'Personal / academic'}
          </span>
        )}
      </div>
    </motion.article>
  );
};

const Projects = ({ isAMGMode }) => {
  return (
    <section id="projects" className="site-section border-t border-white/5">
      <div className="site-container">
        <SectionHeader
          eyebrow="Selected Works"
          title="Projects"
          description="Pilot analytics from VusionGroup and product builds from school and side projects."
          isAMGMode={isAMGMode}
          className="mb-5 md:mb-6"
        />

        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">
            Field & analytics
          </p>
          <div className="grid md:grid-cols-2 gap-5 items-start">
            {fieldProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isAMGMode={isAMGMode}
                size="featured"
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">
            Products
          </p>
          <div className={getProductGridClass(buildProjects.length)}>
            {buildProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isAMGMode={isAMGMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects