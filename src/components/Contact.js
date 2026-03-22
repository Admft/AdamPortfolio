import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const ContactItem = ({ icon: Icon, label, value, href, delay, isAMGMode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className={`flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group ${isAMGMode ? 'hover:border-red-500/50' : 'hover:border-purple-500/50'
      }`}
  >
    <Icon className={`w-8 h-8 text-gray-400 mb-4 transition-colors ${isAMGMode ? 'group-hover:text-red-400' : 'group-hover:text-purple-400'
      }`} />
    <span className="text-lg font-bold text-white mb-1">{label}</span>
    <span className="text-sm text-gray-500 group-hover:text-gray-300">{value}</span>
  </motion.a>
);

const Contact = ({ isAMGMode }) => {
  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6"
        >
          Let's Build Something.
        </motion.h2>
        <p className="text-xl text-gray-400 mb-12">
          Open to discussing engineering roles, car builds, or game mods.
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

        {/* Added the subtle hint right below the copyright */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center gap-3">
          <span className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Adam Moffat. Built with React & Framer Motion.
          </span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            AMG Performance Interface
          </span>
        </div>
      </div>

    </section>
  );
};

export default Contact;
