"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WhyQoodlySection() {
  const t = useTranslations("whyQoodly");
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const ctx = gsap.context(() => {
      const words = text.querySelectorAll(".word");

      gsap.fromTo(
        words,
        { opacity: 0.2, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      const highlightGreen = text.querySelectorAll(".highlight-green");
      gsap.fromTo(
        highlightGreen,
        { color: "#f5f5f5" },
        {
          color: "#88ce02",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      const highlightOrange = text.querySelectorAll(".highlight-orange");
      gsap.fromTo(
        highlightOrange,
        { color: "#f5f5f5" },
        {
          color: "#ff8c42",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const mainText = t("mainText");
  const greenWords = t("greenWords").split(",");
  const orangeWords = t("orangeWords").split(",");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-12"
    >
      {/* Label */}
      <div className="absolute top-20 left-6 md:left-12 flex items-start gap-2">
        <span className="text-white/60">{`{`}</span>
        <span className="text-sm text-white/60">{t("label")}</span>
        <span className="text-white/60">{`}`}</span>
      </div>

      {/* Decorative Orbitals — normal flow'da, text'in üstünde yatay sıra */}
      <div className="flex items-center justify-between w-full max-w-5xl mb-10 pointer-events-none">
        <div className="w-16 h-16 md:w-20 md:h-20 opacity-80 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <defs>
              <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9d4edd" />
                <stop offset="100%" stopColor="#00b4d8" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#orbitGrad1)" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="50" cy="10" r="8" fill="#ff8c42" />
            <circle cx="90" cy="50" r="5" fill="#ff6b9d" />
            <circle cx="50" cy="90" r="6" fill="#88ce02" />
          </svg>
        </div>
        <div className="w-16 h-16 md:w-20 md:h-20 opacity-80 shrink-0" style={{ marginTop: "-150px" }}>
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" style={{ animationDuration: "18s" }}>
            <defs>
              <linearGradient id="orbitGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#88ce02" />
                <stop offset="100%" stopColor="#ff6b9d" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#orbitGrad2)" strokeWidth="2" strokeDasharray="4 6" />
            <circle cx="50" cy="10" r="6" fill="#00b4d8" />
            <circle cx="90" cy="50" r="7" fill="#88ce02" />
            <circle cx="10" cy="50" r="5" fill="#ff8c42" />
          </svg>
        </div>
        <div className="w-16 h-16 md:w-20 md:h-20 opacity-80 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" style={{ animationDuration: "22s" }}>
            <defs>
              <linearGradient id="orbitGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff8c42" />
                <stop offset="100%" stopColor="#9d4edd" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#orbitGrad3)" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="50" cy="10" r="5" fill="#9d4edd" />
            <circle cx="90" cy="50" r="8" fill="#ff8c42" />
            <circle cx="50" cy="90" r="6" fill="#00b4d8" />
          </svg>
        </div>
      </div>

      {/* Main Text */}
      <div
        ref={textRef}
        className="relative max-w-5xl text-center text-3xl md:text-5xl lg:text-6xl font-medium leading-tight"
      >
        {mainText.split(" ").map((word, i) => {
          // Unicode-aware clean: removes punctuation but keeps letters from all scripts
          const clean = word.replace(/[^\p{L}-]/gu, "");
          const cls = greenWords.includes(clean)
            ? "highlight-green"
            : orangeWords.includes(clean)
            ? "highlight-orange"
            : "";
          return (
            <span key={i} className={`word inline-block mr-[0.3em] ${cls}`}>
              {word}
            </span>
          );
        })}
      </div>
    </section>
  );
}
