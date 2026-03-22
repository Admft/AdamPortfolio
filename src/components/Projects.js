import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Rocket, Brain, Dumbbell } from 'lucide-react';

const projects = [
  {
    title: "FinTeach",
    description: "Financial planning tool empowering Texas teachers with real-time insights. Built with React, Flask, OpenAI, and Plaid.",
    link: "https://devpost.com/software/hackunt2024",
    image: "/finteach2.jpg", // Ensure these images exist in public folder
    icon: <Rocket className="w-6 h-6" />,
    tags: ["React", "Flask", "OpenAI", "Plaid"],
    color: "from-green-400 to-emerald-600"
  },
  {
    title: "KTP SportsApp",
    description: "Predictive sports analytics providing real-time game/player insights using AI. React, Redux, Java, and nba_api.",
    link: "",
    image: "/SportsApp.jpg",
    icon: <Brain className="w-6 h-6" />,
    tags: ["React", "Redux", "Java", "NBA API"],
    color: "from-blue-400 to-indigo-600"
  },
  {
    title: "DynaFit",
    description: "AI-driven fitness app for personalized workout plans and tracking. React Native, Java, and AWS.",
    link: "",
    image: "/Dynafit.jpg",
    icon: <Dumbbell className="w-6 h-6" />,
    tags: ["React Native", "Java", "AWS"],
    color: "from-orange-400 to-red-600"
  }
];

const Projects = ({ isAMGMode }) => {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Selected Works</h2>
          <div className={`h-1 w-20 rounded-full ${isAMGMode ? 'bg-red-500' : 'bg-purple-500'}`} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg ${isAMGMode ? 'hover:border-red-500/50' : 'hover:border-purple-500/50'
                }`}
            >
              {/* Image Area */}
              <div className="h-48 overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10`} />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

              </div>

              {/* Content Area */}
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-2 transition-colors ${isAMGMode ? 'group-hover:text-red-400' : 'group-hover:text-purple-400'
                  }`}>
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-bold text-white transition-colors ${isAMGMode ? 'hover:text-red-400' : 'hover:text-purple-400'
                      }`}
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
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
