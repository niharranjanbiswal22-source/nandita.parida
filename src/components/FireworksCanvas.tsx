import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  decay: number;
  size: number;
}

interface FireworksProps {
  active: boolean;
  onComplete?: () => void;
}

export const FireworksCanvas: React.FC<FireworksProps> = ({ active, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ['#f472b6', '#fbbf24', '#e879f9', '#38bdf8', '#4ade80', '#f43f5e', '#a78bfa'];
    let particles: Particle[] = [];

    const createBurst = (x: number, y: number) => {
      const count = Math.floor(Math.random() * 50) + 60;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 8 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          decay: Math.random() * 0.015 + 0.01,
          size: Math.random() * 3 + 2
        });
      }
    };

    // Trigger multiple bursts
    let burstsTriggered = 0;
    const interval = setInterval(() => {
      if (burstsTriggered > 12) {
        clearInterval(interval);
        return;
      }
      const bx = Math.random() * (width * 0.8) + width * 0.1;
      const by = Math.random() * (height * 0.5) + height * 0.1;
      createBurst(bx, by);
      burstsTriggered++;
    }, 250);

    const render = () => {
      ctx.fillStyle = 'rgba(7, 9, 19, 0.2)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (particles.length > 0 || burstsTriggered <= 12) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
      }
    };

    render();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
      if (ctx) ctx.clearRect(0, 0, width, height);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};
