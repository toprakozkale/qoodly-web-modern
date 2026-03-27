"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function FloatingAssistant() {
  const t = useTranslations("assistant");
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation — slide up from bottom
      gsap.fromTo(
        containerRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)", delay: 2 }
      );

      // Pulse ring
      gsap.to(pulseRef.current, {
        scale: 1.6,
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 0.4,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    gsap.to(imageRef.current, { scale: 1.08, duration: 0.3, ease: "back.out(1.7)" });
    gsap.to(tooltipRef.current, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    gsap.to(imageRef.current, { scale: 1, duration: 0.3, ease: "power3.out" });
    gsap.to(tooltipRef.current, { opacity: 0, x: 12, duration: 0.2, ease: "power3.in" });
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 right-8 z-50 flex items-end gap-3"
      style={{ opacity: 0 }}
    >
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="mb-2 px-4 py-2 rounded-2xl text-sm font-medium text-white pointer-events-none"
        style={{
          opacity: 0,
          transform: "translateX(12px)",
          background: "linear-gradient(135deg, #2ec4b6, #ff7057)",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(46,196,182,0.35)",
        }}
      >
        {t("tooltip")}
      </div>

      {/* Assistant avatar */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Pulse ring */}
        <div
          ref={pulseRef}
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, #2ec4b6, #ff7057)",
            opacity: 0.5,
          }}
        />

        {/* Avatar image */}
        <div
          ref={imageRef}
          className="relative w-28 h-28 rounded-full overflow-hidden"
          style={{
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <Image
            src="/asistant.png"
            alt="AI Assistant"
            fill
            className="object-contain"
            style={{ background: "#000000" }}
          />
        </div>

      </div>
    </div>
  );
}
