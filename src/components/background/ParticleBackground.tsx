"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  sizeMax: number;
  color: string;
  phase: number;
  twinkle: number;
  squish: number;
  morph: number;
  spin: number;
  rot: number;
  swirl: number;
}

const REDS = ["#EA4335", "#D93025", "#C5221F", "#A50E0E", "#FF6D60", "#FF8A80", "#F28B82", "#B31412"];

/**
 * Full-viewport canvas background: soft red "cell" particles that spawn and
 * drift from the cursor's trail. Ported from the Claude Design prototype's
 * ag-bg component.
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, px: 0, py: 0, vx: 0, vy: 0, active: false, lastMove: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      if (mouse.x === null) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      mouse.px = mouse.x as number;
      mouse.py = mouse.y as number;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.px;
      mouse.vy = mouse.y - mouse.py;
      mouse.active = true;
      mouse.lastMove = performance.now();
    };
    const onLeave = () => {
      mouse.active = false;
    };

    const spawn = (count: number) => {
      const mspeed = Math.min(Math.hypot(mouse.vx, mouse.vy), 40);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const spread = 10 + Math.random() * 34;
        particles.push({
          x: (mouse.x ?? 0) + Math.cos(a) * spread * Math.random(),
          y: (mouse.y ?? 0) + Math.sin(a) * spread * Math.random(),
          vx: mouse.vx * (0.4 + Math.random() * 0.9) + Math.cos(a) * (0.4 + Math.random() * 1.6),
          vy: mouse.vy * (0.4 + Math.random() * 0.9) + Math.sin(a) * (0.4 + Math.random() * 1.6),
          life: 0,
          maxLife: 0.7 + Math.random() * 1.3,
          sizeMax: (0.7 + Math.random() * 1.9) * (0.8 + mspeed / 45),
          color: REDS[Math.floor(Math.random() * REDS.length)],
          phase: Math.random() * Math.PI * 2,
          twinkle: 2 + Math.random() * 4,
          squish: 0.08 + Math.random() * 0.18,
          morph: 1.5 + Math.random() * 5,
          spin: (Math.random() - 0.5) * 6,
          rot: Math.random() * Math.PI * 2,
          swirl: (Math.random() - 0.5) * 3.5,
        });
      }
      const cap = 900;
      if (particles.length > cap) particles = particles.slice(particles.length - cap);
    };

    let last = performance.now();
    let time = 0;
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;
      ctx.clearRect(0, 0, w, h);

      if (mouse.active && mouse.x !== null && now - mouse.lastMove < 120) {
        const mspeed = Math.hypot(mouse.vx, mouse.vy);
        const rate = 0.8 + mspeed * 0.18;
        spawn(Math.min(Math.round(rate), 7));
      }
      mouse.vx *= 0.85;
      mouse.vy *= 0.85;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        const t = p.life / p.maxLife;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }
        const ca = Math.cos(p.swirl * dt);
        const sa = Math.sin(p.swirl * dt);
        const nvx = p.vx * ca - p.vy * sa;
        p.vy = p.vx * sa + p.vy * ca;
        p.vx = nvx;
        p.vx += (Math.random() - 0.5) * 10 * dt;
        p.vy += (Math.random() - 0.5) * 10 * dt - 3 * dt;
        p.vx *= 1 - 1.4 * dt;
        p.vy *= 1 - 1.4 * dt;
        p.x += p.vx * 60 * dt * 0.35;
        p.y += p.vy * 60 * dt * 0.35;
        p.rot += p.spin * dt;

        const grow = t < 0.18 ? t / 0.18 : 1 - (t - 0.18) / 0.82;
        const mph = time * p.morph + p.phase;
        const rx = p.sizeMax * grow * (1 + Math.sin(mph) * p.squish);
        const ry = p.sizeMax * grow * (1 - Math.sin(mph) * p.squish);
        const alpha = Math.max(0, Math.min(1, grow * 1.4) * (0.4 + 0.3 * Math.sin(time * p.twinkle + p.phase)));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.max(rx, 0.3), Math.max(ry, 0.3), 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
