import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import SectionLabel from './ui/SectionLabel';

const ContactItem = ({ icon: Icon, label, value, href, delay, isAMGMode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    whileHover={{ y: -4 }}
    className={`flex flex-col items-center justify-center p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group ${
      isAMGMode
        ? 'bg-black/50 border-white/10 hover:border-red-500/50 hover:bg-black/65'
        : 'bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-white/10'
    }`}
  >
    <Icon
      className={`w-8 h-8 text-gray-400 mb-4 transition-colors ${
        isAMGMode ? 'group-hover:text-red-400' : 'group-hover:text-purple-400'
      }`}
    />
    <span className="text-lg font-bold text-white mb-1">{label}</span>
    <span className="text-sm text-gray-500 group-hover:text-gray-300">{value}</span>
  </motion.a>
);

const Contact = ({ isAMGMode }) => {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full blur-[120px] -z-10 ${
          isAMGMode ? 'bg-red-600/10' : 'bg-purple-600/10'
        }`}
      />
      <div className="max-w-4xl mx-auto text-center">
        <SectionLabel isAMGMode={isAMGMode} className="justify-center">
          Contact
        </SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-5 tracking-tight"
        >
          Let&apos;s build something.
        </motion.h2>
        <p className="text-lg text-gray-400 mb-3 max-w-xl mx-auto leading-8">
          Open to pre-sales, solutions engineering, field application, and
          technical account roles.
        </p>
        <p className="text-sm text-zinc-500 mb-12 max-w-md mx-auto leading-7">
          Pilots, demos, integrations, or an ROI story that needs clearer data.
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

        <div className="mt-20 pt-10 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Adam Moffat. Built with React & Framer Motion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
