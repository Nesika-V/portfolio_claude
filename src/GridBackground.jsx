import { useEffect, useRef } from "react";

/* ─── CURSOR-REACTIVE MOVING GRID BACKGROUND ─────────────────── */
/* Drop-in replacement for your GridBackground component.
   The grid drifts slowly on its own, and when you move the cursor:
   - Lines warp/bulge toward the cursor (magnetic pull)
   - A glowing radial spotlight follows the cursor
   - Intersection dots near the cursor pulse brighter & larger
   - Grid cells distort with a wave ripple around the cursor       */

export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, animId;

    // Drifting offset
    let offsetX = 0, offsetY = 0;
    const SPEED_X = 0.18;
    const SPEED_Y = 0.12;
    const CELL = 72;

    // Cursor tracking — start off-screen so no initial warp
    let mouseX = -9999, mouseY = -9999;
    let targetMouseX = -9999, targetMouseY = -9999;

    // Smooth mouse lerp
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Warp a point based on cursor proximity
    const warpPoint = (px, py) => {
      const dx = px - mouseX;
      const dy = py - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 180;  // influence radius in px
      const strength = 28; // max warp in px

      if (dist < radius && mouseX > 0) {
        const factor = (1 - dist / radius);
        const smooth = factor * factor * (3 - 2 * factor); // smoothstep
        const warpAmount = smooth * strength;
        return {
          x: px - (dx / dist) * warpAmount,
          y: py - (dy / dist) * warpAmount,
        };
      }
      return { x: px, y: py };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Smooth cursor follow
      mouseX = lerp(mouseX, targetMouseX, 0.08);
      mouseY = lerp(mouseY, targetMouseY, 0.08);

      // Drift offset
      offsetX = (offsetX + SPEED_X) % CELL;
      offsetY = (offsetY + SPEED_Y) % CELL;

      // ── Build grid point arrays ──
      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;

      // Precompute all warped grid points
      const pts = [];
      for (let r = 0; r <= rows; r++) {
        pts[r] = [];
        for (let c = 0; c <= cols; c++) {
          const rawX = -CELL + c * CELL + offsetX;
          const rawY = -CELL + r * CELL + offsetY;
          pts[r][c] = warpPoint(rawX, rawY);
        }
      }

      // ── Draw horizontal lines (warped) ──
      for (let r = 0; r <= rows; r++) {
        const rowY = -CELL + r * CELL + offsetY;
        const distFromCursor = Math.abs(rowY - mouseY);
        const alpha = mouseX > 0 && distFromCursor < 200
          ? 0.10 + 0.12 * (1 - distFromCursor / 200)
          : 0.10;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(212,168,83,${alpha.toFixed(3)})`;
        ctx.lineWidth = mouseX > 0 && distFromCursor < 200
          ? 0.8 + 0.6 * (1 - distFromCursor / 200)
          : 0.8;

        for (let c = 0; c <= cols; c++) {
          const p = pts[r][c];
          c === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // ── Draw vertical lines (warped) ──
      for (let c = 0; c <= cols; c++) {
        const colX = -CELL + c * CELL + offsetX;
        const distFromCursor = Math.abs(colX - mouseX);
        const alpha = mouseX > 0 && distFromCursor < 200
          ? 0.10 + 0.12 * (1 - distFromCursor / 200)
          : 0.10;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(212,168,83,${alpha.toFixed(3)})`;
        ctx.lineWidth = mouseX > 0 && distFromCursor < 200
          ? 0.8 + 0.6 * (1 - distFromCursor / 200)
          : 0.8;

        for (let r = 0; r <= rows; r++) {
          const p = pts[r][c];
          r === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // ── Draw intersection dots (warped, proximity-reactive) ──
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const p = pts[r][c];
          const rawX = -CELL + c * CELL + offsetX;
          const rawY = -CELL + r * CELL + offsetY;
          const dx = rawX - mouseX;
          const dy = rawY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const dotRadius = 180;

          let radius = 1.5;
          let alpha  = 0.22;

          if (mouseX > 0 && dist < dotRadius) {
            const factor = (1 - dist / dotRadius);
            const smooth = factor * factor * (3 - 2 * factor);
            radius = 1.5 + smooth * 4.5;  // up to 6px radius near cursor
            alpha  = 0.22 + smooth * 0.65; // up to ~0.87 opacity
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(212,168,83,${alpha.toFixed(3)})`;
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Cursor spotlight glow ──
      if (mouseX > 0) {
        // Inner hot glow
        const hot = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
        hot.addColorStop(0,   "rgba(212,168,83,0.12)");
        hot.addColorStop(0.4, "rgba(212,168,83,0.05)");
        hot.addColorStop(1,   "rgba(0,0,0,0.00)");
        ctx.fillStyle = hot;
        ctx.fillRect(0, 0, W, H);

        // Outer ambient glow
        const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 380);
        glow.addColorStop(0,   "rgba(212,168,83,0.05)");
        glow.addColorStop(0.5, "rgba(212,168,83,0.015)");
        glow.addColorStop(1,   "rgba(0,0,0,0.00)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Subtle permanent center radial (depth) ──
      const center = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.6);
      center.addColorStop(0,   "rgba(212,168,83,0.03)");
      center.addColorStop(0.5, "rgba(212,168,83,0.008)");
      center.addColorStop(1,   "rgba(0,0,0,0.00)");
      ctx.fillStyle = center;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="grid-canvas"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}