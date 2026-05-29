import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';

const ContactItem = ({ icon: Icon, label, value, href, delay, isAMGMode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    whileHover={{ y: -4 }}
    className={`flex flex-col items-center justify-center p-8 border rounded-[24px] transition-all duration-300 group glow-card ${
      isAMGMode
        ? 'bg-black/50 border-white/10 hover:border-red-500/45 hover:bg-black/65'
        : 'bg-white/5 border-white/10 hover:border-purple-500/45 hover:bg-white/[0.07]'
    }`}
  >
    <Icon
      className={`w-8 h-8 text-gray-400 mb-4 transition-colors ${
        isAMGMode ? 'group-hover:text-red-400' : 'group-hover:text-purple-400'
      }`}
    />
    <span className="text-lg font-bold text-white mb-1">{label}</span>
    <span className="text-sm text-gray-500 group-hover:text-gray-300 flex items-center gap-1">
      {value}
      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </span>
  </motion.a>
);

const Contact = ({ isAMGMode }) => {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] -z-10 ${
          isAMGMode ? 'bg-red-600/10' : 'bg-purple-600/10'
        }`}
      />
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[11px] tracking-[0.32em] uppercase text-zinc-500 mb-4">
          09 — Contact
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          Let&apos;s Build the Business Case.
        </motion.h2>
        <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-2xl mx-auto leading-8">
          Open to pre-sales engineering, solutions engineering, field application
          engineering, and technical account management roles.
        </p>
        <p className="text-sm text-zinc-500 mb-12 max-w-xl mx-auto leading-7">
          Complex pilot, technical demo, customer integration, or ROI story — I help
          teams turn execution into customer confidence.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <ContactItem
            icon={Mail}
            label="Email"
            value="arm393@cornell.edu"
            href="mailto:arm393@cornell.edu"
            delay={0}
            isAMGMode={isAMGMode}
          />
          <ContactItem
            icon={Linkedin}
            label="LinkedIn"
            value="/in/adamrmoffat"
            href="https://www.linkedin.com/in/adamrmoffat/"
            delay={0.1}
            isAMGMode={isAMGMode}
          />
          <ContactItem
            icon={Github}
            label="GitHub"
            value="@admft"
            href="https://github.com/admft"
            delay={0.2}
            isAMGMode={isAMGMode}
          />
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center gap-3">
          <span className="text-gray-500 text-sm text-center leading-7 max-w-lg">
            © {new Date().getFullYear()} Adam Moffat. Built with React & Framer Motion.
            Designed for precision, performance, and technical storytelling.
          </span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            {isAMGMode ? 'AMG Performance Interface' : 'Solutions Engineering Mode'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
