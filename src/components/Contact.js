import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';

const channels = [
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

const Contact = ({ trackMode = false }) => (
  <section id="contact" className="relative">
    <div className="site-section pb-28">
      <div className="site-container max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="readable font-tele text-[11px] uppercase tracking-[0.28em] text-race-red"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="headline-solid mt-5 font-display uppercase leading-[0.88]"
          style={{ fontSize: 'clamp(3.4rem, 11vw, 8.5rem)' }}
        >
          {trackMode ? (
            <>
              Box, box,
              <br />
              <span className="headline-red">box.</span>
            </>
          ) : (
            <>
              Let&apos;s
              <br />
              <span className="headline-red">talk.</span>
            </>
          )}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="readable mx-auto mt-8 max-w-2xl border-l-2 border-data-blue bg-black/60 px-5 py-4 text-left"
        >
          <p className="font-tele text-[10px] uppercase tracking-[0.24em] text-data-blue">
            Open to
          </p>
          <p className="mt-2 text-sm leading-7 text-zinc-300 md:text-base">
            Forward Deployed Engineer roles where I can work directly with customers,
            build through ambiguity, deploy into real workflows, and turn production
            evidence into a better product. If the problem crosses software, data, AI,
            and the field — put me on it.
          </p>
        </motion.div>

        <div className="readable mt-10 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group flex items-center gap-3 border border-white/12 bg-black/70 px-5 py-3.5 text-left transition-colors hover:border-race-red/60"
              >
                <Icon className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-race-red" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                    {channel.label}
                  </p>
                  <p className="text-sm font-medium text-white">{channel.value}</p>
                </div>
                <ArrowUpRight className="ml-2 h-3.5 w-3.5 text-zinc-600 transition-colors group-hover:text-race-red" />
              </motion.a>
            );
          })}
        </div>

        <p className="readable mt-16 text-[12px] text-zinc-500">
          © {new Date().getFullYear()} Adam Moffat
        </p>
      </div>
    </div>
    {trackMode && <div className="checker" />}
  </section>
);

export default Contact;
