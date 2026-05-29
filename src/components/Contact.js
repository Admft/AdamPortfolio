import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'arm393@cornell.edu',
    href: 'mailto:arm393@cornell.edu',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'adamrmoffat',
    href: 'https://www.linkedin.com/in/adamrmoffat/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'admft',
    href: 'https://github.com/admft',
  },
];

const Contact = ({ isAMGMode }) => {
  const hoverAccent = isAMGMode
    ? 'hover:border-red-500/40 hover:text-red-300'
    : 'hover:border-purple-500/40 hover:text-purple-300';

  return (
    <section id="contact" className="site-section border-t border-white/5">
      <div className="site-container max-w-4xl">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something."
          description="Open to pre-sales, solutions engineering, field application, and technical account roles. Pilots, demos, integrations, or an ROI story that needs clearer data."
          isAMGMode={isAMGMode}
          align="center"
        />

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`group panel flex items-center gap-3 px-5 py-3.5 ${
                  isAMGMode ? 'panel-amg' : 'panel-base'
                } ${hoverAccent}`}
              >
                <Icon className="w-4 h-4 text-zinc-400 group-hover:text-inherit transition-colors" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{link.label}</p>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400">{link.value}</p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-zinc-600 group-hover:text-inherit transition-colors" />
              </motion.a>
            );
          })}
        </div>

        <p className="mt-16 pt-8 border-t border-white/5 text-center text-zinc-600 text-sm">
          © {new Date().getFullYear()} Adam Moffat
        </p>
      </div>
    </section>
  );
};

export default Contact;
