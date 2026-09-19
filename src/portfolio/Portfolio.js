import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Download,
  Command,
  Code2,
  Radio,
  X,
  Menu,
  Linkedin,
  Github,
} from "lucide-react";
import { projects, skills } from "./content";
import ContactForm from "./ContactForm";
import GitHubActivity from "./GitHubActivity";

function ProjectDialog({ project, close }) {
  const dialog = useRef(null);
  useEffect(() => {
    const el = dialog.current;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el.showModal();
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="case-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="dialog-inner">
        <button
          className="icon-button dialog-close"
          onClick={close}
          aria-label="Close case study"
        >
          <X />
        </button>
        <span className="eyebrow">{project.category}</span>
        <h2 id="case-title">{project.name}</h2>
        <p className="dialog-intro">{project.summary}</p>
        {[
          ["The challenge", project.problem],
          ["What I built", project.solution],
          ["The outcome", project.outcome],
        ].map(([label, text]) => (
          <div className="case-section" key={label}>
            <h3>{label}</h3>
            <p>{text}</p>
          </div>
        ))}
        {project.details && (
          <div className="case-details">
            {project.details.map((detail) => (
              <section className="case-section" key={detail.title}>
                <h3>{detail.title}</h3>
                <p>{detail.text}</p>
              </section>
            ))}
          </div>
        )}
        {project.imageNote && (
          <figure className="case-screenshot">
            <img
              src={project.image}
              alt="Vusion Topstock Operations reporting snapshot"
            />
            <figcaption>{project.imageNote}</figcaption>
          </figure>
        )}
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.href && (
          <a
            className="text-link"
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            Visit project <ArrowUpRight size={17} />
          </a>
        )}
      </div>
    </dialog>
  );
}
export default function Portfolio({ launch }) {
  const [menu, setMenu] = useState(false);
  const [project, setProject] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-nav">
        <a className="wordmark" href="#top">
          am<span>.</span>
        </a>
        <nav
          className={menu ? "nav-links open" : "nav-links"}
          aria-label="Main navigation"
        >
          {[
            ["Work", "work"],
            ["About", "about"],
            ["Experience", "experience"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenu(false)}
          >
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
        <button className="mode-button" onClick={launch}>
          <span className="mode-light" />
          <span>Launch car mode</span>
          <Command size={14} />
        </button>
        <button
          className="icon-button mobile-menu"
          onClick={() => setMenu(!menu)}
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="availability">
              <span className="status-dot" /> OPEN TO SALES ENGINEER
              OPPORTUNITIES
            </div>
            <h1>
              Technical depth.
              <br />
              Human connection.
              <br />
              <span>Real impact.</span>
            </h1>
            <p className="hero-description">
              I’m Adam Moffat. I turn complex technology into solutions people
              understand, believe in, and buy.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#work">
                Explore my work <ArrowDown size={17} />
              </a>
              <a
                className="text-link"
                href="/Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View résumé <Download size={16} />
              </a>
            </div>
            <div className="hero-footnote">
              <span>BASED IN DALLAS–FORT WORTH</span>
              <span className="tiny-cross">+</span>
              <span>ENGINEER BY TRAINING. PEOPLE PERSON BY NATURE.</span>
            </div>
          </div>
          <div className="portrait-composition">
            <div className="portrait-frame">
              <img
                src="/Adamheadshot.webp"
                alt="Adam Moffat"
                fetchpriority="high"
              />
              <div className="portrait-caption">
                <span>ADAM MOFFAT</span>
                <span>ENGINEERING × BUSINESS</span>
              </div>
            </div>
            <div className="portrait-sticker">
              <Radio size={19} />
              <span>
                Built in the field.
                <br />
                <strong>Ready for the room.</strong>
              </span>
            </div>
            <span className="portrait-coordinate">
              32.7767° N &nbsp; 96.7970° W
            </span>
            <div className="portrait-corner">+</div>
          </div>
        </section>
        <section className="credibility wrap" aria-label="Background">
          <span className="eyebrow">A FOOT IN BOTH WORLDS</span>
          <div className="company-wordmarks">
            <span>
              VUSION<span className="company-small">GROUP</span>
            </span>
            <span className="asset-logo">
              ASSET<span className="company-small">INTERTECH</span>
            </span>
            <span className="cornell-logo">
              Cornell <small>University</small>
            </span>
            <span className="utd-logo">UT Dallas</span>
            <span className="causey-logo">
              causey<span>.</span>
            </span>
          </div>
        </section>
        <section className="metrics wrap" aria-label="Career highlights">
          {[
            [
              "$54K/mo",
              "Average personal sales revenue",
              "EVO · $135K over 2.5 months",
            ],
            ["50+", "Engineers trained", "Enterprise customer enablement"],
            ["28K", "Retail rails monitored", "Field intelligence at scale"],
            [
              "CS + MEM",
              "Technology meets business",
              "UT Dallas · Cornell University",
            ],
          ].map(([value, label, detail]) => (
            <div key={value}>
              <strong>{value}</strong>
              <p>{label}</p>
              <span>{detail}</span>
            </div>
          ))}
        </section>
        <section className="section wrap" id="work">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow">01 / SELECTED WORK</span>
              <h2>
                Proof, not just a pitch<span>.</span>
              </h2>
            </div>
            <p>
              Real problems. Working solutions.
              <br />A few things I’ve built along the way.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((item, i) => (
              <button
                className={`project-card ${item.featured ? "project-featured" : ""}`}
                key={item.id}
                onClick={() => setProject(item)}
                data-reveal
              >
                <div className={`project-image project-image-${i}`}>
                  <img
                    src={item.image}
                    alt={`${item.name} interface`}
                    loading="lazy"
                  />
                  <span className="project-open">
                    <ArrowUpRight size={22} />
                  </span>
                  <span className="project-index">0{i + 1}</span>
                </div>
                <div className="project-info">
                  <span className="eyebrow">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="case-link">
                    Explore case study <ArrowRight size={15} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <div className="wrap github-wrap">
          <GitHubActivity />
        </div>
        <section className="about-section" id="about">
          <div className="wrap">
            <div className="about-intro" data-reveal>
              <div>
                <span className="eyebrow">02 / THE WAY I WORK</span>
                <h2>
                  I speak engineer.
                  <br />
                  And <span>human.</span>
                </h2>
              </div>
              <div>
                <p>
                  I’m at my best where technology meets a real conversation. On
                  a manufacturing floor, in a customer demo, or building the
                  software that makes a team’s day easier.
                </p>
                <p>
                  My background spans computer science, direct sales, and field
                  application engineering. Today, I work at VusionGroup and
                  study Engineering Management at Cornell—connecting the
                  technical details to the bigger business picture.
                </p>
              </div>
            </div>
            <div className="skill-grid">
              {skills.map((skill) => (
                <article key={skill.number} data-reveal>
                  <span className="skill-number">{skill.number}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.text}</p>
                  <span className="skill-tags">{skill.tags}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section wrap experience-section" id="experience">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow">03 / THE EXPERIENCE</span>
              <h2>
                From first conversation
                <br />
                to field deployment<span>.</span>
              </h2>
            </div>
            <a
              className="text-link"
              href="/Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              The full résumé <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="experience-list">
            {[
              [
                "2026 — PRESENT",
                "VusionGroup",
                "Associate Field Application Engineer",
                "Connect North American operations with global R&D. Deploy retail IoT solutions, investigate system behavior, and build the tools that turn telemetry into customer decisions.",
                "Retail IoT / Azure / Technical enablement",
              ],
              [
                "2025 — 2026",
                "ASSET InterTech",
                "Field Application Engineer",
                "Supported the technical sales cycle for aerospace, defense, and manufacturing customers. Delivered product demos, onsite evaluations, and intensive ScanWorks training for more than 50 engineers.",
                "Technical discovery / Product demos / Customer training",
              ],
              [
                "2024",
                "EVO Marketing",
                "Sales Manager",
                "Generated $135K in personal sales over 2.5 months—an average of $54K per month—and led a five-person team. Spent the rest of my tenure training team members and supporting web development and marketing efforts.",
                "Consultative selling / Salesforce / Team leadership",
              ],
            ].map(([date, company, role, detail, tags]) => (
              <article className="experience-row" key={company} data-reveal>
                <span className="eyebrow">{date}</span>
                <div>
                  <h3>{company}</h3>
                  <span className="experience-role">{role}</span>
                </div>
                <div>
                  <p>{detail}</p>
                  <span className="experience-tags">{tags}</span>
                </div>
              </article>
            ))}
          </div>
          <a
            className="research-strip"
            href="/67_When_the_LLM_Judge_Silently.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={24} />
            <div>
              <span className="eyebrow">ALSO IN THE LAB</span>
              <h3>When the LLM judge silently fails.</h3>
              <p>
                66 ablation runs. One important lesson about trusting AI
                evaluations.
              </p>
            </div>
            <ArrowUpRight />
          </a>
        </section>
        <section className="demo-banner wrap" data-reveal>
          <div className="demo-grid" aria-hidden="true">
            <span>AM / EXPERIMENT 001</span>
            <div className="orbital orbital-one" />
            <div className="orbital orbital-two" />
            <div className="orbital orbital-three" />
            <Command size={40} />
          </div>
          <div>
            <span className="eyebrow">A LITTLE LESS CONVENTIONAL</span>
            <h2>
              Want to see how
              <br />
              my brain works?
            </h2>
            <p>
              A real-time 3D experiment. One car. A different way to explore.
            </p>
            <button className="primary-button" onClick={launch}>
              Enter the car experience <ArrowUpRight size={17} />
            </button>
            <span className="demo-note">
              Interactive WebGL · Sound optional · Best on desktop
            </span>
          </div>
        </section>
        <section className="section wrap contact-section" id="contact">
          <div data-reveal>
            <span className="eyebrow">04 / LET’S CONNECT</span>
            <h2>
              Your next technical
              <br />
              conversation starts <span>here.</span>
            </h2>
            <p>
              Looking for a sales engineer who can build the solution
              <br className="desktop-break" /> and bring people along? Let’s
              talk.
            </p>
            <a className="email-link" href="mailto:arm393@cornell.edu">
              arm393@cornell.edu <ArrowUpRight size={23} />
            </a>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/adamrmoffat"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/Admft"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <footer className="site-footer wrap">
        <a className="wordmark" href="#top">
          am<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Adam Moffat</span>
        <span>Curiosity under the hood. People at the wheel.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
      {project && (
        <ProjectDialog project={project} close={() => setProject(null)} />
      )}
    </div>
  );
}
