"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const t = useTranslations("features");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate tags
      const tags = section.querySelectorAll(".feature-tag");
      tags.forEach((tag) => {
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

      // Animate 3D elements
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

      // Animate text blocks
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

      // Bezier curve animation
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

  const feature1Tags = t("feature1Tags").split(",");
  const feature1BgColors = ["#ff6b9d", "#ff8c42", "#88ce02", "#00b4d8", "#9d4edd", "#ff6b9d"];

  const feature3CtaTags = t("feature3CtaTags").split(",");
  const ctaBgs = ["#ff6b9d", "#88ce02", "#ff8c42", "#9d4edd", "rgba(255,255,255,0.15)", "#00b4d8", "rgba(255,255,255,0.1)"];
  const ctaTexts = ["text-black", "text-black", "text-black", "text-white", "text-white", "text-black", "text-white"];

  return (
    <section ref={sectionRef} className="relative py-20 px-4 md:px-12">
      {/* Feature 1 */}
      <div className="min-h-screen flex flex-col justify-center mb-20">
        <div className="flex flex-wrap gap-4 mb-12">
          {feature1Tags.map((word, idx) => (
            <div
              key={idx}
              className="feature-tag px-6 py-3 rounded-lg font-medium text-lg text-black"
              style={{ backgroundColor: feature1BgColors[idx % feature1BgColors.length] }}
            >
              {word}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <p className="text-block text-2xl md:text-4xl text-white/80 leading-relaxed">
            {t("feature1Text")}
          </p>

          {/* 3D Decorative Elements */}
          <div className="relative h-64 md:h-80">
            <div className="element-3d absolute top-0 right-[20%] w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="flower3d" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b9d" />
                    <stop offset="100%" stopColor="#ff8c42" />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="30" rx="20" ry="25" fill="url(#flower3d)" />
                <ellipse cx="30" cy="50" rx="25" ry="20" fill="url(#flower3d)" opacity="0.8" />
                <ellipse cx="70" cy="50" rx="25" ry="20" fill="url(#flower3d)" opacity="0.8" />
                <ellipse cx="50" cy="70" rx="20" ry="25" fill="url(#flower3d)" opacity="0.6" />
              </svg>
            </div>

            <div className="element-3d absolute bottom-[10%] left-[10%] w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="sphereGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00b4d8" />
                    <stop offset="100%" stopColor="#88ce02" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#sphereGrad)" />
                <ellipse cx="35" cy="35" rx="15" ry="10" fill="white" opacity="0.3" />
              </svg>
            </div>

            <div className="element-3d absolute top-[30%] left-[40%] w-16 h-16">
              <svg viewBox="0 0 60 60" className="w-full h-full">
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9d4edd" />
                    <stop offset="100%" stopColor="#00b4d8" />
                  </linearGradient>
                </defs>
                <circle cx="30" cy="30" r="25" fill="none" stroke="url(#ringGrad)" strokeWidth="8" />
              </svg>
            </div>

            <div className="element-3d absolute bottom-[20%] right-[10%] w-12 h-12">
              <svg viewBox="0 0 50 50" className="w-full h-full">
                <polygon points="25,5 30,20 45,20 33,30 38,45 25,35 12,45 17,30 5,20 20,20" fill="#ff8c42" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2: Software Development */}
      <div className="min-h-screen flex flex-col justify-center mb-20">
        <div className="flex flex-wrap gap-4 mb-12">
          <div className="feature-tag px-6 py-3 bg-[#88ce02] rounded-lg text-black font-medium text-lg">
            {t("feature2Tag1")}
          </div>
          <div className="feature-tag px-6 py-3 bg-[#9d4edd]/80 rounded-lg text-white font-medium text-lg">
            {t("feature2Tag2")}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-block text-2xl md:text-4xl text-white/80 leading-relaxed mb-10">
              {t("feature2Text")}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="feature-tag px-6 py-3 bg-[#ff6b9d]/80 rounded-lg text-black font-medium text-lg">{t("feature2Tag3")}</div>
              <div className="feature-tag px-6 py-3 bg-[#88ce02] rounded-lg text-black font-medium text-lg">{t("feature2Tag4")}</div>
              <div className="feature-tag px-6 py-3 bg-[#ff8c42] rounded-lg text-black font-medium text-lg">{t("feature2Tag5")}</div>
              <div className="feature-tag px-6 py-3 bg-white/20 rounded-lg text-white font-medium text-lg">{t("feature2Tag6")}</div>
              <div className="feature-tag px-6 py-3 bg-[#9d4edd]/80 rounded-lg text-white font-medium text-lg">{t("feature2Tag7")}</div>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="relative h-80">
            {/* Teal ring */}
            <div className="element-3d absolute top-[5%] left-[10%] w-20 h-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="tealRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00b4d8" />
                    <stop offset="100%" stopColor="#9d4edd" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="38" fill="none" stroke="url(#tealRingGrad)" strokeWidth="14" />
              </svg>
            </div>
            {/* Pink clover */}
            <div className="element-3d absolute top-[0%] right-[5%] w-36 h-36 animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="cloverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b9d" />
                    <stop offset="100%" stopColor="#ff8c42" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="28" r="24" fill="url(#cloverGrad)" />
                <circle cx="72" cy="50" r="24" fill="url(#cloverGrad)" opacity="0.9" />
                <circle cx="50" cy="72" r="24" fill="url(#cloverGrad)" opacity="0.85" />
                <circle cx="28" cy="50" r="24" fill="url(#cloverGrad)" opacity="0.9" />
              </svg>
            </div>
            {/* Orange diamond */}
            <div className="element-3d absolute top-[10%] right-[-2%] w-10 h-10">
              <svg viewBox="0 0 50 50" className="w-full h-full">
                <defs>
                  <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff8c42" />
                    <stop offset="100%" stopColor="#ff6b9d" />
                  </linearGradient>
                </defs>
                <polygon points="25,2 48,25 25,48 2,25" fill="url(#diamondGrad)" />
              </svg>
            </div>
            {/* Purple hourglass */}
            <div className="element-3d absolute top-[45%] left-[30%] w-14 h-14">
              <svg viewBox="0 0 60 60" className="w-full h-full">
                <defs>
                  <linearGradient id="hourglassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9d4edd" />
                    <stop offset="100%" stopColor="#ff6b9d" />
                  </linearGradient>
                </defs>
                <polygon points="5,2 55,2 30,30" fill="url(#hourglassGrad)" />
                <polygon points="5,58 55,58 30,30" fill="url(#hourglassGrad)" opacity="0.8" />
              </svg>
            </div>
            {/* Green dome */}
            <div className="element-3d absolute bottom-[0%] left-[20%] w-48 h-32">
              <svg viewBox="0 0 200 120" className="w-full h-full">
                <defs>
                  <linearGradient id="domeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#88ce02" />
                    <stop offset="100%" stopColor="#00b4d8" />
                  </linearGradient>
                </defs>
                <path d="M10 120 Q10 10, 100 10 Q190 10, 190 120 Z" fill="url(#domeGrad)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3: Work with us */}
      <div className="min-h-screen flex flex-col justify-center">
        <div className="flex flex-wrap gap-4 mb-12">
          <div className="feature-tag px-6 py-3 bg-[#88ce02] rounded-lg text-black font-medium text-lg">{t("feature3Tag1")}</div>
          <div className="feature-tag px-6 py-3 bg-[#ff6b9d] rounded-lg text-black font-medium text-lg">{t("feature3Tag2")}</div>
          <div className="feature-tag px-6 py-3 bg-[#9d4edd] rounded-lg text-white font-medium text-lg">{t("feature3Tag3")}</div>
        </div>

        <p className="text-block text-xl md:text-2xl text-white/80 leading-relaxed mb-12">
          {t("feature3Text")}
        </p>

        {/* Bezier Curves */}
        <div className="relative h-48 mb-12">
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

        <div className="flex flex-wrap gap-4">
          {feature3CtaTags.map((word, idx) => (
            <div
              key={idx}
              className={`feature-tag px-6 py-3 rounded-lg font-medium text-xl ${ctaTexts[idx % ctaTexts.length]}`}
              style={{ backgroundColor: ctaBgs[idx % ctaBgs.length] }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
