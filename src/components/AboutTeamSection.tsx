"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamData = [
  {
    initials: "TÖ",
    name: "Toprak Özkale",
    roleKey: "member1Role" as const,
    descKey: "member1Description" as const,
    roleColor: "#88ce02",
    gradient: "from-[#2ec4b6] to-[#1565c0]",
    linkedinUrl: "https://www.linkedin.com/in/toprakozkale/",
  },
  {
    initials: "EÖ",
    name: "Eren Öz",
    roleKey: "member2Role" as const,
    descKey: "member2Description" as const,
    roleColor: "#00b4d8",
    gradient: "from-[#00b4d8] to-[#9d4edd]",
    linkedinUrl: "https://www.linkedin.com/in/eren-öz-93aa94317/",
  },
  {
    initials: "FB",
    name: "Furkan Bozdaş",
    roleKey: "member3Role" as const,
    descKey: "member3Description" as const,
    roleColor: "#ff8c42",
    gradient: "from-[#ff8c42] to-[#ff6b9d]",
    linkedinUrl: "https://www.linkedin.com/in/furkan-bozda%C5%9F-915576177/",
  },
  {
    initials: "ŞND",
    name: "Şevval Neva Durmuş",
    roleKey: "member4Role" as const,
    descKey: "member4Description" as const,
    roleColor: "#c084fc",
    gradient: "from-[#c084fc] to-[#818cf8]",
    linkedinUrl: "https://www.linkedin.com/in/şevval-neva-durmuş-815664329/",
  },
];

const tagColors = [
  { bg: "#88ce02", textClass: "text-black" },
  { bg: "rgba(255,107,157,0.8)", textClass: "text-white" },
  { bg: "rgba(157,78,221,0.8)", textClass: "text-white" },
];

export function AboutTeamSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);

  const tagWords = t("teamTags").split(",");

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

      const cards = section.querySelectorAll(".team-card");
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.9,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section.querySelector(".cards-grid"),
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" className="relative py-20 px-6 md:px-12">
      {/* Tags */}
      <div className="flex flex-wrap gap-4 mb-4">
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

      {/* Cards Grid */}
      <div className="cards-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {teamData.map((member) => (
          <div
            key={member.name}
            className="team-card border border-white/10 rounded-2xl p-8 text-center bg-white/5 backdrop-blur-sm"
          >
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br ${member.gradient}`}>
              <span className="text-2xl font-bold text-white">{member.initials}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">{member.name}</h3>
            <p className="text-sm font-medium mt-1" style={{ color: member.roleColor }}>
              {t(member.roleKey)}
            </p>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">{t(member.descKey)}</p>
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-colors text-xs"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
