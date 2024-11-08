import React, { useState } from 'react';
import { ExternalLink, Github, Star, Rocket, Brain, Dumbbell } from 'lucide-react';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projectList = [
    {
      title: "FinTeach",
      description: "A financial planning tool designed to empower Texas teachers with real-time financial insights and budgeting tools. Built with React, Flask, OpenAI, and Plaid.",
      link: "https://devpost.com/software/hackunt2024",
      image: `${process.env.PUBLIC_URL}/finteach2.jpg`,
      icon: <Rocket className="w-6 h-6" />,
      tags: ["React", "Flask", "OpenAI", "Plaid"]
    },
    {
      title: "KTP SportsApp",
      description: "A predictive sports analytics app providing real-time game and player insights using AI-powered data analysis. Built with React, Redux, Java, and nba_api.",
      link: "",
      image: `${process.env.PUBLIC_URL}/SportsApp.jpg`,
      icon: <Brain className="w-6 h-6" />,
      tags: ["React", "Redux", "Java", "NBA API"]
    },
    {
      title: "DynaFit",
      description: "An AI-driven fitness app offering personalized workout plans and progress tracking. Built with React Native, Java, and AWS to deliver a seamless user experience.",
      link: "",
      image: `${process.env.PUBLIC_URL}/Dynafit.jpg`,
      icon: <Dumbbell className="w-6 h-6" />,
      tags: ["React Native", "Java", "AWS"]
    }
  ];

  return (
    <section id="projects" className="min-h-screen pt-24 p-8 bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
        {Array.from({ length: 50 }).map((_, i) => (
          <Star
            key={i}
            className="absolute animate-pulse text-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${0.3 + Math.random()})`,
            }}
            size={16}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 relative inline-block group">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
            <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projectList.map((project, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="relative h-full backdrop-blur-lg bg-purple-950/10 rounded-xl border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5 overflow-hidden">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 text-purple-400 z-20 bg-black/50 p-2 rounded-full">
                    {project.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                    >
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${hoveredIndex === index ? 'blur-xl' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;