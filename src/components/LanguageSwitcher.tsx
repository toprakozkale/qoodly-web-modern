"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";

const LOCALES = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "tr", flag: "🇹🇷", label: "TR" },
  { code: "de", flag: "🇩🇪", label: "DE" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const handleSelect = (code: string) => {
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
    // Replace current locale prefix in the URL with the new one
    const segments = window.location.pathname.split("/").filter(Boolean);
    const localeList = ["en", "tr", "de", "ru"];
    if (localeList.includes(segments[0])) {
      segments[0] = code;
    } else {
      segments.unshift(code);
    }
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = "/" + segments.join("/") + window.location.search;
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-5 py-2 rounded-full border border-white/30 text-sm font-medium text-white/70 hover:text-white hover:border-white/40 transition-colors"
        aria-label="Switch language"
      >
        <span>{current.flag}</span>
        <span className="font-medium">{current.label}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[110px] rounded-xl border border-white/10 overflow-hidden z-50"
          style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}
        >
          {LOCALES.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                code === locale
                  ? "text-[#88ce02] bg-white/5"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{flag}</span>
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
