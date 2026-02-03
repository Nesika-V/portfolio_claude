import { useState, useEffect } from "react";
import "./App.css";

/* ─── DATA ─────────────────────────────────── */
const tools = [
  { id: 1,  icon: "devicon-react-original",     color: "#61dafb", name: "React",      desc: "Building dynamic & reusable component-based UIs" },
  { id: 2,  icon: "devicon-javascript-plain",   color: "#f7df1e", name: "JavaScript", desc: "Core scripting for interactive web experiences" },
  { id: 3,  icon: "devicon-typescript-plain",   color: "#3178c6", name: "TypeScript", desc: "Strongly-typed JavaScript for scalable apps" },
  { id: 4,  icon: "devicon-nodejs-plain",       color: "#339933", name: "Node.js",    desc: "Server-side runtime for full-stack development" },
  { id: 5,  icon: "devicon-python-plain",       color: "#3572a5", name: "Python",     desc: "Versatile scripting & data-driven solutions" },
  { id: 6,  icon: "devicon-mongodb-plain",      color: "#47a248", name: "MongoDB",    desc: "Flexible document-based database design" },
  { id: 7,  icon: "devicon-postgresql-plain",   color: "#336791", name: "PostgreSQL", desc: "Reliable relational database management" },
  { id: 8,  icon: "devicon-docker-plain",       color: "#2496ed", name: "Docker",     desc: "Containerised deployment & app isolation" },
  { id: 9,  icon: "devicon-git-plain",          color: "#f1502f", name: "Git",        desc: "Version control & team collaboration" },
  { id: 10, icon: "devicon-html5-plain",        color: "#e34c26", name: "HTML5",      desc: "Semantic structure for modern web pages" },
  { id: 11, icon: "devicon-css3-plain",         color: "#264653", name: "CSS3",       desc: "Pixel-perfect styling & responsive layouts" },
  { id: 12, icon: "devicon-figma-plain",        color: "#a259ff", name: "Figma",      desc: "Collaborative UI design & prototyping" },
];

const navItems = ["Home", "About", "Experience", "Projects", "Contact"];

const experiences = [
  { date: "Jun 2024 – Present", title: "Frontend Developer",  company: "Tech Startup",   desc: "Building responsive web apps with React and Node.js. Improved load time by 40 %.", tags: ["React", "Node.js", "MongoDB"] },
  { date: "Jan 2023 – May 2024", title: "Junior Developer", company: "Digital Agency",  desc: "Developed client-facing websites and integrated third-party APIs.",                tags: ["JavaScript", "HTML5", "CSS3"] },
];

const projects = [
  { title: "E-Commerce Platform",  desc: "Full-stack online store with real-time inventory, Stripe payments, and admin dashboard.", tags: ["React","Node.js","MongoDB","Stripe"], gradient: "135deg, #6366f1, #ec4899" },
  { title: "Task Manager App",     desc: "Collaborative project-management tool with drag-and-drop boards and WebSocket sync.",   tags: ["TypeScript","PostgreSQL","Docker"],  gradient: "135deg, #a855f7, #06b6d4" },
  { title: "Weather Dashboard",    desc: "Interactive weather dashboard pulling live data with beautiful data visualisations.",   tags: ["Python","React","CSS3"],             gradient: "135deg, #06b6d4, #10b981" },
];

/* ─── TOOL CARD (tooltip on hover / touch) ── */
function ToolCard({ tool, suffix }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="tool-card"
      style={{ "--tool-color": tool.color }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onTouchStart={(e) => { e.preventDefault(); setOpen(true); }}
      onTouchEnd={() => setTimeout(() => setOpen(false), 1200)}
      aria-label={tool.name}
    >
      <div className="tool-icon-wrap">
        <i className={`${tool.icon} tool-logo`} style={{ color: tool.color }} />
      </div>
      <div className={`tool-tooltip ${open ? "visible" : ""}`}>
        <div className="tooltip-arrow" />
        <p className="tooltip-name">{tool.name}</p>
        <p className="tooltip-desc">{tool.desc}</p>
      </div>
    </div>
  );
}

