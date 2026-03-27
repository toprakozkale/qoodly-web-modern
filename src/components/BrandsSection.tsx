"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  {
    name: "Intel",
    logo: (
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <text x="10" y="28" fill="white" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fontStyle="italic">
          intel.
        </text>
      </svg>
    ),
  },
  {
    name: "YouTube",
    logo: (
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <rect x="5" y="8" width="50" height="24" rx="6" fill="white" />
        <polygon points="25,16 25,24 35,20" fill="#0a0a0a" />
        <text x="60" y="26" fill="white" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold">
          YouTube
        </text>
      </svg>
    ),
  },
  {
    name: "Netlify",
    logo: (
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <text x="10" y="26" fill="white" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="300">
          - netlify -
        </text>
      </svg>
    ),
  },
  {
    name: "Amazon",
    logo: (
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <text x="10" y="24" fill="white" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold">
          amazon
        </text>
        <path d="M15 30 Q50 35, 85 28" fill="none" stroke="white" strokeWidth="2" />
        <polygon points="85,25 88,30 82,30" fill="white" />
      </svg>
    ),
  },
  {
    name: "Ford",
    logo: (
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <ellipse cx="50" cy="20" rx="40" ry="15" fill="none" stroke="white" strokeWidth="2" />
        <text x="50" y="25" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="14" fontStyle="italic">
          Ford
        </text>
      </svg>
    ),
  },
  {
    name: "Microsoft",
    logo: (
      <svg viewBox="0 0 120 40" className="w-full h-full">
        <rect x="5" y="10" width="8" height="8" fill="#f25022" />
        <rect x="15" y="10" width="8" height="8" fill="#7fba00" />
        <rect x="5" y="20" width="8" height="8" fill="#00a4ef" />
        <rect x="15" y="20" width="8" height="8" fill="#ffb900" />
        <text x="30" y="24" fill="white" fontFamily="Arial, sans-serif" fontSize="12">
          Microsoft
        </text>
      </svg>
    ),
  },
];

export function BrandsSection() {
  const t = useTranslations("brands");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const brandItems = track.querySelectorAll(".brand-item");

      gsap.fromTo(
        brandItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Label */}
      <div className="flex items-start gap-2 mb-12 px-4 md:px-12">
        <span className="text-white/60">{`{`}</span>
        <span className="text-sm text-white/60">{t("label")}</span>
        <span className="text-white/60">{`}`}</span>
      </div>

      {/* Brands Track */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        <div ref={trackRef} className="flex items-center gap-16 px-8">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="brand-item flex-shrink-0 w-28 h-12 opacity-60 hover:opacity-100 transition-opacity"
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
