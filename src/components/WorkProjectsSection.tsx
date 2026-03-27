"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WorkProjectsSection() {
  const t = useTranslations("work");
  const sectionRef = useRef<HTMLElement>(null);

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

      gsap.fromTo(
        ".project-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".cta-strip",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-strip",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-20 px-6 md:px-12">
      {/* Top Tags */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="feature-tag bg-white/10 text-white rounded-lg px-5 py-2.5 font-medium">
          {t("projectsTag1")}
        </div>
        <div className="feature-tag bg-[#88ce02] text-black rounded-lg px-5 py-2.5 font-medium">
          {t("projectsTag2")}
        </div>
        <div
          className="feature-tag text-white rounded-lg px-5 py-2.5 font-medium"
          style={{ background: "rgba(157,78,221,0.8)" }}
        >
          {t("projectsTag3")}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

        {/* Project 1 — Weekweeky */}
        <div className="project-card border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all group">
          <div className="h-56 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ww-logo.png" alt="Weekweeky" className="w-32 h-32 object-contain rounded-xl" />
          </div>
          <div className="p-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-black bg-[#88ce02] mb-3">
              {t("project1Badge")}
            </span>
            <h3 className="text-xl font-bold text-white mb-2">{t("project1Title")}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{t("project1Description")}</p>
            <a href="#" className="inline-flex items-center gap-2 text-[#88ce02] text-sm font-medium group-hover:gap-3 transition-all">
              {t("project1Cta")}
            </a>
          </div>
        </div>

        {/* Project 2 — GFS Corporate CMS */}
        <div className="project-card border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all group">
          <div className="h-56 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1a0a0a 0%,#2d1515 50%,#1a0a0a 100%)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gfs-global.png" alt="GFS Global Engineering" className="w-32 h-32 object-contain rounded-xl" />
          </div>
          <div className="p-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 text-[#2980B9]" style={{ background: "rgba(41,128,185,0.2)" }}>
              {t("project2Badge")}
            </span>
            <h3 className="text-xl font-bold text-white mb-2">{t("project2Title")}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{t("project2Description")}</p>
            <a href="#" className="inline-flex items-center gap-2 text-[#2ec4b6] text-sm font-medium group-hover:gap-3 transition-all">
              {t("project2Cta")}
            </a>
          </div>
        </div>

        {/* Project 3 — E-Commerce AI */}
        <div className="project-card border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all group">
          <div className="h-56 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#020b18 0%,#041428 50%,#020b18 100%)" }}>
            <svg viewBox="0 0 300 200" className="w-full h-full">
              <line x1="0" y1="30" x2="300" y2="30" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="0" y1="90" x2="300" y2="90" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="0" y1="120" x2="300" y2="120" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="0" y1="150" x2="300" y2="150" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="0" y1="180" x2="300" y2="180" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="30" y1="0" x2="30" y2="200" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="60" y1="0" x2="60" y2="200" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="90" y1="0" x2="90" y2="200" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="120" y1="0" x2="120" y2="200" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="150" y1="0" x2="150" y2="200" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="180" y1="0" x2="180" y2="200" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="210" y1="0" x2="210" y2="200" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="240" y1="0" x2="240" y2="200" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="270" y1="0" x2="270" y2="200" stroke="#0a4a6e" strokeWidth="0.5" opacity="0.3" />
              <line x1="150" y1="100" x2="80" y2="60" stroke="#00BCD4" strokeWidth="1" opacity="0.4" />
              <line x1="150" y1="100" x2="220" y2="70" stroke="#00BCD4" strokeWidth="1" opacity="0.4" />
              <line x1="150" y1="100" x2="60" y2="130" stroke="#00BCD4" strokeWidth="1" opacity="0.4" />
              <line x1="150" y1="100" x2="240" y2="140" stroke="#00BCD4" strokeWidth="1" opacity="0.4" />
              <line x1="150" y1="100" x2="130" y2="160" stroke="#00BCD4" strokeWidth="1" opacity="0.4" />
              <line x1="80" y1="60" x2="190" y2="50" stroke="#00BCD4" strokeWidth="1" opacity="0.4" />
              <line x1="60" y1="130" x2="130" y2="160" stroke="#00BCD4" strokeWidth="1" opacity="0.4" />
              <line x1="220" y1="70" x2="240" y2="140" stroke="#00BCD4" strokeWidth="1" opacity="0.4" />
              <circle cx="150" cy="100" r="30" fill="none" stroke="#00BCD4" strokeWidth="1" opacity="0.3" />
              <circle cx="150" cy="100" r="8" fill="#00BCD4" opacity="0.8" />
              <circle cx="80" cy="60" r="5" fill="#00BCD4" opacity="0.8" />
              <circle cx="220" cy="70" r="5" fill="#00BCD4" opacity="0.8" />
              <circle cx="60" cy="130" r="5" fill="#00BCD4" opacity="0.8" />
              <circle cx="240" cy="140" r="5" fill="#00BCD4" opacity="0.8" />
              <circle cx="130" cy="160" r="5" fill="#00BCD4" opacity="0.8" />
              <circle cx="190" cy="50" r="4" fill="#00BCD4" opacity="0.8" />
            </svg>
          </div>
          <div className="p-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 text-[#ff6b9d]" style={{ background: "rgba(255,107,157,0.2)" }}>
              {t("project3Badge")}
            </span>
            <h3 className="text-xl font-bold text-white mb-2">{t("project3Title")}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{t("project3Description")}</p>
            <span className="inline-flex items-center gap-2 text-[#ff6b9d] text-sm font-medium opacity-60 cursor-not-allowed">
              {t("project3ComingSoon")}
            </span>
          </div>
        </div>

      </div>

      {/* CTA Strip */}
      <div
        className="cta-strip mt-20 p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ background: "linear-gradient(135deg,rgba(46,196,182,0.08) 0%,rgba(255,112,87,0.08) 100%)" }}
      >
        <div>
          <p className="text-2xl font-bold text-white">{t("ctaTitle")}</p>
          <p className="text-white/60 text-sm mt-1">{t("ctaSubtitle")}</p>
        </div>
        <Link
          href="/contact"
          className="px-8 py-3 rounded-full font-medium text-black bg-[#88ce02] hover:opacity-90 transition-opacity text-sm"
        >
          {t("ctaButton")}
        </Link>
      </div>
    </section>
  );
}
