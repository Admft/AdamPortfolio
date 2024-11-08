// src/components/Projects.js
import React from 'react';

const Projects = () => {
  const projectList = [
    {
      title: "FinTeach",
      description: "A financial planning tool designed to empower Texas teachers with real-time financial insights and budgeting tools. Built with React, Flask, OpenAI, and Plaid.",
      link: "https://devpost.com/software/hackunt2024",
      image: `${process.env.PUBLIC_URL}/finteach2.jpg`
    },
    {
      title: "Project 2",
      description: "A brief description of Project 2.",
      link: "https://example.com"
    },
    {
      title: "Project 3",
      description: "A brief description of Project 3.",
      link: "https://example.com"
    }
  ];

  return (
    <section id="projects" className="p-8 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projectList.map((project, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            {project.image && (
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
            )}
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <p className="text-gray-700">{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
