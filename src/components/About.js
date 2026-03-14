import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Car, Zap, GraduationCap, ArrowUpRight } from 'lucide-react';

// Added isAMGMode prop to Card to handle border hover colors
const Card = ({ children, className, delay = 0, isAMGMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
    drag
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    dragElastic={0.2}
    whileHover={{ scale: 1.02, cursor: "grab" }}
    whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
    className={`bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm transition-colors shadow-lg ${
      isAMGMode ? 'hover:border-red-500/50' : 'hover:border-purple-500/30'
    } ${className}`}
  >
    {children}
  </motion.div>
);

// Accept the prop here
const About = ({ isAMGMode }) => {
  return (
    <section id="about" className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background blurs swap to Red/Silver */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] -z-10 transition-colors duration-700 ${isAMGMode ? 'bg-red-600/20' : 'bg-purple-600/20'}`} />
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] -z-10 transition-colors duration-700 ${isAMGMode ? 'bg-zinc-500/20' : 'bg-blue-600/10'}`} />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row items-center md:items-start gap-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative shrink-0 group"
          >
            <div className={`absolute inset-0 blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-500 -z-10 rounded-full ${isAMGMode ? 'bg-gradient-to-br from-red-600 to-black' : 'bg-gradient-to-br from-purple-600 to-blue-600'}`} />
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <img 
                src={`${process.env.PUBLIC_URL}/Adamheadshot.webp`} 
                alt="Adam Moffat" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
              />
            </div>
          </motion.div>

          <div className="text-center md:text-left pt-4">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            >
              Solutions <br />
              {/* Text gradient swaps to Red/Silver */}
              <span className={`text-transparent bg-clip-text transition-colors duration-700 ${isAMGMode ? 'bg-gradient-to-r from-red-500 to-zinc-400' : 'bg-gradient-to-r from-purple-400 to-blue-500'}`}>
                Engineering.
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl"
            >
              Associate Field Application Engineer at VusionGroup. 
              Cornell M.Eng Candidate. Bridging the gap between complex technical architecture and enterprise ROI.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card isAMGMode={isAMGMode} className={`md:col-span-2 md:row-span-1 transition-colors duration-700 ${isAMGMode ? 'bg-gradient-to-br from-red-900/20 to-black' : 'bg-gradient-to-br from-purple-900/20 to-black'}`}>
            <div className="flex justify-between items-start mb-4">
              {/* Icon container colors swap */}
              <div className={`p-3 rounded-2xl transition-colors duration-700 ${isAMGMode ? 'bg-red-500/20' : 'bg-purple-500/20'}`}>
                <Cpu className={`w-8 h-8 transition-colors duration-700 ${isAMGMode ? 'text-red-500' : 'text-purple-400'}`} />
              </div>
              <span className={`px-3 py-1 text-xs rounded-full border transition-colors duration-700 ${isAMGMode ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                Pre-Sales Pilot Focus
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Associate Field Application Engineer</h3>
            <p className="text-gray-400 mb-4">VusionGroup</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Securing enterprise pilot deployments through complex network segregation and technical discovery. 
              Orchestrating Python automation pipelines and Azure Kusto (KQL) dashboards to prove solution ROI to executive leadership and accelerate technical sales cycles.
            </p>
          </Card>

          <Card isAMGMode={isAMGMode} className="md:col-span-1" delay={0.1}>
            <div className={`p-3 rounded-2xl w-fit mb-4 transition-colors duration-700 ${isAMGMode ? 'bg-zinc-500/20' : 'bg-blue-500/20'}`}>
              <GraduationCap className={`w-8 h-8 transition-colors duration-700 ${isAMGMode ? 'text-zinc-300' : 'text-blue-400'}`} />
            </div>
            <h3 className="text-xl font-bold mb-1">Education</h3>
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-white font-medium">Cornell University</p>
                <p className="text-xs text-gray-400">M.Eng Engineering Management (Focus: Technical Sales)</p>
              </div>
              <div>
                <p className="text-white font-medium">UT Dallas</p>
                <p className="text-xs text-gray-400">B.S. Computer Science</p>
              </div>
            </div>
          </Card>

          <Card isAMGMode={isAMGMode} className="md:col-span-1" delay={0.2}>
            <div className={`p-3 rounded-2xl w-fit mb-4 transition-colors duration-700 ${isAMGMode ? 'bg-red-500/20' : 'bg-orange-500/20'}`}>
              <Terminal className={`w-8 h-8 transition-colors duration-700 ${isAMGMode ? 'text-red-500' : 'text-orange-400'}`} />
            </div>
            <h3 className="text-xl font-bold mb-4">The Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['POC/POV Delivery', 'Consultative Selling', 'Azure', 'Python', 'KQL', 'JTAG', 'REST APIs'].map((tech) => (
                <span key={tech} className={`px-3 py-1 rounded-lg text-xs transition-colors duration-700 ${isAMGMode ? 'bg-red-950/30 text-red-200 border border-red-900/30' : 'bg-white/5 hover:bg-white/10'}`}>
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          <Card isAMGMode={isAMGMode} className="md:col-span-2 flex flex-col justify-center relative overflow-hidden group" delay={0.3}>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
            <div className="relative z-20 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Car className="text-red-500" />
                  <h3 className="text-xl font-bold">Beyond the Pitch</h3>
                </div>
                <p className="text-gray-400 text-sm max-w-md">
                By day, I'm scoping solutions and pursuing my Master's degree. 
                Off the clock, I'm an avid traveler, an avid golfer, and constantly tweaking my C63s AMG. 
                Whether in academics, travel, or automotive tuning, I'm obsessed with aesthetics, performance, and precision execution.
                </p>
              </div>
              <Zap className="w-24 h-24 text-white/5 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/Resume.pdf"
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