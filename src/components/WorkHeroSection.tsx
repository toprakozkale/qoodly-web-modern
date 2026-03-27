"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WorkHeroSection() {
  const t = useTranslations("work");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const ctx = gsap.context(() => {
      const chars = title.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.7)", delay: 0.3 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.0 }
      );

      gsap.fromTo(flowerRef.current, { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.8 });
      gsap.fromTo(starRef.current, { scale: 0, rotate: 180 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)", delay: 1.0 });
      gsap.fromTo(lightningRef.current, { scale: 0, x: -50 }, { scale: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 1.2 });

      gsap.to(flowerRef.current, { y: -80, rotate: 45, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(starRef.current, { y: -60, rotate: 90, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(lightningRef.current, { y: -100, rotate: -15, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
    }, section);

    return () => ctx.revert();
  }, []);

  const line1Chars = t("heroTitleLine1").split("");
  const line2Chars = t("heroTitleLine2").split("");

  return (
    <section ref={sectionRef} className="relative min-h-[70vh] flex flex-col justify-center pt-24 pb-20 px-6 md:px-12 overflow-hidden">
      {/* Decorative Flower */}
      <div ref={flowerRef} className="absolute top-[20%] right-[12%] w-24 h-24 animate-spin-slow" style={{ animationDuration: "20s" }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="workFlowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b9d" />
              <stop offset="50%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#9d4edd" />
            </linearGradient>
          </defs>
          <path d="M50 10 C60 30, 70 40, 90 50 C70 60, 60 70, 50 90 C40 70, 30 60, 10 50 C30 40, 40 30, 50 10" fill="url(#workFlowerGrad)" />
          <path d="M50 20 C55 35, 65 45, 80 50 C65 55, 55 65, 50 80 C45 65, 35 55, 20 50 C35 45, 45 35, 50 20" fill="#ff8c42" transform="rotate(45 50 50)" />
          <path d="M50 25 C53 38, 62 47, 75 50 C62 53, 53 62, 50 75 C47 62, 38 53, 25 50 C38 47, 47 38, 50 25" fill="#9d4edd" transform="rotate(90 50 50)" />
        </svg>
      </div>

      {/* Decorative Star */}
      <div ref={starRef} className="absolute top-[60%] right-[6%] w-10 h-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="workStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
          <path d="M50 5 L58 35 L90 35 L65 55 L75 85 L50 65 L25 85 L35 55 L10 35 L42 35 Z" fill="url(#workStarGrad)" />
        </svg>
      </div>

      {/* Decorative Lightning */}
      <div ref={lightningRef} className="absolute top-[50%] left-[70%] w-10 h-16">
        <svg viewBox="0 0 40 70" className="w-full h-full">
          <defs>
            <linearGradient id="workLightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#88ce02" />
              <stop offset="100%" stopColor="#00b4d8" />
            </linearGradient>
          </defs>
          <path d="M24 2 L8 38 L18 38 L12 68 L34 28 L22 28 Z" fill="url(#workLightningGrad)" />
        </svg>
      </div>

      {/* Top Label */}
      <p className="text-[#88ce02] text-sm font-medium tracking-widest uppercase mb-4 relative z-10">
        {t("heroLabel")}
      </p>

      {/* Main Title */}
      <div ref={titleRef} className="relative z-10 w-full" style={{ perspective: "1000px" }}>
        <h1 className="text-[8vw] md:text-[7vw] font-bold leading-[0.9] tracking-tight">
          <span className="block">
            {line1Chars.map((char, i) => (
              <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>{char}</span>
            ))}
          </span>
          <span className="block mt-1">
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg,#2ec4b6 0%,#ff7057 60%,#1565c0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {line2Chars.map((char, i) => (
                <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>{char}</span>
              ))}
            </span>
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <div ref={subtitleRef} className="relative z-10 mt-6">
        <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed">{t("heroSubtitle")}</p>
      </div>
    </section>
  );
}
