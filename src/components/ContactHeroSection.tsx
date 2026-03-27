"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactHeroSection() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.7)", delay: 0.3 }
      );
      gsap.fromTo(
        line2Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "back.out(1.7)", delay: 0.7 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.0 }
      );

      const cards = section.querySelectorAll(".contact-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "back.out(1.7)", delay: 1.2 }
      );

      cards.forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.03, duration: 0.3, ease: "back.out(1.7)" }));
        el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, duration: 0.3, ease: "power3.out" }));
      });

      gsap.fromTo(flowerRef.current, { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.8 });
      gsap.fromTo(starRef.current, { scale: 0, rotate: 180 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)", delay: 1.0 });
      gsap.fromTo(spiralRef.current, { scale: 0, y: 50 }, { scale: 1, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)", delay: 1.4 });

      gsap.to(flowerRef.current, { y: -80, rotate: 45, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(starRef.current, { y: -60, rotate: 90, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(spiralRef.current, { y: -50, rotate: 120, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
    }, section);

    return () => ctx.revert();
  }, []);

  const line1Chars = t("heroTitleLine1").split("");

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6 md:px-12 overflow-hidden">
      {/* Decorative Flower */}
      <div ref={flowerRef} className="absolute top-[20%] left-[60%] w-20 h-20 animate-spin-slow" style={{ animationDuration: "20s" }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="contactFlowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b9d" />
              <stop offset="50%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#9d4edd" />
            </linearGradient>
          </defs>
          <path d="M50 10 C60 30, 70 40, 90 50 C70 60, 60 70, 50 90 C40 70, 30 60, 10 50 C30 40, 40 30, 50 10" fill="url(#contactFlowerGrad)" />
          <path d="M50 20 C55 35, 65 45, 80 50 C65 55, 55 65, 50 80 C45 65, 35 55, 20 50 C35 45, 45 35, 50 20" fill="#ff8c42" transform="rotate(45 50 50)" />
          <path d="M50 25 C53 38, 62 47, 75 50 C62 53, 53 62, 50 75 C47 62, 38 53, 25 50 C38 47, 47 38, 50 25" fill="#9d4edd" transform="rotate(90 50 50)" />
        </svg>
      </div>

      {/* Decorative Star */}
      <div ref={starRef} className="absolute top-[15%] right-[8%] w-10 h-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="contactStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
          <path d="M50 5 L58 35 L90 35 L65 55 L75 85 L50 65 L25 85 L35 55 L10 35 L42 35 Z" fill="url(#contactStarGrad)" />
        </svg>
      </div>

      {/* Decorative Spiral */}
      <div ref={spiralRef} className="absolute bottom-[25%] right-[5%] w-12 h-20">
        <svg viewBox="0 0 60 100" className="w-full h-full">
          <defs>
            <linearGradient id="contactSpiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9d4edd" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
          <path d="M30 5 Q45 15, 40 30 Q35 45, 25 50 Q15 55, 20 70 Q25 85, 35 90 Q45 95, 40 100" fill="none" stroke="url(#contactSpiralGrad)" strokeWidth="12" strokeLinecap="round" />
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
                <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>{char}</span>
              )
            )}
          </span>
          <span className="block mt-1">
            <span ref={line2Ref} className="inline-block">
              {t("heroTitleLine2")}
            </span>
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <div ref={subtitleRef} className="relative z-10 mt-6">
        <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed">{t("heroSubtitle")}</p>
      </div>

      {/* Contact Cards */}
      <div ref={cardsRef} className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
        {/* Card 1 — Phone / WhatsApp */}
        <div className="contact-card border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm text-center hover:border-white/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(136,206,2,0.2)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#88ce02" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="font-bold text-white text-lg mt-2">{t("heroCard1Title")}</h3>
          <p className="text-white/60 text-sm mt-2">+90 541 420 15 60</p>
        </div>

        {/* Card 2 — Email */}
        <div className="contact-card border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm text-center hover:border-white/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,112,87,0.2)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#ff7057" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-bold text-white text-lg mt-2">{t("heroCard2Title")}</h3>
          <p className="text-white/60 text-sm mt-2">info@qoodly.com</p>
        </div>

        {/* Card 3 — Social Media */}
        <div className="contact-card border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm text-center hover:border-white/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(46,196,182,0.2)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#2ec4b6" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <h3 className="font-bold text-white text-lg mt-2">{t("heroCard3Title")}</h3>
          <div className="flex justify-center gap-4 mt-3">
            <a href="https://instagram.com/qoodly" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://linkedin.com/company/qoodly" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