/* ─── APP ──────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  /* duplicate the tools array so the marquee loops seamlessly */
  const marqueeTools = [...tools, ...tools];

  return (
    <>
      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollTo("Home")}>
            <img src="/logo.jpg" alt="logo" onError={(e) => (e.target.style.display = "none")} />
            <span>Nesika</span>
          </div>
          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item} className={activeNav === item ? "active" : ""} onClick={() => scrollTo(item)}>
                {item}
              </a>
            ))}
            <button className="cta-button" onClick={() => scrollTo("Contact")}>Hire Me</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-content-streamlined">

          {/* profile + text */}
          <div className="hero-main">
            <div className="hero-profile-section">
              <div className="profile-image-wrapper">
                <img
                  className="profile-image"
                  src="/photo.jpg"
                  alt="Profile"
                  onError={(e) => {
                    e.target.style.display = "none";
                    const ph = e.target.nextElementSibling;
                    if (ph) ph.style.display = "flex";
                  }}
                />
                <div className="profile-placeholder" style={{ display: "none" }}>👤</div>
              </div>
            </div>

            <div className="hero-text-content">
              <span className="greeting">Hello, I'm</span>
              <h1 className="hero-name gold-heading">Nesika V</h1>
              <h2 className="hero-title">Full-Stack Developer</h2>
              <p className="hero-description">
                Crafting clean, performant web experiences from concept to deployment.
                I love turning ideas into reality with modern technologies.
              </p>
              <div className="hero-buttons">
                <a href="#projects"><button className="primary-btn">My Projects <i className="fas fa-arrow-right" /></button></a>
                <a href="#contact"><button className="secondary-btn">Get In Touch</button></a>
              </div>
              <div className="social-links">
                <a href="#" aria-label="GitHub"><i className="fab fa-github" /></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
                <a href="#" aria-label="Dribbble"><i className="fab fa-dribbble" /></a>
              </div>
            </div>
          </div>

          {/* ── TOOLS INFINITE MARQUEE ── */}
          <div className="tools-showcase">
            <h3 className="gold-heading">Technologies I Work With</h3>
            {/* the .marquee-track animates via CSS @keyframes scroll-marquee */}
            <div className="marquee-viewport">
              <div className="marquee-track">
                {marqueeTools.map((tool, i) => (
                  <ToolCard key={`${tool.id}-${i}`} tool={tool} />
                ))}
              </div>
            </div>
          </div>

          {/* download cv */}
          <div className="download-cv-section">
            <a href="/NESIKA-V_INTERN-1.pdf" download>
              <button className="download-cv-btn">
                <span className="download-icon">⬇</span>
                <span>Download CV</span>
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gold-heading">About Me</h2>
            <div className="title-underline" />
            <p className="section-subtitle">A little bit about who I am and what drives me</p>
          </div>
          <div className="about-content">
            <p className="about-intro">
              I'm a passionate full-stack developer with hands-on experience building scalable web applications.
              I love clean code, thoughtful UX, and turning complex problems into elegant solutions.
            </p>
            <div className="skills-grid">
              {[
                { cat: "Frontend", items: ["React","TypeScript","HTML5","CSS3","Figma"] },
                { cat: "Backend",  items: ["Node.js","Python","PostgreSQL","MongoDB"] },
                { cat: "DevOps",   items: ["Docker","Git","CI/CD","AWS Basics"] },
              ].map((s) => (
                <div className="skill-category" key={s.cat}>
                  <h3 className="gold-heading">{s.cat}</h3>
                  <div className="skill-tags">
                    {s.items.map((i) => <span key={i}>{i}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="stats-grid">
              {[["3+","Years Exp"],["15+","Projects"],["10+","Clients"],["100%","Dedication"]].map(([n, l]) => (
                <div className="stat-card" key={l}><h4 className="gold-heading">{n}</h4><p>{l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="section" id="experience">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gold-heading">Experience</h2>
            <div className="title-underline" />
          </div>
          <div className="timeline">
            {experiences.map((exp, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <span className="timeline-date">{exp.date}</span>
                  <h3 className="gold-heading">{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.desc}</p>
                  <div className="timeline-tags">
                    {exp.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="section" id="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gold-heading">Projects</h2>
            <div className="title-underline" />
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div className="project-card" key={i}>
                <div className="project-image" style={{ background: `linear-gradient(${p.gradient})` }}>
                  <div className="project-overlay">
                    <a href="#" className="project-link"><i className="fas fa-github" /></a>
                    <a href="#" className="project-link"><i className="fas fa-external-link-alt" /></a>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="gold-heading">{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title gold-heading">Contact</h2>
            <div className="title-underline" />
          </div>
          <div className="contact-wrapper">
            <div className="contact-info">
              {[
                { icon: "fa-envelope",    label: "Email",    val: "nesika@email.com" },
                { icon: "fa-phone",       label: "Phone",    val: "+91 XXXXXXXXXX" },
                { icon: "fa-map-marker-alt", label: "Location", val: "Madurai, Tamil Nadu" },
              ].map((c) => (
                <div className="contact-item" key={c.label}>
                  <i className={`fas ${c.icon}`} />
                  <div><h4>{c.label}</h4><p>{c.val}</p></div>
                </div>
              ))}
            </div>
            <div className="contact-form">
              <div className="form-row">
                <input type="text"  placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
              </div>
              <input type="text" placeholder="Subject" />
              <textarea rows={5} placeholder="Your Message" />
              <button className="submit-btn">Send Message <i className="fas fa-paper-plane" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.jpg" alt="logo" onError={(e) => (e.target.style.display = "none")} />
            <span>Nesika</span>
          </div>
          <div className="footer-links">
            {navItems.map((item) => <a key={item} onClick={() => scrollTo(item)}>{item}</a>)}
          </div>
          <div className="footer-social">
            <a href="#"><i className="fab fa-github" /></a>
            <a href="#"><i className="fab fa-linkedin-in" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Nesika V. All rights reserved.</div>
      </footer>
    </>
  );
}