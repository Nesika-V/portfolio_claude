import { useEffect, useRef } from "react";

/**
 * ParticleBackground — Drop-in animated canvas background for Nesika's portfolio.
 *
 * USAGE:  Import and place it once at the top of App.jsx, inside the root fragment:
 *
 *   import ParticleBackground from "./ParticleBackground";
 *
 *   return (
 *     <>
 *       <ParticleBackground />
 *       <nav>…</nav>
 *       …
 *     </>
 *   );
 *
 * The canvas is position:fixed so it tiles behind every section automatically.
 * No props required — it just works.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let   animId;
    let   W, H;
    const mouse = { x: -9999, y: -9999 };

    /* ── CONFIG ─────────────────────────────────────────────────── */
    const CFG = {
      // Matching portfolio palette:
      //   gold  #d4af37  → rgb(212,175,55)
      //   violet #7b6ef6 → rgb(123,110,246)
      //   rose  #e879a0  → rgb(232,121,160)
      //   teal  #06b6d4  → rgb(6,182,212)
      bg:            "#07070f",   // deep space dark — match your CSS background
      particleCount: 110,
      speed:         0.35,
      maxDist:       150,
      mouseRepel:    160,
      layers: [
        { r:212, g:175, b:55,  share:0.28 },  // gold
        { r:123, g:110, b:246, share:0.36 },  // violet (brand purple)
        { r:232, g:121, b:160, share:0.20 },  // rose-pink
        { r:6,   g:182, b:212, share:0.16 },  // teal accent
      ],
      // Orbs: slow-drifting glowing blobs that add aurora depth
      orbCount: 5,
      orbColors: [
        "rgba(212,175,55,0.055)",
        "rgba(123,110,246,0.07)",
        "rgba(232,121,160,0.055)",
        "rgba(6,182,212,0.045)",
        "rgba(212,175,55,0.04)",
      ],
    };

    /* ── RESIZE ─────────────────────────────────────────────────── */
    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    /* ── MOUSE ──────────────────────────────────────────────────── */
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave= ()  => { mouse.x = -9999;      mouse.y = -9999;    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    /* ── PICK COLOUR PER LAYER PROBABILITY ─────────────────────── */
    function pickLayer() {
      let r = Math.random(), cum = 0;
      for (const l of CFG.layers) { cum += l.share; if (r < cum) return l; }
      return CFG.layers[0];
    }

    /* ── PARTICLE ────────────────────────────────────────────────── */
    class Particle {
      constructor() { this.init(true); }
      init(scatter = false) {
        this.x    = Math.random() * (W || window.innerWidth);
        this.y    = scatter ? Math.random() * (H || window.innerHeight)
                            : (Math.random() < 0.5 ? -12 : (H || window.innerHeight) + 12);
        const spd = (Math.random() * 0.6 + 0.15) * CFG.speed;
        const ang = Math.random() * Math.PI * 2;
        this.vx   = Math.cos(ang) * spd;
        this.vy   = Math.sin(ang) * spd;
        const L   = pickLayer();
        this.r    = L.r; this.g = L.g; this.b = L.b;
        this.a    = Math.random() * 0.55 + 0.25;
        this.size = Math.random() * 1.8 + 0.8;
        // twinkle
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }
      update(t) {
        // mouse repulsion
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const dist2 = dx*dx + dy*dy;
        if (dist2 < CFG.mouseRepel * CFG.mouseRepel) {
          const dist  = Math.sqrt(dist2) || 1;
          const force = (CFG.mouseRepel - dist) / CFG.mouseRepel;
          this.x += (dx / dist) * force * 3;
          this.y += (dy / dist) * force * 3;
        }
        this.x += this.vx;
        this.y += this.vy;
        // soft wrap
        if (this.x < -20) this.x = W + 20;
        if (this.x > W+20) this.x = -20;
        if (this.y < -20) this.y = H + 20;
        if (this.y > H+20) this.y = -20;
        // twinkle alpha
        this.a = 0.3 + 0.3 * Math.sin(t * this.twinkleSpeed + this.twinklePhase);
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`;
        ctx.fill();
      }
    }

    /* ── AURORA ORB ──────────────────────────────────────────────── */
    class AuroraOrb {
      constructor(i) {
        this.color = CFG.orbColors[i % CFG.orbColors.length];
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.r = 180 + Math.random() * 260;
        const spd = 0.18 + Math.random() * 0.15;
        const ang = Math.random() * Math.PI * 2;
        this.vx = Math.cos(ang) * spd;
        this.vy = Math.sin(ang) * spd;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.r) this.x = (W||window.innerWidth)  + this.r;
        if (this.x > (W||window.innerWidth)  + this.r) this.x = -this.r;
        if (this.y < -this.r) this.y = (H||window.innerHeight) + this.r;
        if (this.y > (H||window.innerHeight) + this.r) this.y = -this.r;
      }
      draw() {
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grad.addColorStop(0,   this.color);
        grad.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ── INIT OBJECTS ────────────────────────────────────────────── */
    let particles = Array.from({ length: CFG.particleCount }, () => new Particle());
    let orbs      = Array.from({ length: CFG.orbCount },      (_, i) => new AuroraOrb(i));

    /* ── DRAW LINES ──────────────────────────────────────────────── */
    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d >= CFG.maxDist) continue;
          const t = 1 - d / CFG.maxDist;
          // Blend the two endpoint colours for the line
          const R = Math.round((a.r + b.r) / 2);
          const G = Math.round((a.g + b.g) / 2);
          const B = Math.round((a.b + b.b) / 2);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${R},${G},${B},${t * 0.35})`;
          ctx.lineWidth   = t * 1.1;
          ctx.stroke();
        }
      }
    }

    /* ── ANIMATION LOOP ──────────────────────────────────────────── */
    let t = 0;
    function loop() {
      t++;
      // Background
      ctx.fillStyle = CFG.bg;
      ctx.fillRect(0, 0, W, H);

      // Aurora orbs first (deepest layer)
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      orbs.forEach(o => { o.update(); o.draw(); });
      ctx.restore();

      // Connecting lines
      drawLines();

      // Particles on top
      particles.forEach(p => { p.update(t); p.draw(); });

      animId = requestAnimationFrame(loop);
    }
    loop();

    /* ── CLEANUP ─────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:   "fixed",
        top:        0,
        left:       0,
        width:      "100%",
        height:     "100%",
        zIndex:     0,
        pointerEvents: "none",
        display:    "block",
      }}
    />
  );
}