import { useState, useEffect, useRef } from "react";
import "./App.css";
import GridBackground from "./GridBackground";

/* ─── DATA ───────────────────────────────────────────────────── */
const tools = [
  { icon: "⚛️", level: "expert",       name: "React.js",         desc: "Component-based UIs with hooks and state management." },
  { icon: "🌐", level: "expert",       name: "HTML / CSS",        desc: "Semantic markup, responsive layouts, modern CSS." },
  { icon: "⚡", level: "expert",       name: "JavaScript",        desc: "ES6+, DOM, async programming and API integrations." },
  { icon: "🐍", level: "intermediate", name: "Python",            desc: "Backend scripting, data processing and automation." },
  { icon: "🗄️", level: "intermediate", name: "MySQL",             desc: "Database design, queries and relational modelling." },
  { icon: "🎨", level: "intermediate", name: "Figma",             desc: "UI prototyping, wireframing and design systems." },
  { icon: "📱", level: "expert",       name: "Digital Marketing", desc: "Social media strategy, SEO and campaign analytics." },
  { icon: "⚙️", level: "intermediate", name: "Git / GitHub",      desc: "Version control and collaborative development." },
  { icon: "☁️", level: "intermediate", name: "IBM Cloud & AI",    desc: "Cloud services, AI fundamentals and deployment." },
];

const experiences = [
  {
    date: "Aug 2024 – Dec 2024", location: "India (Remote)",
    title: "Google Student Ambassador (GSA)", company: "Google",
    desc: "Organized tech events, workshops and developer sessions at campus level. Built a tech community of 100+ students and promoted Google cloud technologies.",
    tags: ["Community Building", "Event Management", "Google Cloud"],
  },
  {
    date: "Jun 2024 – Present", location: "Tirupur, TN",
    title: "Frontend Developer Intern", company: "Tech Startup",
    desc: "Built responsive React applications translating Figma mockups into pixel-perfect implementations. Improved page load performance by 30%.",
    tags: ["React.js", "CSS3", "Figma", "Git"],
  },
  {
    date: "Jan 2024 – May 2024", location: "Tamil Nadu",
    title: "Digital Marketing Intern", company: "Marketing Agency",
    desc: "Managed social media accounts and ran targeted campaigns. Grew follower engagement by 45% and optimized ad spend ROI.",
    tags: ["Social Media", "Content Strategy", "Analytics", "SEO"],
  },
];

const projects = [
  { emoji: "🌐", bg: "linear-gradient(135deg, #1a1035, #0f0f2a)", tags: ["React", "CSS"],            title: "W3App",                    desc: "Modern web application with dynamic routing, state management and clean responsive UI across all devices." },
  { emoji: "🎓", bg: "linear-gradient(135deg, #0a2a1a, #051a12)", tags: ["Python", "MySQL", "React"], title: "EduWell",                   desc: "Student wellness platform tracking academic and mental health data with dashboards and actionable insights." },
  { emoji: "🚨", bg: "linear-gradient(135deg, #2a0a0a, #1a0505)", tags: ["Python", "AI/ML", "IoT"],   title: "Accident Detection System", desc: "Real-time accident detection using computer vision and IoT sensors that auto-alerts emergency services." },
];

const awards = [
  { icon: "🎓", title: "Academic Achiever",              org: "Nandha Arts & Science College · 2025–2026", featured: true },
  { icon: "🏆", title: "Best Project Presentation",      org: "Department Level — Nandha Arts & Science College" },
  { icon: "⭐", title: "Department Topper",               org: "BSc Computer Technology — Academic Excellence" },
  { icon: "🎯", title: "Marketing Mania Winner",          org: "Intercollegiate Marketing Competition" },
  { icon: "📜", title: "Paper Presentation — 1st Place",  org: "National Level Technical Symposium" },
];

const certs = [
  { icon: "🐍", name: "Python Bootcamp",      issuer: "LetsUpgrade · 2024" },
  { icon: "☁️", name: "IBM Cloud Essentials", issuer: "IBM · 2024" },
  { icon: "🤖", name: "IBM AI Fundamentals",  issuer: "IBM · 2024" },
  { icon: "⚡", name: "JavaScript Bootcamp",  issuer: "LetsUpgrade · 2024" },
];

const faqs = [
  { q: "What technologies do you work with?",               a: "I primarily work with React.js, HTML5, CSS3, JavaScript (ES6+), Python, and MySQL. For design I use Figma, and I have hands-on exposure to IBM Cloud and AI services." },
  { q: "Are you open to internship / full-time roles?",     a: "Yes! I'm actively looking for frontend developer roles, internships, or collaborative projects. Open to both remote and in-office positions across Tamil Nadu and beyond." },
  { q: "What makes you different from other developers?",   a: "I combine frontend skills with digital marketing and user psychology — I don't just build what works, I build what converts. My Google Student Ambassador experience gives me strong communication and leadership skills too." },
  { q: "How can I contact you?",                            a: "Email at nesika247@gmail.com, LinkedIn at /in/nesika-v-ab9b87301, or call +91 7339660164. I respond within 24 hours." },
];


/* ─── ROTATING WORDS ─────────────────────────────────────────── */
function RotatingWords() {
  const words = ["Frontend Developer", "UI/UX Enthusiast", "Google Ambassador", "Digital Marketer", "React Specialist"];
  const [idx, setIdx]   = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setExit(true);
      setTimeout(() => { setIdx(i => (i + 1) % words.length); setExit(false); }, 380);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rotating-wrap">
      <span className={`rotating-word ${exit ? "word-out" : "word-in"}`}>{words[idx]}</span>
    </div>
  );
}

