"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutMissionSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

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

      const highlights = text.querySelectorAll(".highlight");
      gsap.fromTo(
        highlights,
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

      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const mainText = t("missionText");
  const highlightWords = t("missionHighlightWords").split(",");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 md:px-12"
    >
      {/* Label */}
      <div className="mb-12 flex items-start gap-2 self-start">
        <span className="text-white/60">{`{`}</span>
        <span className="text-sm text-white/60">{t("missionLabel")}</span>
        <span className="text-white/60">{`}`}</span>
      </div>

      {/* Main animated text */}
      <div
        ref={textRef}
        className="max-w-5xl text-center text-3xl md:text-5xl lg:text-6xl font-medium leading-tight"
      >
        {mainText.split(" ").map((word, i) => {
          // Unicode-aware clean: removes punctuation but keeps letters from all scripts
          const clean = word.replace(/[^\p{L}-]/gu, "");
          const isHighlight = highlightWords.includes(clean);
          return (
            <span
              key={i}
              className={`word inline-block mr-[0.3em] ${isHighlight ? "highlight" : ""}`}
            >
              {word}
            </span>
          );
        })}
      </div>
    </section>
  );
}
