import React from 'react';
import { Stars, Award, Code, Car, Globe, Cpu, Brain, FileText } from 'lucide-react';

const ShootingStar = () => (
  <div 
    className="shooting-star absolute h-0.5 w-16 bg-gradient-to-r from-purple-400 via-white to-transparent rounded-full"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `rotate(${45 + Math.random() * 10}deg)`,
      animation: `shootingStarAnimation ${2 + Math.random() * 3}s linear infinite`,
      animationDelay: `${Math.random() * 5}s`
    }}
  />
);

const About = () => {
  return (
    <section id="about" className="min-h-screen pt-24 p-8 bg-black text-white relative overflow-hidden">
      {/* Shooting Stars */}
      {Array.from({ length: 300 }).map((_, i) => (
        <ShootingStar key={`shooting-star-${i}`} />
      ))}
      
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

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 relative inline-block group">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">
              Hi, I'm Adam! 👋
            </span>
            <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Software developer, AI enthusiast, car lover, and always exploring new ideas. Whether I'm building tech solutions or thinking about architectural design, I'm passionate about creating and constantly pushing the boundaries.
          </p>

          {/* Resume Button */}
          <a
            href="/Adam Moffat Resume 6.2 (cs).pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full overflow-hidden"
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            
            {/* Button Content */}
            <div className="relative flex items-center gap-2">
              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold group-hover:translate-x-0.5 transition-transform duration-300">
                View Resume
              </span>
            </div>
            
            {/* Animated Border */}
            <div className="absolute inset-0 border border-purple-400/30 rounded-full group-hover:border-purple-400/60 transition-colors duration-300" />
          </a>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Quick Facts */}
          <div className="backdrop-blur-lg bg-purple-950/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Quick Facts
              </span>
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Visited 17 countries 🌍 – always ready for the next adventure
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Big fan of innovative AI, sleek car mods, and fascinating architecture
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Always tinkering and learning – whether it's new tech or creative projects
              </li>
            </ul>
          </div>

          {/* The Techy Side */}
          <div className="backdrop-blur-lg bg-purple-950/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Cpu className="text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                The Techy Side of Me
              </span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Skilled in Python, JavaScript, and problem-solving, I focus on building impactful applications that are intuitive and effective. I'm driven by my curiosity in AI, and I love exploring how it can solve real-world problems.
            </p>
          </div>

          {/* Achievements */}
          <div className="backdrop-blur-lg bg-purple-950/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Award className="text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Achievements I'm Proud Of
              </span>
            </h3>
            <ul className="space-y-3 text-gray-300">
              {[
                '🏆 1st Place in two categories at HackUNT 2024 for creating FinTeach',
                '📈 Managed $130K in revenue for R&C Marketing',
                '🎓 Awarded full-ride Academic Excellence Scholarship at UT Dallas',
                '🏅 Multi-year blue ribbon nationalist in speech competitions'
              ].map((achievement, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="backdrop-blur-lg bg-purple-950/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Code className="text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Projects That Keep Me Up at Night
              </span>
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                FinTeach: A financial planning tool for Texas teachers
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                AI Fast Food Chatbot for The Genie Company
              </li>
            </ul>
          </div>

          {/* Outside of Coding */}
          <div className="backdrop-blur-lg bg-purple-950/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-purple-500/5">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Car className="text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Outside of Coding
              </span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Outside of tech, I'm into car modifications, fascinated by architecture, and constantly finding new interests to dive into. I believe in balancing creativity with logic, whether it's in a tech project or a personal pursuit.
            </p>
          </div>
        </div>
      </div>

      {/* Add styles for shooting stars animation */}
      <style jsx>{`
        @keyframes shootingStarAnimation {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 1;
          }
          20% {
            opacity: 1;
          }
          60% {
            opacity: 0;
          }
          100% {
            transform: translateX(200%) translateY(200%) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default About;