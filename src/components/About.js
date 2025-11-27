import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Car, Zap, GraduationCap, ArrowUpRight } from 'lucide-react';

const Card = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:border-purple-500/30 transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

const About = () => {
  return (
    <section id="about" className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Intelligence.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            Applications Engineer at ASSET InterTech. Incoming Cornell Grad Student. 
            Building high-performance software and systems.
          </motion.p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Work Card */}
          <Card className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-purple-900/20 to-black">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-500/20 rounded-2xl">
                <Cpu className="w-8 h-8 text-purple-400" />
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">Current Role</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Applications Engineer</h3>
            <p className="text-gray-400 mb-4">ASSET InterTech</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Specializing in JTAG/Boundary-scan technology and the ScanWorks platform. 
              Bridging the gap between hardware and software, delivering technical training to clients (like Tinker AFB), 
              and developing automation tools for system validation.
            </p>
          </Card>

          {/* Education Card */}
          <Card className="md:col-span-1" delay={0.1}>
            <div className="p-3 bg-blue-500/20 rounded-2xl w-fit mb-4">
              <GraduationCap className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">Education</h3>
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-white font-medium">Cornell University</p>
                <p className="text-xs text-gray-400">M.Eng Engineering Management (2026)</p>
              </div>
              <div>
                <p className="text-white font-medium">UT Dallas</p>
                <p className="text-xs text-gray-400">B.S. Computer Science</p>
              </div>
            </div>
          </Card>

          {/* Tech Stack / Skills */}
          <Card className="md:col-span-1" delay={0.2}>
            <div className="p-3 bg-orange-500/20 rounded-2xl w-fit mb-4">
              <Terminal className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">The Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Python', 'C++', 'ScanWorks', 'JTAG', 'AWS', 'Node.js'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-xs hover:bg-white/10 transition">
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          {/* Personal / Interests (Cars & Lifting) */}
          <Card className="md:col-span-2 flex flex-col justify-center relative overflow-hidden group" delay={0.3}>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
            {/* You can add a car image background here if you want */}
            <div className="relative z-20 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Car className="text-red-500" />
                  <h3 className="text-xl font-bold">Beyond the Code</h3>
                </div>
                <p className="text-gray-400 text-sm max-w-md">
                  When I'm not engineering, I'm modifying my Mercedes-AMG C63s, 
                  analyzing Porsche specs, or hitting the bench press.
                  Obsessed with aesthetics, performance, and precision engineering.
                </p>
              </div>
              <Zap className="w-24 h-24 text-white/5 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </Card>

        </div>
        
        {/* Resume Button */}
        <div className="mt-12 text-center">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/Adam_Moffat_Resume.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
          >
            View Full Resume <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;