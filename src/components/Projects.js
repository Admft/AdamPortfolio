import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Rocket,
  Dumbbell,
  Map,
  FileSpreadsheet,
  Brain,
} from 'lucide-react';
import SectionLabel from './ui/SectionLabel';

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

const ProjectCard = ({ project, index, isAMGMode, size = 'standard' }) => {
  const Icon = project.icon;
  const hoverTitle = isAMGMode ? 'group-hover:text-red-400' : 'group-hover:text-purple-400';
  const isFeatured = size === 'featured';

  const imageHeight = isFeatured ? 'h-56 md:h-72' : 'h-48 md:h-52';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -8 }}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 shadow-lg glow-card h-full flex flex-col ${
        isAMGMode
          ? 'bg-black/55 border border-white/10 hover:border-red-500/50'
          : 'bg-white/5 border border-white/10 hover:border-purple-500/50'
      }`}
    >
      <div
        className={`overflow-hidden relative shrink-0 ${
          project.screenshot ? `bg-zinc-950 ${imageHeight}` : imageHeight
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent z-10" />
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full transition-transform duration-700 ${
            project.screenshot
              ? 'object-contain p-4 group-hover:scale-[1.02]'
              : 'object-cover group-hover:scale-110'
          }`}
        />
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md ${
              isAMGMode
                ? 'border-red-500/30 bg-red-500/15 text-red-200'
                : 'border-purple-400/30 bg-purple-500/15 text-purple-200'
            }`}
          >
            <Icon className="w-5 h-5" />
          </span>
        </div>
      </div>

      <div className={`flex flex-col flex-1 ${isFeatured ? 'p-6 md:p-7' : 'p-5 md:p-6'}`}>
        <h3
          className={`font-bold mb-2 transition-colors ${hoverTitle} ${
            isFeatured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-gray-400 mb-4 leading-7 flex-1 ${
            isFeatured ? 'text-sm md:text-base line-clamp-4' : 'text-sm line-clamp-3'
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
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
            className={`inline-flex items-center gap-2 text-sm font-bold text-white transition-colors ${hoverTitle}`}
          >
            View Project <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <span className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            {project.screenshot ? 'Enterprise delivery' : 'Personal / academic'}
          </span>
        )}
      </div>
    </motion.article>
  );
};

const Projects = ({ isAMGMode }) => {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SectionLabel isAMGMode={isAMGMode}>Selected Works</SectionLabel>
          <h2 className="text-4xl font-bold mb-3 tracking-tight">Projects</h2>
          <p className="text-zinc-400 max-w-2xl leading-7">
            Pilot analytics from VusionGroup and product builds from school and side
            projects.
          </p>
          <div
            className={`h-1 w-20 rounded-full mt-5 ${
              isAMGMode ? 'bg-red-500' : 'bg-purple-500'
            }`}
          />
        </div>

        <div className="mb-12">
          <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-5">
            Field & analytics
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
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
          <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-5">
            Products
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default Projects;
