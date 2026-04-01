"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CYCLE_WORDS = ["Qoodly", "Quality", "Goodly", "Qoodly"];

const Q_GRADIENT_STYLE =
  "background:linear-gradient(135deg,#2ec4b6 0%,#ff7057 60%,#1565c0 100%);" +
  "-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;";

function makeCharSpans(word: string): string {
  return word
    .split("")
    .map((c, i) => {
      const extra = i === 0 && word === "Qoodly" ? Q_GRADIENT_STYLE : "";
      return `<span class="char inline-block" style="transform-style:preserve-3d;${extra}">${c}</span>`;
    })
    .join("");
}

export function HeroSection() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const firstLineRef = useRef<HTMLSpanElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);
  const deco2Ref = useRef<HTMLDivElement>(null);
  const deco3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const ctx = gsap.context(() => {
      // Initial animation for title characters
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

      // Word cycling
      const firstLine = firstLineRef.current;
      if (firstLine) {
        const wordTl = gsap.timeline({ delay: 2 });

        CYCLE_WORDS.slice(1).forEach((word, i) => {
          wordTl.call(
            () => {
              gsap.to(firstLine.querySelectorAll(".char"), {
                y: -80,
                opacity: 0,
                rotateX: 90,
                stagger: 0.04,
                duration: 0.35,
                ease: "power2.in",
                onComplete: () => {
                  firstLine.innerHTML = makeCharSpans(word);
                  gsap.fromTo(
                    firstLine.querySelectorAll(".char"),
                    { y: 100, opacity: 0, rotateX: -90 },
                    {
                      y: 0,
                      opacity: 1,
                      rotateX: 0,
                      stagger: 0.05,
                      duration: 0.7,
                      ease: "back.out(1.7)",
                    }
                  );
                },
              });
            },
            [],
            i === 0 ? 0 : "+=1.6"
          );
        });
      }

      // Decorative elements animation
      gsap.fromTo(flowerRef.current, { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.8 });
      gsap.fromTo(starRef.current, { scale: 0, rotate: 180 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)", delay: 1 });
      gsap.fromTo(lightningRef.current, { scale: 0, x: -50 }, { scale: 1, x: 0, duration: 0.6, ease: "power3.out", delay: 1.2 });
      gsap.fromTo(spiralRef.current, { scale: 0, y: 50 }, { scale: 1, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)", delay: 1.4 });
      gsap.fromTo(deco2Ref.current, { scale: 0, rotate: -120 }, { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 1.1 });
      gsap.fromTo(deco3Ref.current, { scale: 0, rotate: 150 }, { scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.7)", delay: 1.3 });

      // Scroll-triggered parallax
      gsap.to(flowerRef.current, { y: -100, rotate: 45, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(starRef.current, { y: -80, rotate: 90, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(lightningRef.current, { y: -120, rotate: -15, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(spiralRef.current, { y: -60, rotate: 180, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(deco2Ref.current, { y: -90, rotate: -60, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(deco3Ref.current, { y: -70, rotate: 120, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(title, { y: -150, scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1 } });
    }, section);

    return () => ctx.revert();
  }, []);

  const softwareWord = t("softwareWord");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center pt-8 md:pt-24 pb-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Decorative Flower */}
      <div ref={flowerRef} className="absolute top-[22%] left-[12%] w-28 h-28 animate-spin-slow" style={{ animationDuration: "15s" }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="flowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b9d" />
              <stop offset="50%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#9d4edd" />
            </linearGradient>
          </defs>
          <path d="M50 10 C60 30, 70 40, 90 50 C70 60, 60 70, 50 90 C40 70, 30 60, 10 50 C30 40, 40 30, 50 10" fill="url(#flowerGrad)" />
          <path d="M50 20 C55 35, 65 45, 80 50 C65 55, 55 65, 50 80 C45 65, 35 55, 20 50 C35 45, 45 35, 50 20" fill="#ff8c42" transform="rotate(45 50 50)" />
          <path d="M50 25 C53 38, 62 47, 75 50 C62 53, 53 62, 50 75 C47 62, 38 53, 25 50 C38 47, 47 38, 50 25" fill="#9d4edd" transform="rotate(90 50 50)" />
        </svg>
      </div>

      {/* Decorative Star */}
      <div ref={starRef} className="absolute top-[18%] right-[8%] w-10 h-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8c42" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
          <path d="M50 5 L58 35 L90 35 L65 55 L75 85 L50 65 L25 85 L35 55 L10 35 L42 35 Z" fill="url(#starGrad)" />
        </svg>
      </div>

      {/* Decorative Lightning */}
      <div ref={lightningRef} className="absolute top-[52%] right-[22%] w-10 h-16">
        <svg viewBox="0 0 60 100" className="w-full h-full">
          <defs>
            <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#88ce02" />
              <stop offset="100%" stopColor="#00b4d8" />
            </linearGradient>
          </defs>
          <path d="M35 0 L15 45 L30 45 L20 100 L50 40 L35 40 L45 0 Z" fill="url(#lightningGrad)" />
        </svg>
      </div>

      {/* Decorative Spiral */}
      <div ref={spiralRef} className="absolute top-[55%] right-[6%] w-14 h-20">
        <svg viewBox="0 0 60 100" className="w-full h-full">
          <defs>
            <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9d4edd" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
          <path d="M30 5 Q45 15, 40 30 Q35 45, 25 50 Q15 55, 20 70 Q25 85, 35 90 Q45 95, 40 100" fill="none" stroke="url(#spiralGrad)" strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>

      {/* Deco 2 */}
      <div ref={deco2Ref} className="absolute top-[28%] left-[52%] w-[7.5rem] h-[7.5rem] animate-spin-slow" style={{ animationDuration: "12s" }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="deco2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00b4d8" />
              <stop offset="50%" stopColor="#88ce02" />
              <stop offset="100%" stopColor="#9d4edd" />
            </linearGradient>
          </defs>
          <path d="M50 10 C60 30, 70 40, 90 50 C70 60, 60 70, 50 90 C40 70, 30 60, 10 50 C30 40, 40 30, 50 10" fill="url(#deco2Grad)" />
          <path d="M50 20 C55 35, 65 45, 80 50 C65 55, 55 65, 50 80 C45 65, 35 55, 20 50 C35 45, 45 35, 50 20" fill="#00b4d8" transform="rotate(45 50 50)" />
        </svg>
      </div>

      {/* Deco 3 */}
      <div ref={deco3Ref} className="absolute top-[18%] left-[71%] w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="deco3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#88ce02" />
              <stop offset="100%" stopColor="#ff8c42" />
            </linearGradient>
          </defs>
          <path d="M50 5 L58 35 L90 35 L65 55 L75 85 L50 65 L25 85 L35 55 L10 35 L42 35 Z" fill="url(#deco3Grad)" />
        </svg>
      </div>

      {/* Main Title */}
      <div ref={titleRef} className="relative z-10 w-full" style={{ perspective: "1000px" }}>
        {/* sr-only: AI botları ve ekran okuyucular için statik, okunabilir başlık */}
        <span className="sr-only">Qoodly {softwareWord}</span>
        <h1 aria-hidden="true" className="text-[15vw] font-bold leading-[0.85] tracking-tight">
          <span ref={firstLineRef} className="block">
            {"Qoodly".split("").map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={
                  i === 0
                    ? {
                        transformStyle: "preserve-3d",
                        background: "linear-gradient(135deg, #2ec4b6 0%, #ff7057 60%, #1565c0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : { transformStyle: "preserve-3d" }
                }
              >
                {char}
              </span>
            ))}
          </span>
          <span className="block mt-1 pl-[15vw]">
            {softwareWord.split("").map((char, i) => (
              <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
                {char}
              </span>
            ))}
          </span>
        </h1>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-20 md:bottom-20 left-0 right-0 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        {/* Description */}
        <div className="flex items-start gap-4 max-w-sm">
          <span className="text-4xl text-white/60">{`{`}</span>
          <p className="text-sm text-white/80 leading-relaxed">{t("description")}</p>
          <span className="text-4xl text-white/60">{`}`}</span>
        </div>

        {/* CTA Button */}
        <a
          href="#get-started"
          className="group flex items-center gap-3 px-6 py-3 border border-[#88ce02] rounded-full text-white hover:bg-[#88ce02]/10 transition-all"
        >
          <span className="text-sm font-medium">{t("cta")}</span>
          <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-7-7m7 7l7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
