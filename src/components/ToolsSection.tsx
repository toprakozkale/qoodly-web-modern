"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const toolShapes = [
  {
    id: "scroll",
    color: "#ff6b9d",
    gradient: "from-[#00b4d8] to-[#ff6b9d]",
    link: "https://www.linkedin.com/in/toprakozkale/",
    shape: (
      <svg viewBox="0 0 100 120" className="w-full h-full">
        <defs>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00b4d8" />
            <stop offset="100%" stopColor="#ff6b9d" />
          </linearGradient>
        </defs>
        <path
          d="M50 10 C70 10, 85 25, 85 45 L85 75 C85 95, 70 110, 50 110 C30 110, 15 95, 15 75 L15 45 C15 25, 30 10, 50 10"
          fill="url(#scrollGrad)"
        />
        <text
          x="50"
          y="75"
          textAnchor="middle"
          fill="#0a0a0a"
          fontSize="50"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
        >
          1
        </text>
      </svg>
    ),
  },
  {
    id: "svg",
    color: "#ff8c42",
    gradient: "from-[#ff8c42] to-[#ff6b9d]",
    link: "https://www.linkedin.com/in/eren-%C3%B6z-93aa94317/",
    shape: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="svgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8c42" />
            <stop offset="100%" stopColor="#ff6b9d" />
          </linearGradient>
        </defs>
        <path d="M10 10 L90 10 L90 90 L50 60 L10 90 Z" fill="url(#svgGrad)" />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fill="#0a0a0a"
          fontSize="45"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
        >
          2
        </text>
      </svg>
    ),
  },
  {
    id: "text",
    color: "#9d4edd",
    gradient: "from-[#9d4edd] to-[#00b4d8]",
    link: "https://www.linkedin.com/in/furkan-bozda%C5%9F-915576177/",
    shape: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9d4edd" />
            <stop offset="100%" stopColor="#00b4d8" />
          </linearGradient>
        </defs>
        <circle cx="54" cy="54" r="40" fill="#000" opacity="0.2" />
        <circle cx="50" cy="50" r="40" fill="url(#textGrad)" />
        <rect
          x="15"
          y="15"
          width="25"
          height="25"
          fill="url(#textGrad)"
          opacity="0.4"
          transform="rotate(15 27.5 27.5)"
        />
        <rect
          x="60"
          y="60"
          width="30"
          height="30"
          fill="url(#textGrad)"
          opacity="0.3"
          transform="rotate(-20 75 75)"
        />
        <circle cx="20" cy="80" r="6" fill="url(#textGrad)" opacity="0.5" />
        <circle cx="85" cy="25" r="4" fill="url(#textGrad)" opacity="0.6" />
        <text
          x="50"
          y="70"
          textAnchor="middle"
          fill="#0a0a0a"
          fontSize="52"
          fontWeight="900"
          fontFamily="'Inter', 'Arial', sans-serif"
        >
          3
        </text>
      </svg>
    ),
  },
  {
    id: "ui",
    color: "#c084fc",
    gradient: "from-[#c084fc] to-[#818cf8]",
    link: "https://www.linkedin.com/in/şevval-neva-durmuş-815664329/",
    shape: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="uiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00b4d8" />
            <stop offset="100%" stopColor="#88ce02" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#uiGrad)" opacity="0.8" />
        <circle cx="30" cy="40" r="12" fill="#fff" opacity="0.3" />
        <circle cx="70" cy="40" r="12" fill="#fff" opacity="0.3" />
        <circle cx="50" cy="62" r="12" fill="#fff" opacity="0.3" />
        <text
          x="50"
          y="70"
          textAnchor="middle"
          fill="#0a0a0a"
          fontSize="52"
          fontWeight="900"
          fontFamily="'Inter', 'Arial', sans-serif"
        >
          4
        </text>
      </svg>
    ),
  },
  {
    id: "together",
    color: "#00b4d8",
    gradient: "from-[#00b4d8] to-[#88ce02]",
    link: undefined,
    shape: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="togetherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="35" height="35" fill="url(#togetherGrad)" opacity="0.8" />
        <rect x="55" y="10" width="35" height="35" fill="url(#togetherGrad)" opacity="0.6" />
        <rect x="10" y="55" width="35" height="35" fill="url(#togetherGrad)" opacity="0.6" />
        <rect x="55" y="55" width="35" height="35" fill="url(#togetherGrad)" opacity="0.8" />
      </svg>
    ),
  },
];

export function ToolsSection() {
  const t = useTranslations("tools");
  const sectionRef = useRef<HTMLElement>(null);

  const tools = [
    { ...toolShapes[0], title: t("tool1Title"), description: t("tool1Description"), cta: t("seeMore") },
    { ...toolShapes[1], title: t("tool2Title"), description: t("tool2Description"), cta: t("seeMore") },
    { ...toolShapes[2], title: t("tool3Title"), description: t("tool3Description"), cta: t("seeMore") },
    { ...toolShapes[3], title: t("tool4Title"), description: t("tool4Description"), cta: t("seeMore") },
    { ...toolShapes[4], title: t("tool5Title"), description: t("tool5Description"), cta: "" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const toolItems = section.querySelectorAll(".tool-item");

      toolItems.forEach((item) => {
        const shape = item.querySelector(".tool-shape");
        const content = item.querySelector(".tool-content");

        gsap.fromTo(
          shape,
          { x: -100, opacity: 0, rotate: -30 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          content,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 md:px-12" id="tools">
      {/* Label */}
      <div className="flex items-start gap-2 mb-16">
        <span className="text-white/60">{`{`}</span>
        <span className="text-sm text-white/60">{t("label")}</span>
        <span className="text-white/60">{`}`}</span>
      </div>

      {/* Tools Grid */}
      <div className="space-y-24">
        {tools.map((tool, index) => (
          <div
            key={tool.id}
            className={`tool-item grid md:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Shape */}
            <div
              className={`tool-shape w-48 h-48 md:w-64 md:h-64 mx-auto ${
                index % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              {tool.shape}
            </div>

            {/* Content */}
            <div className={`tool-content ${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
              <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: tool.color }}>
                {tool.title}
              </h3>
              <p className="text-xl text-white/80 mb-6">{tool.description}</p>
              {tool.cta && (
                <a
                  href={tool.link || `#${tool.id}`}
                  target={tool.link ? "_blank" : undefined}
                  rel={tool.link ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors"
                >
                  {tool.link && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  <span className="text-sm">{tool.cta}</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
