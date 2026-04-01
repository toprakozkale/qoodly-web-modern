"use client";

import { useEffect, useRef } from "react";

const STAR_COUNT = 320;

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      baseOpacity: number;
      delta: number;
      speed: number;
    }

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() < 0.6 ? 1 : Math.random() < 0.7 ? 2 : 3,
      opacity: Math.random(),
      baseOpacity: 0.15 + Math.random() * 0.45,
      delta: Math.random() > 0.5 ? 1 : -1,
      speed: 0.003 + Math.random() * 0.007,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        star.opacity += star.delta * star.speed;
        if (star.opacity >= star.baseOpacity) { star.opacity = star.baseOpacity; star.delta = -1; }
        if (star.opacity <= star.baseOpacity * 0.2) { star.opacity = star.baseOpacity * 0.2; star.delta = 1; }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      aria-hidden="true"
    />
  );
}
