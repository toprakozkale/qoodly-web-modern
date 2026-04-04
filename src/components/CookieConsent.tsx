"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Check localStorage on mount
  useEffect(() => {
    const consent = localStorage.getItem("qoodly_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Animate in when visible becomes true
  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    if (visible) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        drawer,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.7, ease: "power4.out" }
      );
      gsap.fromTo(
        ".cookie-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.35 }
      );
    }
  }, [visible]);

  const dismiss = (accepted: boolean) => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    localStorage.setItem("qoodly_cookie_consent", accepted ? "accepted" : "declined");
    window.dispatchEvent(new Event("qoodly:cookie-dismissed"));

    gsap.to(drawer, { y: "100%", opacity: 0, duration: 0.5, ease: "power4.in" });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      delay: 0.1,
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  const cookieTypes = [
    { key: "essential", color: "#88ce02", always: true },
    { key: "analytics", color: "#2ec4b6", always: false },
    { key: "marketing", color: "#ff7057", always: false },
    { key: "preferences", color: "#9d4edd", always: false },
  ] as const;

  return (
    <>
      {/* Dim overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9990]"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
        onClick={() => dismiss(false)}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 right-0 z-[9999] px-5 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8"
        style={{
          background: "linear-gradient(180deg, #111111 0%, #0a0a0a 100%)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px 24px 0 0",
        }}
      >
        {/* Handle bar */}
        <div className="cookie-item flex justify-center mb-5">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="cookie-item flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(136,206,2,0.15)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#88ce02" strokeWidth="1.5" />
                <circle cx="8.5" cy="9" r="1.5" fill="#88ce02" />
                <circle cx="14" cy="7.5" r="1" fill="#88ce02" />
                <circle cx="15.5" cy="13.5" r="1.5" fill="#88ce02" />
                <circle cx="9.5" cy="15" r="1" fill="#88ce02" />
                <circle cx="12.5" cy="11" r="0.75" fill="#88ce02" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg leading-tight">{t("title")}</h3>
          </div>

          {/* Body text */}
          <p className="cookie-item text-white/50 text-sm leading-relaxed mb-5 max-w-2xl">
            {t("body")}{" "}
            <a href="#" className="underline underline-offset-2 hover:text-white transition-colors">
              {t("learnMore")}
            </a>
          </p>

          {/* Cookie type pills */}
          <div className="cookie-item flex flex-wrap gap-2 mb-6">
            {cookieTypes.map(({ key, color, always }) => (
              <span
                key={key}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  color: always ? color : "rgba(255,255,255,0.55)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                {t(key)}
                {always && <span className="text-[10px] opacity-60 ml-0.5">{t("alwaysOn")}</span>}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="cookie-item flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => dismiss(true)}
              className="flex-1 sm:flex-none px-7 py-3 rounded-full text-sm font-semibold text-black transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ background: "#88ce02" }}
            >
              {t("acceptAll")}
            </button>
            <button
              onClick={() => dismiss(false)}
              className="flex-1 sm:flex-none px-7 py-3 rounded-full text-sm font-medium text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200 active:scale-95"
            >
              {t("decline")}
            </button>
            <button
              onClick={() => dismiss(false)}
              className="flex-1 sm:flex-none sm:ml-auto px-5 py-3 rounded-full text-xs font-medium text-white/35 hover:text-white/60 transition-colors"
            >
              {t("managePreferences")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