/* ─── ANIMATED NAME ──────────────────────────────────────────── */
function AnimatedName() {
  return (
    <h1 className="hero-name">
      {"NESIKA V".split("").map((ch, i) => (
        <span key={i} className="name-letter" style={{ animationDelay: `${0.3 + i * 0.07}s` }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h1>
  );
}

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (i % 4) * 0.07 + "s";
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── NAV ────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const links = ["about","skills","experience","projects","education","awards","faq"];

  useEffect(() => {
    const h = () => {
      let cur = "home";
      document.querySelectorAll("section[id]").forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">NESIKA<span>.</span></div>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l}><a href={`#${l}`} className={active === l ? "active" : ""}>{l.charAt(0).toUpperCase()+l.slice(1)}</a></li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">Contact Me</a>
        <button className="nav-hamburger" onClick={() => setOpen(true)}><span/><span/><span/></button>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setOpen(false)}>✕</button>
        {[...links,"contact"].map(l => (
          <a key={l} href={`#${l}`} onClick={() => setOpen(false)}>{l.toUpperCase()}</a>
        ))}
      </div>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-left">
        <div className="hero-above reveal">
          <span className="above-label">✦ Creative &amp; Technical</span>
          <RotatingWords />
        </div>
        <div className="hero-tag reveal"><span className="dot" />Available for Opportunities</div>
        <AnimatedName />
        <p className="hero-sub reveal">Frontend Developer &amp; Google Student Ambassador</p>
        <p className="hero-desc reveal">
          Crafting clean, performant web experiences with modern technologies.
          Passionate about UI/UX, digital marketing, and building impactful products.
        </p>
        <div className="hero-actions reveal">
          <a href="/Nesika-V-CV.pdf" download className="btn-primary"><i className="fas fa-download" /> Download CV</a>
          <a href="#contact" className="btn-secondary">Let's Talk <i className="fas fa-arrow-right" /></a>
        </div>
        <div className="hero-socials reveal">
          <a href="mailto:nesika247@gmail.com"><i className="fas fa-envelope" /></a>
          <a href="https://www.linkedin.com/in/nesika-v-ab9b87301"><i className="fab fa-linkedin-in" /></a>
          <a href="https://github.com/"><i className="fab fa-github" /></a>
        </div>
        <div className="hero-stats reveal">
          <div className="stat"><span className="stat-num">2<span>+</span></span><span className="stat-label">Years Exp.</span></div>
          <div className="stat"><span className="stat-num">8<span>+</span></span><span className="stat-label">Projects</span></div>
          <div className="stat"><span className="stat-num">5<span>+</span></span><span className="stat-label">Awards</span></div>
        </div>
      </div>

      <div className="hero-right reveal">
        <div className="hero-photo-wrap">
          <div className="hero-photo-bg" />
          { <img src="/Myself.png" alt="Nesika V" className="hero-photo" /> }
          <div className="hero-photo-placeholder">
            <i className="fas fa-user" />
            <p>Add photo.jpg to public/</p>
          </div>
          <div className="hero-badge">
            <div className="hero-badge-label">Location</div>
            <div className="hero-badge-val">📍 Tirupur, TN</div>
          </div>
          <div className="hero-badge2">
            <div className="emoji">🎓</div>
            <div className="hero-badge2-label">Google Student<br />Ambassador</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────── */
function About() {
  const details = [
    { label: "Full Name", val: "Nesika V" },
    { label: "Email",     val: "nesika247@gmail.com" },
    { label: "Phone",     val: "+91 7339660164" },
    { label: "Location",  val: "Tirupur, Tamil Nadu" },
    { label: "Degree",    val: "BSc Computer Technology" },
    { label: "Status",    val: "Open to Work ✦", gold: true },
    { label: "LinkedIn",  val: "nesika-v-ab9b87301" },
  ];
  const soft = ["Problem Solving","Team Leadership","Creative Design","UI/UX Thinking","Digital Marketing","Public Speaking"];
  return (
    <section id="about" className="section section-bg2">
      <div className="section-eyebrow reveal">About Me</div>
      <h2 className="section-title reveal">WHO I AM</h2>
      <div className="about-grid">
        <div className="about-text reveal">
          I'm <strong>Nesika V</strong>, a passionate <span className="hl">Frontend Developer</span> and <span className="hl">Google Student Ambassador</span> pursuing BSc Computer Technology at <strong>Nandha Arts &amp; Science College, Erode</strong>.
          <br /><br />
          Beyond code, I've led digital marketing initiatives that drove measurable growth — combining technical skill with creative strategy. I believe great software is as much about <strong>experience design</strong> as engineering.
          <div className="chips">{soft.map(s => <span className="chip" key={s}>{s}</span>)}</div>
        </div>
        <div className="about-details reveal">
          {details.map(d => (
            <div className="about-row" key={d.label}>
              <span className="about-label">{d.label}</span>
              <span className="about-val" style={d.gold ? {color:"var(--gold)"} : {}}>{d.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsMarquee() {
  const tools = [
    { name: "HTML5",          desc: "Semantic markup & modern web structure",     bg: "#e34c26", icon: "https://cdn.simpleicons.org/html5/ffffff" },
    { name: "CSS3",           desc: "Responsive layouts & modern styling",         bg: "#1572b6", icon: "https://cdn.simpleicons.org/css3/ffffff" },
    { name: "JavaScript",     desc: "ES6+ dynamic interactions & APIs",            bg: "#f7df1e", icon: "https://cdn.simpleicons.org/javascript/000000" },
    { name: "React.js",       desc: "Component-based UI with hooks & state",       bg: "#20232a", icon: "https://cdn.simpleicons.org/react/61dafb" },
    { name: "Figma",          desc: "Design tool for creating and collaborating",  bg: "#1e1e2e", icon: "https://cdn.simpleicons.org/figma/ffffff" },
    { name: "Canva",          desc: "Visual design & graphic creation platform",   bg: "#7d2ae8", icon: "https://cdn.simpleicons.org/canva/ffffff" },
    { name: "MySQL",          desc: "Relational database design & queries",        bg: "#00758f", icon: "https://cdn.simpleicons.org/mysql/ffffff" },
    { name: "Linux",          desc: "Open-source OS & terminal commands",          bg: "#1a1a1a", icon: "https://cdn.simpleicons.org/linux/ffffff" },
    { name: "Android Studio", desc: "IDE for Android app development",             bg: "#3ddc84", icon: "https://cdn.simpleicons.org/androidstudio/ffffff" },
    { name: "Git",            desc: "Version control & code history tracking",     bg: "#f05032", icon: "https://cdn.simpleicons.org/git/ffffff" },
    { name: "GitHub",         desc: "Collaborative code hosting & open source",    bg: "#161b22", icon: "https://cdn.simpleicons.org/github/ffffff" },
    { name: "Python",         desc: "Backend scripting, automation & data tools",  bg: "#306998", icon: "https://cdn.simpleicons.org/python/ffffff" },
  ];

  const doubled = [...tools, ...tools];

  return (
    <div className="mq-outer">
      <div className="mq-track">
        {doubled.map((t, i) => (
          <div className="mq-item" key={i}>
            <div className="mq-tooltip">
              <strong>{t.name}</strong>
              <span>{t.desc}</span>
            </div>
            <div className="mq-pill" style={{ background: t.bg }}>
              <img src={t.icon} alt={t.name} className="mq-icon" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .mq-outer {
          width: 100%;
          overflow: hidden;
          padding: 20px 0;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .mq-track {
          display: flex;
          gap: 18px;
          width: max-content;
          animation: mqScroll 28s linear infinite;
        }
        .mq-track:hover { animation-play-state: paused; }
        @keyframes mqScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mq-item { position: relative; flex-shrink: 0; cursor: pointer; }
        .mq-pill {
          width: 72px; height: 72px;
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .mq-item:hover .mq-pill {
          transform: translateY(-8px) scale(1.12);
          box-shadow: 0 16px 36px rgba(0,0,0,0.7), 0 6px 14px rgba(0,0,0,0.5);
        }
        .mq-icon { width: 36px; height: 36px; object-fit: contain; display: block; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.4)); }
        .mq-tooltip {
          position: absolute;
          bottom: calc(100% + 14px);
          left: 50%; transform: translateX(-50%) scale(0.88);
          background: #f4f4f4; color: #111;
          border-radius: 10px; padding: 10px 14px;
          min-width: 170px; max-width: 210px;
          pointer-events: none; opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 100;
          box-shadow: 0 8px 28px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.35);
          white-space: normal; line-height: 1.4;
        }
        .mq-tooltip::after {
          content: "";
          position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
          border-left: 8px solid transparent; border-right: 8px solid transparent;
          border-top: 8px solid #f4f4f4;
        }
        .mq-tooltip strong { display: block; font-size: 0.82rem; font-weight: 800; margin-bottom: 3px; color: #0a0a0a; }
        .mq-tooltip span { font-size: 0.74rem; font-weight: 500; color: #444; }
        .mq-item:hover .mq-tooltip { opacity: 1; transform: translateX(-50%) scale(1); }
        @media (max-width: 600px) {
          .mq-pill { width: 58px; height: 58px; border-radius: 14px; }
          .mq-icon { width: 28px; height: 28px; }
          .mq-track { gap: 14px; animation-duration: 20s; }
        }
      `}</style>
    </div>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────────── */
function Experience() {
  const experiences = [
    {
      date: "Aug 2024 – Dec 2024", location: "India (Remote)",
      title: "Google Student Ambassador (GSA)", company: "Google",
      desc: "Organized tech events, workshops and developer sessions at campus level. Built a tech community of 100+ students and promoted Google cloud technologies.",
      tags: ["Community Building", "Event Management", "Google Cloud"],
      pos: "top",
    },
    {
      date: "Jun 2024 – Present", location: "Tirupur, TN",
      title: "Frontend Developer Intern", company: "Tech Startup",
      desc: "Built responsive React applications translating Figma mockups into pixel-perfect implementations. Improved page load performance by 30%.",
      tags: ["React.js", "CSS3", "Figma", "Git"],
      pos: "bottom",
    },
    {
      date: "Jan 2024 – May 2024", location: "Tamil Nadu",
      title: "Digital Marketing Intern", company: "Marketing Agency",
      desc: "Managed social media accounts and ran targeted campaigns. Grew follower engagement by 45% and optimized ad spend ROI.",
      tags: ["Social Media", "Content Strategy", "Analytics", "SEO"],
      pos: "top",
    },
  ];

  return (
    <section id="experience" className="section section-bg2 xp-section">
      <div className="section-eyebrow reveal">Career</div>
      <h2 className="section-title reveal">EXPERIENCE</h2>

      <div className="xp-wrap reveal">

        <svg className="xp-svg" viewBox="0 0 1000 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#888" stopOpacity="0.3" />
              <stop offset="35%"  stopColor="#ccc" stopOpacity="0.85"/>
              <stop offset="65%"  stopColor="#e0e0e0" stopOpacity="1" />
              <stop offset="100%" stopColor="#888" stopOpacity="0.3" />
            </linearGradient>
            <filter id="cshadow" x="-20%" y="-50%" width="140%" height="200%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,0.7)" />
            </filter>
          </defs>
          <path d="M -30,240 C 100,240 180,55 320,75 C 460,95 530,195 670,145 C 810,95 910,30 1030,18"
            fill="none" stroke="rgba(200,200,200,0.1)" strokeWidth="70" strokeLinecap="round"/>
          <path d="M -30,240 C 100,240 180,55 320,75 C 460,95 530,195 670,145 C 810,95 910,30 1030,18"
            fill="none" stroke="url(#sg)" strokeWidth="40" strokeLinecap="round" filter="url(#cshadow)"/>
          <path d="M -30,240 C 100,240 180,55 320,75 C 460,95 530,195 670,145 C 810,95 910,30 1030,18"
            fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="12" strokeLinecap="round"/>
          {[{cx:230,cy:71},{cx:540,cy:178},{cx:840,cy:60}].map((d,i)=>(
            <circle key={i} cx={d.cx} cy={d.cy} r="8" fill="#c9a84c">
              <animate attributeName="r" values="8;12;8" dur="2.4s" begin={`${i*0.7}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" begin={`${i*0.7}s`} repeatCount="indefinite"/>
            </circle>
          ))}
        </svg>

        <div className="xp-cols">
          {experiences.map((e, i) => (
            <div key={i} className={`xp-col xp-col-${e.pos}`}>
              <div className={`xp-line xp-line-${e.pos}`} />
              <div className="xp-card">
                <div className="xp-card-shine" />
                <div className="xp-meta">
                  <span className="xp-date">{e.date}</span>
                  <span className="xp-loc"><i className="fas fa-map-marker-alt" /> {e.location}</span>
                </div>
                <div className="xp-title">{e.title}</div>
                <div className="xp-company">{e.company}</div>
                <p className="xp-desc">{e.desc}</p>
                <div className="xp-tags">{e.tags.map(t=><span className="xp-tag" key={t}>{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .xp-section { overflow: hidden; }
        .xp-wrap {
          position: relative;
          max-width: 1060px;
          margin: 10px auto 0;
          padding: 0 16px;
          height: 540px;
        }
        .xp-svg {
          position: absolute;
          left: 0; right: 0;
          top: 130px;
          width: 100%;
          height: 300px;
          z-index: 1;
          pointer-events: none;
          overflow: visible;
        }
        .xp-cols {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 0 4px;
          z-index: 2;
        }
        .xp-col { display: flex; flex-direction: column; align-items: center; }
        .xp-col-top  { justify-content: flex-start; padding-top: 12px; }
        .xp-col-top .xp-line { order: 1; }
        .xp-col-bottom { justify-content: flex-start; padding-top: 298px; }
        .xp-col-bottom .xp-line { order: -1; }
        .xp-line { width: 2px; flex-shrink: 0; height: 44px; }
        .xp-line-top { background: linear-gradient(to bottom, rgba(201,168,76,0.7), rgba(201,168,76,0.05)); }
        .xp-line-bottom { background: linear-gradient(to top, rgba(201,168,76,0.7), rgba(201,168,76,0.05)); }
        .xp-card {
          position: relative;
          width: 100%;
          max-width: 290px;
          background: linear-gradient(148deg, #d9af3a 0%, #b8891e 48%, #9a6e10 100%);
          border-radius: 20px;
          padding: 16px 16px 14px;
          overflow: hidden;
          box-shadow:
            0 2px  4px  rgba(0,0,0,0.8),
            0 6px  14px rgba(0,0,0,1),
            0 14px 32px rgba(0,0,0,1),
            0 28px 56px rgba(0,0,0,1),
            0 50px 80px rgba(0,0,0,0.95),
            0 70px 100px rgba(0,0,0,0.7);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .xp-card:hover {
          transform: translateY(-7px) scale(1.018);
          box-shadow:
            0 4px  8px  rgba(0,0,0,0.85),
            0 12px 24px rgba(0,0,0,1),
            0 24px 48px rgba(0,0,0,1),
            0 44px 72px rgba(0,0,0,1),
            0 70px 100px rgba(0,0,0,0.9);
        }
        .xp-card-shine {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 18% 12%, rgba(255,255,255,0.15) 0%, transparent 58%);
          border-radius: 20px; pointer-events: none;
        }
        .xp-meta { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 7px; align-items: center; }
        .xp-date {
          font-size: 0.63rem; font-weight: 700;
          color: rgba(0,0,0,0.6); background: rgba(0,0,0,0.12);
          padding: 2px 7px; border-radius: 20px;
        }
        .xp-loc { font-size: 0.62rem; font-weight: 600; color: rgba(0,0,0,0.5); }
        .xp-loc .fas { font-size: 0.58rem; margin-right: 2px; }
        .xp-title { font-size: 0.9rem; font-weight: 900; color: #0b0b0b; line-height: 1.2; margin-bottom: 2px; }
        .xp-company { font-size: 0.7rem; font-weight: 700; color: rgba(0,0,0,0.5); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 7px; }
        .xp-desc { font-size: 0.71rem; font-weight: 600; color: #111; line-height: 1.55; margin: 0 0 9px; }
        .xp-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .xp-tag { font-size: 0.6rem; font-weight: 700; background: rgba(0,0,0,0.13); color: #0b0b0b; padding: 2px 7px; border-radius: 20px; }

        @media (max-width: 780px) {
          .xp-wrap { height: 600px; }
          .xp-card { max-width: 210px; padding: 12px 11px 10px; }
          .xp-title { font-size: 0.78rem; }
          .xp-desc  { font-size: 0.63rem; }
          .xp-col-bottom { padding-top: 320px; }
        }
        @media (max-width: 560px) {
          .xp-wrap { height: auto; }
          .xp-svg  { display: none; }
          .xp-cols { position: relative; display: flex; flex-direction: column; gap: 16px; padding: 0; }
          .xp-col-top, .xp-col-bottom { padding-top: 0; align-items: stretch; }
          .xp-line { display: none; }
          .xp-card { max-width: 100%; }
          .xp-cols::before {
            content: "";
            position: absolute;
            left: 12px; top: 0; bottom: 0; width: 2px;
            background: linear-gradient(to bottom, transparent, #c9a84c 15%, #c9a84c 85%, transparent);
            border-radius: 2px;
          }
          .xp-col { padding-left: 30px; }
        }
      `}</style>
    </section>
  );
}

/* helper — card body shared between desktop and nothing */
function CardInner({ e }) {
  return (
    <div className="exp-card-inner">
      <div className="exp-card-header">
        <span className="exp-icon-badge">{e.icon}</span>
        <div>
          <div className="exp-card-date">{e.date}</div>
          <div className="exp-card-loc"><i className="fas fa-map-marker-alt" /> {e.location}</div>
        </div>
      </div>
      <div className="exp-card-title">{e.title}</div>
      <div className="exp-card-company">{e.company}</div>
      <div className="exp-card-desc">{e.desc}</div>
      <div className="exp-card-tags">
        {e.tags.map(t => <span className="exp-tag" key={t}>{t}</span>)}
      </div>
    </div>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" className="section section-bg">
      <div className="section-eyebrow reveal">Work</div>
      <h2 className="section-title reveal">PROJECTS</h2>
      <div className="projects-grid">
        {projects.map(p => (
          <div className="project-card reveal" key={p.title}>
            <div className="project-thumb" style={{background:p.bg}}>{p.emoji}</div>
            <div className="project-body">
              <div className="project-tags">{p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}</div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-link">View Project <i className="fas fa-arrow-right" /></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── EDUCATION — Drop-in replacement for Education() in App.jsx ─── */

function Education() {
  return (
    <section id="education" className="section section-bg2 edu-road-section">
      <div className="section-eyebrow reveal">Academic</div>
      <h2 className="section-title reveal">EDUCATION</h2>

      {/* ─── Main Scene ─── */}
      <div className="edu-scene reveal">

        {/* ── LEFT: School ── */}
        <div className="edu-node edu-node-left">
          <div className="edu-bubble">
            Arts with Computer Application at APS Academy Matriculation Higher Secondary School
          </div>
          <div className="edu-bubble-tail" />
          <div className="edu-building">
            <img
              src="schl.png"
              alt="School"
              className="edu-building-img"
            />
          </div>
        </div>

        {/* ── CENTRE: Curved connecting line ── */}
        <div className="edu-line-wrap">
          <svg
            viewBox="0 0 500 220"
            xmlns="http://www.w3.org/2000/svg"
            className="edu-line-svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#c9a84c" stopOpacity="0.9" />
                <stop offset="50%"  stopColor="#f0d080" stopOpacity="1"   />
                <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.9" />
              </linearGradient>
              <path id="lp" d="M 0,5 C 0,230 500,230 500,5" />
            </defs>

            {/* Soft glow behind line */}
            <use
              href="#lp"
              fill="none"
              stroke="rgba(201,168,76,0.15)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Main curved line */}
            <use
              href="#lp"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="8 6"
            />

            {/* Animated dot travelling along the line */}
            <circle r="5" fill="#c9a84c" opacity="1">
              <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#lp" />
              </animateMotion>
            </circle>
            {/* Glow around dot */}
            <circle r="10" fill="#f0d080" opacity="0.25">
              <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#lp" />
              </animateMotion>
            </circle>

            {/* Start dot */}
            <circle cx="0" cy="5" r="5" fill="#c9a84c" opacity="0.9" />
            {/* End dot */}
            <circle cx="500" cy="5" r="5" fill="#c9a84c" opacity="0.9" />
          </svg>
        </div>

        {/* ── RIGHT: College ── */}
        <div className="edu-node edu-node-right">
          <div className="edu-bubble">
            B.Sc. Computer Technology student at Nandha Arts and Science College, Erode
          </div>
          <div className="edu-bubble-tail" />
          <div className="edu-building">
            <img
              src="clg.png"
              alt="College"
              className="edu-building-img"
            />
          </div>
        </div>

      </div>

      {/* ─── Detail Cards ─── */}
      <div className="edu-cards-row reveal">
        <div className="edu-detail-card">
          <span className="edu-detail-year">2021 – 2022</span>
          <div className="edu-detail-degree">Higher Secondary (12th Grade)</div>
          <div className="edu-detail-school">APS Academy Matriculation<br />Higher Secondary School</div>
          <div className="edu-detail-sub">Computer Science Stream</div>
          <div className="edu-detail-grade"><i className="fas fa-star" /> Distinction</div>
        </div>
        <div className="edu-detail-card edu-detail-card-main">
          <span className="edu-detail-year">2022 – 2025</span>
          <div className="edu-detail-degree">BSc Computer Technology</div>
          <div className="edu-detail-school">Nandha Arts &amp; Science College, Erode<br />Affiliated to Bharathiar University</div>
          <div className="edu-detail-sub">Department Topper</div>
          <div className="edu-detail-grade"><i className="fas fa-star" /> Academic Excellence</div>
        </div>
      </div>

      <style>{`
        .edu-road-section { overflow: hidden; }

        /* ── Scene ── */
        .edu-scene {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          max-width: 1060px;
          margin: 32px auto 0;
          gap: 0;
        }

        /* ── Building nodes ── */
        .edu-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 185px;
          z-index: 2;
        }
        .edu-node-left  { margin-right: -4px; }
        .edu-node-right { margin-left:  -4px; }

        /* ── Speech bubble ── */
        .edu-bubble {
          background: rgba(205,205,205,0.92);
          color: #111;
          border-radius: 12px;
          padding: 10px 13px;
          font-size: 0.71rem;
          font-weight: 600;
          line-height: 1.45;
          text-align: center;
          width: 165px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4);
        }
        .edu-bubble-tail {
          width: 0; height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid rgba(205,205,205,0.92);
          margin-bottom: 2px;
        }

        /* ── Building — no background ── */
        .edu-building {
          width: 170px;
          height: 150px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .edu-building-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: bottom center;
          mix-blend-mode: lighten;
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.4));
          transition: transform 0.35s ease;
        }
        .edu-building-img:hover { transform: scale(1.05); }

        /* ── Connecting line SVG ── */
        .edu-line-wrap {
          flex: 1;
          min-width: 0;
          align-self: flex-end;
          z-index: 1;
          margin-bottom: 8px; /* align line base with building base */
        }
        .edu-line-svg {
          width: 100%;
          height: 180px;
          display: block;
          overflow: visible;
        }

        /* ── Detail cards ── */
        .edu-cards-row {
          display: flex;
          gap: 22px;
          justify-content: center;
          max-width: 800px;
          margin: 40px auto 0;
          flex-wrap: wrap;
        }
        .edu-detail-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 22px 26px;
          flex: 1;
          min-width: 240px;
          max-width: 350px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .edu-detail-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.5);
        }
        .edu-detail-card-main {
          border-color: rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.06);
        }
        .edu-detail-year {
          display: inline-block;
          background: rgba(201,168,76,0.18);
          color: #c9a84c;
          font-size: 0.71rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 11px;
        }
        .edu-detail-degree {
          font-size: 0.97rem;
          font-weight: 700;
          color: #f0ede6;
          margin-bottom: 5px;
        }
        .edu-detail-school {
          font-size: 0.81rem;
          color: #c9a84c;
          font-weight: 600;
          margin-bottom: 4px;
          line-height: 1.45;
        }
        .edu-detail-sub {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.42);
          margin-bottom: 12px;
        }
        .edu-detail-grade {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.77rem;
          font-weight: 600;
          color: #f0ede6;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 4px 12px;
          border-radius: 20px;
        }
        .edu-detail-grade .fas { color: #c9a84c; }

        /* ── Tablet (641px – 900px) ── */
        @media (max-width: 900px) {
          .edu-node { width: 155px; }
          .edu-building { width: 145px; height: 125px; }
          .edu-bubble { width: 140px; font-size: 0.68rem; }
          .edu-line-svg { height: 150px; }
        }

        /* ── Mobile (≤ 640px): stack vertically ── */
        @media (max-width: 640px) {
          .edu-scene {
            flex-direction: column;
            align-items: center;
            gap: 0;
          }
          /* On mobile show a vertical line between the two nodes */
          .edu-line-wrap {
            width: 2px;
            height: 80px;
            margin: 0;
            align-self: center;
            flex: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .edu-line-svg { display: none; }
          .edu-line-wrap::before {
            content: "";
            display: block;
            width: 2px;
            height: 80px;
            background: linear-gradient(to bottom, #c9a84c, #f0d080, #c9a84c);
            border-radius: 2px;
            animation: lineFlow 2s linear infinite;
          }
          @keyframes lineFlow {
            0%   { opacity: 0.4; }
            50%  { opacity: 1;   }
            100% { opacity: 0.4; }
          }
          .edu-node-left, .edu-node-right { margin: 0; width: 100%; max-width: 300px; }
          .edu-bubble { width: 200px; font-size: 0.73rem; }
          .edu-building { width: 200px; height: 160px; }
          .edu-cards-row { flex-direction: column; align-items: center; }
          .edu-detail-card { max-width: 100%; min-width: unset; width: 100%; }
        }
      `}</style>
    </section>
  );
}
/* ─── AWARDS ─────────────────────────────────────────────────── */
function Awards() {
  return (
    <section id="awards" className="section section-bg">
      <div className="section-eyebrow reveal">Recognition</div>
      <h2 className="section-title reveal">AWARDS</h2>
      <div className="awards-grid">
        {awards.map(a => (
          <div className={`award-card reveal ${a.featured ? "award-featured" : ""}`} key={a.title}>
            <div className="award-icon">{a.icon}</div>
            <div>
              <div className="award-title">{a.title}</div>
              <div className="award-org">{a.org}</div>
              {a.featured && <span className="award-badge">✦ Featured Award</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CERTIFICATIONS ─────────────────────────────────────────── */
function Certs() {
  return (
    <section id="certs" className="section section-bg2">
      <div className="section-eyebrow reveal">Credentials</div>
      <h2 className="section-title reveal">CERTIFICATIONS</h2>
      <div className="certs-grid">
        {certs.map(c => (
          <div className="cert-card reveal" key={c.name}>
            <div className="cert-icon">{c.icon}</div>
            <div><div className="cert-name">{c.name}</div><div className="cert-issuer">{c.issuer}</div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="section section-bg">
      <div className="section-eyebrow reveal">FAQ</div>
      <h2 className="section-title reveal">FREQUENTLY ASKED</h2>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <div className={`faq-item reveal ${open===i?"open":""}`} key={i}>
            <button className="faq-question" onClick={() => setOpen(open===i?null:i)}>
              {f.q}<span className="faq-q-icon"><i className="fas fa-plus" /></span>
            </button>
            <div className="faq-answer">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────── */
function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Muruganantham Ponnusamy",
      role: "Registrar",
      org: "IIT Dharwad",
      photo: "/mentor1.png",
      initials: "MP",
      color: "#7a6a3a",
      text: "Nesika is a dynamic, enthusiastic, and quick decision making thinker. A lot of scope in the quantum and cyber security domain for achievements.",
    },
    {
      name: "Dr. S. Manoharan",
      role: "Principal",
      org: "Nandha Arts & Science College",
      photo: "/mentor2.png",
      initials: "SM",
      color: "#4a5a6a",
      text: "NESIKA V is a talented girl at NASC, and she is performing well in her domain by having excellent academic skills.",
    },
    {
      name: "Dr. Gomathi Subramaniam",
      role: "Senior Faculty",
      org: "Nandha Arts & Science College",
      photo: "/mentor3.png",
      initials: "GS",
      color: "#8a4a2a",
      text: "She is an affectionate child and more attentive in classes. Smart girl. Other than studies, she do a lot to achieve her higher goals. I wish her all happiness and success may reach her… All the best my dear Nesika 🩷",
    },
  ];

  const linkedinUrl = "https://www.linkedin.com/in/nesika-v-ab9b87301/details/recommendations/";

  return (
    <section id="testimonials" className="section section-bg2 tm-section">

      {/* ── Header ── */}
      <div className="tm-header reveal">
        <div className="tm-avatars">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="tm-avatar-ring"
              style={{ zIndex: testimonials.length - i, marginLeft: i === 0 ? 0 : "-20px" }}
            >
              <img
                src={t.photo}
                alt={t.name}
                className="tm-avatar-img"
                onError={e => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="tm-avatar-fallback" style={{ background: t.color }}>
                {t.initials}
              </div>
            </div>
          ))}
        </div>
        <p className="tm-community-text">
          Be part of a community of <strong>100+</strong> learners
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="tm-cards reveal">
        {testimonials.map((t, i) => (
          <div className="tm-card" key={i}>

            {/* Quote + text block — grows to fill available space */}
            <div className="tm-body">
              <div className="tm-quote">"</div>
              <p className="tm-text">{t.text}</p>
            </div>

            {/* Button — fixed at bottom of body */}
            <div className="tm-btn-wrap">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tm-btn"
              >
                view more →
              </a>
            </div>

            {/* Author — always pinned to card bottom */}
            <div className="tm-author">
              <div className="tm-author-ring">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="tm-author-img"
                  onError={e => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
                <div className="tm-author-fallback" style={{ background: t.color }}>
                  {t.initials}
                </div>
              </div>
              <div className="tm-author-info">
                <div className="tm-author-name">{t.name}</div>
                <div className="tm-author-role">{t.role} · {t.org}</div>
              </div>
            </div>

          </div>
        ))}
      </div>

      <style>{`
        .tm-section { overflow: hidden; }

        /* ── Header ── */
        .tm-header {
          display: flex;
          align-items: center;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto 48px;
          padding: 0 20px;
          flex-wrap: wrap;
        }
        .tm-avatars {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .tm-avatar-ring {
          position: relative;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.12);
          overflow: hidden;
          background: #2a2a2a;
          box-shadow: 0 4px 18px rgba(0,0,0,0.6);
          flex-shrink: 0;
        }
        .tm-avatar-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .tm-avatar-fallback {
          display: none;
          width: 100%; height: 100%;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
        }
        .tm-community-text {
          font-size: 1.5rem;
          font-weight: 500;
          color: rgba(240,237,230,0.55);
          margin: 0;
          line-height: 1.4;
        }
        .tm-community-text strong {
          color: #f0ede6;
          font-weight: 900;
          font-size: 1.65rem;
        }

        /* ── Cards grid — stretch makes all rows equal height ── */
        .tm-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 1fr;        /* all cards same row height */
          align-items: stretch;
          gap: 26px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ── Card — full flex column so author always at bottom ── */
        .tm-card {
          display: flex;
          flex-direction: column;
          background: linear-gradient(150deg, #d4a832 0%, #b8891e 45%, #9a6e10 100%);
          border-radius: 26px;
          padding: 28px 26px 24px;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 25px 70px rgba(0,0,0,1),
            0 12px 30px rgba(0,0,0,1),
            0 4px 10px rgba(0,0,0,0.95);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          /* no fixed height — grid row handles equalization */
        }
        .tm-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 15% 10%, rgba(255,255,255,0.12) 0%, transparent 55%);
          border-radius: 26px;
          pointer-events: none;
        }
        .tm-card:hover {
          transform: translateY(-8px) scale(1.012);
          box-shadow:
            0 40px 90px rgba(0,0,0,1),
            0 20px 50px rgba(0,0,0,1),
            0 6px 14px rgba(0,0,0,0.95);
        }

        /* ── Body: quote + text — flex-grow fills remaining space ── */
        .tm-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* ── Big quote mark ── */
        .tm-quote {
          font-size: 5rem;
          line-height: 0.6;
          font-family: Georgia, serif;
          font-weight: 900;
          color: rgba(0,0,0,0.18);
          user-select: none;
          margin-bottom: 10px;
          flex-shrink: 0;
        }

        /* ── Review text — grows to fill card ── */
        .tm-text {
          font-size: 0.93rem;
          font-weight: 700;
          color: #0c0c0c;
          line-height: 1.7;
          text-align: center;
          flex: 1;
          margin: 0;
          /* ensures text never overflows card */
          overflow-wrap: break-word;
          word-break: break-word;
        }

        /* ── Button wrapper ── */
        .tm-btn-wrap {
          display: flex;
          justify-content: center;
          padding: 22px 0 18px;
          flex-shrink: 0;
        }
        .tm-btn {
          background: rgba(215,215,215,0.9);
          color: #111;
          font-size: 0.81rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 9px 24px;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 3px 12px rgba(0,0,0,0.35);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .tm-btn:hover {
          background: #fff;
          transform: translateX(4px);
          box-shadow: 0 5px 18px rgba(0,0,0,0.45);
        }

        /* ── Author — always at card bottom ── */
        .tm-author {
          display: flex;
          align-items: center;
          gap: 11px;
          border-top: 1px solid rgba(0,0,0,0.18);
          padding-top: 16px;
          flex-shrink: 0;
        }
        .tm-author-ring {
          width: 40px; height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(0,0,0,0.2);
          flex-shrink: 0;
          background: #7a6a3a;
        }
        .tm-author-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .tm-author-fallback {
          display: none;
          width: 100%; height: 100%;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 800;
          color: #fff;
        }
        .tm-author-info {
          flex: 1;
          min-width: 0;
        }
        .tm-author-name {
          font-size: 0.8rem;
          font-weight: 800;
          color: #0c0c0c;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .tm-author-role {
          font-size: 0.67rem;
          font-weight: 500;
          color: rgba(0,0,0,0.5);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* ── Tablet ── */
        @media (max-width: 860px) {
          .tm-cards {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 560px) {
          .tm-cards {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
            gap: 20px;
          }
          .tm-community-text { font-size: 1.1rem; }
          .tm-community-text strong { font-size: 1.25rem; }
          .tm-avatar-ring { width: 56px; height: 56px; }
          .tm-header { gap: 16px; }
        }
      `}</style>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-eyebrow reveal" style={{justifyContent:"center"}}>Let's Connect</div>
      <div className="contact-big reveal">LET'S BUILD<br /><span>TOGETHER.</span></div>
      <p className="contact-sub reveal">Open for freelance projects, internships and full-time opportunities. Let's create something remarkable.</p>
      <div className="contact-actions reveal">
        <a href="mailto:nesika247@gmail.com" className="btn-primary"><i className="fas fa-envelope" /> Send Email</a>
        <a href="https://www.linkedin.com/in/nesika-v-ab9b87301" className="btn-secondary"><i className="fab fa-linkedin-in" /> LinkedIn</a>
      </div>
      <div className="contact-info-row reveal">
        <div className="contact-info-item"><span className="contact-info-label">Email</span><span className="contact-info-val">nesika247@gmail.com</span></div>
        <div className="contact-info-item"><span className="contact-info-label">Phone</span><span className="contact-info-val">+91 7339660164</span></div>
        <div className="contact-info-item"><span className="contact-info-label">Location</span><span className="contact-info-val">Tirupur, Tamil Nadu</span></div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-copy">Created © 2025 — <span>Nesika V</span></div>
      <div className="footer-socials">
        <a href="mailto:nesika247@gmail.com"><i className="fas fa-envelope" /></a>
        <a href="https://www.linkedin.com/in/nesika-v-ab9b87301"><i className="fab fa-linkedin-in" /></a>
        <a href="https://github.com/"><i className="fab fa-github" /></a>
      </div>
    </footer>
  );
}

/* ─── APP ROOT ───────────────────────────────────────────────── */
export default function App() {
  useReveal();
  return (
    <>
      <GridBackground />
      <Nav />
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Projects />
      <div className="section-divider" />
      <Education />
      <div className="section-divider" />
      <Awards />
      <div className="section-divider" />
      <Certs />
      <div className="section-divider" />
      <FAQ />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </>
  );
}