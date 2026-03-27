"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutHeroSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const ctx = gsap.context(() => {
      const chars = title.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.0 }
      );

      const statEls = section.querySelectorAll(".about-stat");
      gsap.fromTo(
        statEls,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 1.2,
        }
      );

      statEls.forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { scale: 1.03, duration: 0.3, ease: "back.out(1.7)" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { scale: 1, duration: 0.3, ease: "power3.out" });
        });
      });

      gsap.fromTo(
        flowerRef.current,
        { scale: 0, rotate: -180 },
        { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.8 }
      );
      gsap.fromTo(
        starRef.current,
        { scale: 0, rotate: 180 },
        { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)", delay: 1.0 }
      );
      gsap.fromTo(
        spiralRef.current,
        { scale: 0, y: 50 },
        { scale: 1, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)", delay: 1.4 }
      );

      gsap.to(flowerRef.current, {
        y: -80, rotate: 45,
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(starRef.current, {
        y: -60, rotate: 90,
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(spiralRef.current, {
        y: -50, rotate: 120,
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const line1Chars = t("heroTitleLine1").split("");
  const line2Chars = t("heroTitleLine2").split("");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Decorative Flower */}
      <div ref={flowerRef} className="absolute top-[20%] left-[62%] w-20 h-20 animate-spin-slow" style={{ animationDuration: "20s" }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="aboutFlowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b9d" />
              <stop offset="50%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#9d4edd" />
            </linearGradient>
          </defs>
          <path d="M50 10 C60 30, 70 40, 90 50 C70 60, 60 70, 50 90 C40 70, 30 60, 10 50 C30 40, 40 30, 50 10" fill="url(#aboutFlowerGrad)" />
          <path d="M50 20 C55 35, 65 45, 80 50 C65 55, 55 65, 50 80 C45 65, 35 55, 20 50 C35 45, 45 35, 50 20" fill="#ff8c42" transform="rotate(45 50 50)" />
          <path d="M50 25 C53 38, 62 47, 75 50 C62 53, 53 62, 50 75 C47 62, 38 53, 25 50 C38 47, 47 38, 50 25" fill="#9d4edd" transform="rotate(90 50 50)" />
        </svg>
      </div>

      {/* Decorative Star */}
      <div ref={starRef} className="absolute top-[15%] right-[8%] w-10 h-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="aboutStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
          <path d="M50 5 L58 35 L90 35 L65 55 L75 85 L50 65 L25 85 L35 55 L10 35 L42 35 Z" fill="url(#aboutStarGrad)" />
        </svg>
      </div>

      {/* Decorative Spiral */}
      <div ref={spiralRef} className="absolute bottom-[25%] right-[5%] w-12 h-20">
        <svg viewBox="0 0 60 100" className="w-full h-full">
          <defs>
            <linearGradient id="aboutSpiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9d4edd" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
          <path d="M30 5 Q45 15, 40 30 Q35 45, 25 50 Q15 55, 20 70 Q25 85, 35 90 Q45 95, 40 100" fill="none" stroke="url(#aboutSpiralGrad)" strokeWidth="12" strokeLinecap="round" />
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
            {line1Chars.map((char, i) =>
              char === " " ? (
                <span key={i} className="inline-block" style={{ width: "0.3em" }}>&nbsp;</span>
              ) : (
                <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
                  {char}
                </span>
              )
            )}
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
                <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
                  {char}
                </span>
              ))}
            </span>
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <div ref={subtitleRef} className="relative z-10 mt-6">
        <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed">
          {t("heroSubtitle")}
        </p>
      </div>

      {/* Stats Cards */}
      <div ref={statsRef} className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
        <div className="about-stat border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm text-center hover:border-white/20 transition-all cursor-default">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(136,206,2,0.2)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#88ce02" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-bold text-white text-3xl mt-2">{t("heroStat1Value")}</h3>
          <p className="text-white/60 text-sm mt-2">{t("heroStat1Label")}</p>
        </div>

        <div className="about-stat border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm text-center hover:border-white/20 transition-all cursor-default">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,112,87,0.2)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#ff7057" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-bold text-white text-3xl mt-2">{t("heroStat2Value")}</h3>
          <p className="text-white/60 text-sm mt-2">{t("heroStat2Label")}</p>
        </div>

        <div className="about-stat border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm text-center hover:border-white/20 transition-all cursor-default">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(46,196,182,0.2)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#2ec4b6" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-white text-3xl mt-2">{t("heroStat3Value")}</h3>
          <p className="text-white/60 text-sm mt-2">{t("heroStat3Label")}</p>
        </div>
      </div>
    </section>
  );
}
