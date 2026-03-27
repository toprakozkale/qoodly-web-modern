"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const STAR_COUNT = 320;

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  baseOpacity: number;
}

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() < 0.6 ? 1 : Math.random() < 0.7 ? 2 : 3,
    delay: Math.random() * 6,
    duration: 1.5 + Math.random() * 3,
    baseOpacity: 0.15 + Math.random() * 0.45,
  }));
}

export function StarfieldBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Lazy initializer runs only on client; returns [] during SSR to avoid hydration mismatch
  const [stars] = useState<Star[]>(() =>
    typeof window !== "undefined" ? generateStars() : []
  );

  useEffect(() => {
    if (!stars.length) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const starEls = container.querySelectorAll<HTMLElement>(".star");

      starEls.forEach((star, i) => {
        const data = stars[i];
        if (!data) return;

        gsap.set(star, { opacity: data.baseOpacity * 0.3 });

        gsap.to(star, {
          opacity: data.baseOpacity,
          duration: data.duration,
          delay: data.delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        if (data.size === 3) {
          gsap.to(star, {
            scale: 1.8,
            opacity: 1,
            duration: 0.2,
            delay: data.delay + data.duration,
            ease: "power2.out",
            yoyo: true,
            repeat: -1,
            repeatDelay: data.duration * 2 + Math.random() * 4,
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, [stars]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="star absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
}
