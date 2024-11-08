import React from 'react';
import { Mail, Linkedin, Github, ExternalLink, Stars } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen pt-24 p-8 bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
        {Array.from({ length: 50 }).map((_, i) => (
          <Stars
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
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 relative inline-block group">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
            <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </h2>
          <p className="text-xl text-gray-300">
            I'm always open to discussing new projects or opportunities. Feel free to reach out!
          </p>
        </div>

        {/* Contact Cards Container */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Email Card */}
          <a
            href="mailto:adamrmoffat@gmail.com"
            className="group relative backdrop-blur-lg bg-purple-950/10 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
            <Mail className="w-8 h-8 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Email
            </h3>
            <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
              adamrmoffat@gmail.com
            </p>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/adamrmoffat/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative backdrop-blur-lg bg-purple-950/10 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
            <Linkedin className="w-8 h-8 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              LinkedIn
            </h3>
            <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
              Connect Professionally
            </p>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/admft"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative backdrop-blur-lg bg-purple-950/10 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
            <Github className="w-8 h-8 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              GitHub
            </h3>
            <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
              Check Out My Code
            </p>
          </a>
        </div>

        {/* Call to Action */}
        <div className="text-center backdrop-blur-lg bg-purple-950/10 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
          <p className="text-xl text-gray-300 mb-6">
            Whether you have a question, project idea, or just want to say hello, I'd love to hear from you!
          </p>
          <a
            href="mailto:adamrmoffat@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group"
          >
            Get In Touch
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;