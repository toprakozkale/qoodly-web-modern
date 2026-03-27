"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const t = useTranslations("nav");
  const navRef = useRef<HTMLElement>(null);

  // Desktop Call Us refs
  const callContainerRef = useRef<HTMLDivElement>(null);
  const phoneNumWrapRef = useRef<HTMLDivElement>(null);
  const phoneNumRef = useRef<HTMLSpanElement>(null);
  const callBtnRef = useRef<HTMLAnchorElement>(null);
  const callTextRef = useRef<HTMLSpanElement>(null);
  const phoneIconRef = useRef<HTMLSpanElement>(null);

  // Mobile menu refs
  const drawerRef = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLSpanElement>(null);
  const bar2Ref = useRef<HTMLSpanElement>(null);
  const bar3Ref = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Scroll background + Desktop Call Us ──────────────────────────────────
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const trigger = ScrollTrigger.create({
      start: "top -100",
      end: 99999,
      onUpdate: (self) => {
        if (self.progress > 0) {
          nav.classList.add("nav-scrolled");
        } else {
          nav.classList.remove("nav-scrolled");
        }
      },
    });

    const container   = callContainerRef.current;
    const phoneNumWrap = phoneNumWrapRef.current;
    const phoneNum    = phoneNumRef.current;
    const callBtn     = callBtnRef.current;
    const callText    = callTextRef.current;
    const phoneIcon   = phoneIconRef.current;

    let callTl: gsap.core.Timeline | null = null;

    if (container && phoneNumWrap && phoneNum && callBtn && callText && phoneIcon) {
      gsap.set(phoneNumWrap, { width: 0, opacity: 0, overflow: "hidden" });
      gsap.set(phoneNum, { x: 30 });
      gsap.set(callText, { opacity: 1, scale: 1 });
      gsap.set(phoneIcon, { opacity: 0, scale: 0 });

      callTl = gsap.timeline({ paused: true });
      callTl
        .to(phoneNumWrap, { width: "auto", opacity: 1, duration: 0.45, ease: "power3.out" }, 0)
        .to(phoneNum,    { x: 0,           duration: 0.45, ease: "power3.out" }, 0)
        .to(callText,    { opacity: 0, scale: 0.6, duration: 0.2, ease: "power2.in" }, 0)
        .to(callBtn,     { borderColor: "#88ce02", duration: 0.3, ease: "power2.out" }, 0)
        .to(phoneIcon,   { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, 0.18);

      const onEnter = () => callTl?.play();
      const onLeave = () => callTl?.reverse();
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
        callTl?.kill();
        trigger.kill();
      };
    }

    return () => trigger.kill();
  }, []);

  // ── Drawer: başlangıçta gizle ─────────────────────────────────────────────
  useEffect(() => {
    if (drawerRef.current) {
      gsap.set(drawerRef.current, { yPercent: -100, opacity: 0 });
    }
  }, []);

  // ── Hamburger aç / kapat ──────────────────────────────────────────────────
  useEffect(() => {
    const drawer = drawerRef.current;
    const bar1   = bar1Ref.current;
    const bar2   = bar2Ref.current;
    const bar3   = bar3Ref.current;
    if (!drawer) return;

    if (menuOpen) {
      gsap.to(drawer, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power4.out" });
      gsap.fromTo(
        ".mobile-nav-item",
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: "power3.out", delay: 0.15 }
      );
      if (bar1 && bar2 && bar3) {
        gsap.to(bar1, { rotate: 45,  y: 8,  duration: 0.3, ease: "power3.inOut" });
        gsap.to(bar2, { opacity: 0,  x: -8, duration: 0.2, ease: "power2.in" });
        gsap.to(bar3, { rotate: -45, y: -8, duration: 0.3, ease: "power3.inOut" });
      }
    } else {
      gsap.to(drawer, { yPercent: -100, opacity: 0, duration: 0.4, ease: "power4.in" });
      if (bar1 && bar2 && bar3) {
        gsap.to(bar1, { rotate: 0, y: 0, duration: 0.3, ease: "power3.inOut" });
        gsap.to(bar2, { opacity: 1, x: 0, duration: 0.3, ease: "power3.inOut" });
        gsap.to(bar3, { rotate: 0, y: 0, duration: 0.3, ease: "power3.inOut" });
      }
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Ana Navbar ─────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10"
      >
        <div className="flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <svg
              className="h-8 w-auto"
              viewBox="0 0 108 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="navQGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#2ec4b6" />
                  <stop offset="60%"  stopColor="#ff7057" />
                  <stop offset="100%" stopColor="#1565c0" />
                </linearGradient>
              </defs>
              <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">
                <tspan fill="url(#navQGrad)">Q</tspan>
                <tspan fill="white">oodly</tspan>
              </text>
            </svg>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-14">
            <Link href="/"        className="text-base text-white/80 hover:text-white transition-colors">{t("home")}</Link>
            <Link href="/work"    className="text-base text-white/80 hover:text-white transition-colors">{t("work")}</Link>
            <Link href="/about"   className="text-base text-white/80 hover:text-white transition-colors">{t("about")}</Link>
            <Link href="/contact" className="text-base text-white/80 hover:text-white transition-colors">{t("contact")}</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Desktop — Call Us */}
            <div ref={callContainerRef} className="hidden md:flex items-center gap-2 cursor-pointer">
              <div ref={phoneNumWrapRef} className="whitespace-nowrap">
                <span ref={phoneNumRef} className="text-sm text-white/70 block">
                  {t("phone")}
                </span>
              </div>
              <a
                ref={callBtnRef}
                href="tel:+905414201560"
                className="relative flex items-center justify-center px-5 py-2 text-sm font-medium text-white border border-white/30 rounded-full overflow-hidden"
              >
                <span className="invisible">{t("callUs")}</span>
                <span ref={callTextRef} className="absolute inset-0 flex items-center justify-center">
                  {t("callUs")}
                </span>
                <span ref={phoneIconRef} className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="#88ce02" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Mobile — Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center gap-[6px] w-10 h-10 cursor-pointer"
              aria-label={t("toggleMenu")}
            >
              <span ref={bar1Ref} className="block h-[2px] w-6 bg-white rounded-full origin-center" />
              <span ref={bar2Ref} className="block h-[2px] w-6 bg-white rounded-full" />
              <span ref={bar3Ref} className="block h-[2px] w-6 bg-white rounded-full origin-center" />
            </button>

          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 right-0 z-40 md:hidden"
        style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(16px)" }}
      >
        <div className="flex flex-col pt-24 pb-10 px-8 gap-2">

          <Link href="/" onClick={closeMenu} className="mobile-nav-item text-xl font-semibold text-white/90 hover:text-white py-3 border-b border-white/10 transition-colors">
            {t("home")}
          </Link>
          <Link href="/work" onClick={closeMenu} className="mobile-nav-item text-xl font-semibold text-white/90 hover:text-white py-3 border-b border-white/10 transition-colors">
            {t("work")}
          </Link>
          <Link href="/about" onClick={closeMenu} className="mobile-nav-item text-xl font-semibold text-white/90 hover:text-white py-3 border-b border-white/10 transition-colors">
            {t("about")}
          </Link>
          <Link href="/contact" onClick={closeMenu} className="mobile-nav-item text-xl font-semibold text-white/90 hover:text-white py-3 border-b border-white/10 transition-colors">
            {t("contact")}
          </Link>

          {/* Call Us */}
          <a
            href="tel:+905414201560"
            onClick={closeMenu}
            className="mobile-nav-item mt-6 flex items-center gap-3 px-6 py-3 rounded-full border border-white/30 text-white text-base font-medium self-start hover:border-[#88ce02] transition-colors"
          >
            <svg className="w-4 h-4" fill="#88ce02" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            {t("phone")}
          </a>

        </div>
      </div>
    </>
  );
}
