"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tagColors = [
  { bg: "rgba(255,255,255,0.2)", textClass: "text-white" },
  { bg: "#88ce02", textClass: "text-black" },
  { bg: "rgba(255,107,157,0.8)", textClass: "text-white" },
];

const valueData = [
  { emoji: "🚀", iconBg: "bg-[#88ce02]", titleKey: "value1Title" as const, descKey: "value1Description" as const },
  { emoji: "🤝", iconBg: "bg-[#00b4d8]", titleKey: "value2Title" as const, descKey: "value2Description" as const },
  { emoji: "⚡", iconBg: "bg-[#9d4edd]", titleKey: "value3Title" as const, descKey: "value3Description" as const },
  { emoji: "🔒", iconBg: "bg-[#ff8c42]", titleKey: "value4Title" as const, descKey: "value4Description" as const },
];

export function AboutValuesSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);

  const tagWords = t("valuesTags").split(",");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tagEls = section.querySelectorAll(".feature-tag");
      tagEls.forEach((tag) => {
        gsap.fromTo(
          tag,
          { x: -100, opacity: 0, rotate: -10 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: tag,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const textBlocks = section.querySelectorAll(".text-block");
      textBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const elements3D = section.querySelectorAll(".element-3d");
      elements3D.forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0, rotateY: -90 },
          {
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            delay: i * 0.2,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const bezierPaths = section.querySelectorAll(".bezier-path");
      bezierPaths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength?.() || 100;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: path,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-6 md:px-12">
      {/* Tags */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tagWords.map((word, idx) => (
          <div
            key={idx}
            className={`feature-tag px-6 py-3 rounded-lg font-medium text-lg ${tagColors[idx % tagColors.length].textClass}`}
            style={{ backgroundColor: tagColors[idx % tagColors.length].bg }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Intro text block */}
      <p className="text-block text-2xl md:text-4xl text-white/80 leading-relaxed max-w-4xl">
        {t("valuesIntro")}
      </p>

      {/* Value cards grid */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {valueData.map((value) => (
          <div
            key={value.titleKey}
            className="element-3d border border-white/10 rounded-2xl p-6 bg-white/5"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${value.iconBg}`}>
              <span className="text-lg">{value.emoji}</span>
            </div>
            <h4 className="text-lg font-bold text-white mt-4">{t(value.titleKey)}</h4>
            <p className="text-sm text-white/60 mt-2">{t(value.descKey)}</p>
          </div>
        ))}
      </div>

      {/* Bezier SVG drawing */}
      <div className="relative h-48 mt-16">
        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid meet">
          <path className="bezier-path" d="M20 80 C60 80, 60 20, 100 20 C140 20, 140 80, 180 80" fill="none" stroke="#88ce02" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="20" cy="80" r="4" fill="#88ce02" />
          <circle cx="100" cy="20" r="4" fill="#88ce02" />
          <circle cx="180" cy="80" r="4" fill="#88ce02" />
          <path className="bezier-path" d="M220 50 Q260 10, 300 50 T380 50" fill="none" stroke="#00b4d8" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="220" cy="50" r="4" fill="#00b4d8" />
          <circle cx="300" cy="50" r="4" fill="#00b4d8" />
          <circle cx="380" cy="50" r="4" fill="#00b4d8" />
        </svg>
      </div>
    </section>
  );
}
