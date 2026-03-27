"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ShowcaseSection() {
  const t = useTranslations("showcase");
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const item1Tags = t("item1Tags").split(",");
  const item2Tags = t("item2Tags").split(",");
  const item3Tags = t("item3Tags").split(",");

  const showcases = [
    {
      id: 1,
      image: (
        <div className="w-full h-full bg-linear-to-br from-[#ff6b9d] to-[#ff8c42] flex items-center justify-center py-8 px-4">
          <div className="text-center w-full">
            <div className="w-24 h-24 md:w-36 md:h-36 mx-auto mb-3 md:mb-4 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ww-logo.png" alt="Weekweeky" className="w-full h-full object-cover" />
            </div>
            <div className="text-3xl md:text-5xl lg:text-6xl font-black text-black mb-3 md:mb-4">Weekweeky</div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6">
              {item1Tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 rounded-full text-black text-xs md:text-sm font-medium">{tag}</span>
              ))}
            </div>
            <a
              href="https://weekweeky.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-sm font-bold hover:bg-black/80 transition-all transform hover:scale-105"
            >
              {t("reviewSite")}
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      image: (
        <div className="w-full h-full bg-linear-to-br from-[#9d4edd] to-[#00b4d8] flex items-center justify-center py-8 px-4">
          <div className="text-center w-full">
            <div className="w-24 h-24 md:w-36 md:h-36 mx-auto mb-3 md:mb-4 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gfs-global.png" alt="GFS Global Engineering" className="w-full h-full object-cover" />
            </div>
            <div className="text-3xl md:text-5xl lg:text-6xl font-black text-black mb-3 md:mb-4">GFS GLOBAL</div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6">
              {item2Tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 rounded-full text-black text-xs md:text-sm font-medium">{tag}</span>
              ))}
            </div>
            <a
              href="https://www.gfsglobalmakina.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-sm font-bold hover:bg-black/80 transition-all transform hover:scale-105"
            >
              {t("reviewSite")}
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      image: (
        <div className="w-full h-full bg-linear-to-br from-[#ff8c42] to-[#88ce02] flex items-center justify-center py-8 px-4">
          <div className="text-center w-full">
            <div className="w-24 h-24 md:w-36 md:h-36 mx-auto mb-3 md:mb-4 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/rback-logo-ligh.png" alt="Rback" className="w-full h-full object-cover" />
            </div>
            <div className="text-3xl md:text-5xl lg:text-6xl font-black text-black mb-3 md:mb-4">Qoodly</div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              {item3Tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 rounded-full text-black text-xs md:text-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".carousel-container",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % showcases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + showcases.length) % showcases.length);
  };

  return (
    <section ref={sectionRef} className="relative py-20 px-4 md:px-12" id="showcase">
      {/* Title */}
      <h2 className="showcase-title text-5xl md:text-7xl font-bold mb-12">{t("title")}</h2>

      {/* Carousel */}
      <div className="carousel-container relative">
        <div ref={carouselRef} className="flex gap-6 overflow-hidden">
          {showcases.map((showcase, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={showcase.id}
                className={`shrink-0 transition-all duration-500 ${
                  isActive
                    ? "w-full md:w-[70%] opacity-100 scale-100"
                    : "w-full md:w-[60%] opacity-50 scale-95"
                }`}
                style={{
                  transform: `translateX(${-currentIndex * 100}%)`,
                }}
              >
                <div className="relative h-[360px] md:aspect-video md:h-auto rounded-2xl overflow-hidden">
                  {showcase.image}
                </div>
              </div>
            );
          })}
        </div>

        {/* Showcase Info */}
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href="/work"
            className="text-center sm:text-left px-6 py-3 border border-white/30 rounded-full text-white text-sm hover:bg-white/10 transition-colors"
          >
            {t("cta")}
          </Link>

          {/* Navigation Arrows + dot indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2 ml-2">
              {showcases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? "20px" : "8px",
                    height: "8px",
                    background: i === currentIndex ? "#88ce02" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
