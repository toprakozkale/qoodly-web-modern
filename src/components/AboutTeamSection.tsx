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
  },
  {
    initials: "EÖ",
    name: "Eren Öz",
    roleKey: "member2Role" as const,
    descKey: "member2Description" as const,
    roleColor: "#00b4d8",
    gradient: "from-[#00b4d8] to-[#9d4edd]",
  },
  {
    initials: "FB",
    name: "Furkan Bozdaş",
    roleKey: "member3Role" as const,
    descKey: "member3Description" as const,
    roleColor: "#ff8c42",
    gradient: "from-[#ff8c42] to-[#ff6b9d]",
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
      <div className="cards-grid grid md:grid-cols-3 gap-8 mt-16">
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
          </div>
        ))}
      </div>
    </section>
  );
}
