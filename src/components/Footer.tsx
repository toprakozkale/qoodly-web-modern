"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const t = useTranslations("footer");
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            once: true,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative">
      {/* Bottom Section */}
      <div className="bg-[#fefae0] text-black py-12 px-4 md:px-12">
        <div className="footer-content grid md:grid-cols-3 gap-12">
          {/* Location */}
          <div>
            <h3 className="text-2xl font-bold mb-6">{t("cta")}</h3>
            <p className="text-sm text-black/70" style={{ whiteSpace: "pre-line" }}>
              {t("address")}
            </p>
            <a
              href="mailto:info@qoodly.com"
              className="mt-4 inline-block text-sm font-medium hover:underline transition-all"
            >
              info@qoodly.com
            </a>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium mb-4">{t("qoodlyHeader")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-black/70 hover:text-black transition-colors">
                  {t("linkHome")}
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-sm text-black/70 hover:text-black transition-colors">
                  {t("linkWork")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-black/70 hover:text-black transition-colors">
                  {t("linkAbout")}
                </Link>
              </li>
              <li>
                <a href="#connect" className="text-sm text-black/70 hover:text-black transition-colors">
                  {t("linkConnect")}
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div id="connect">
            <h4 className="font-medium mb-4">{t("connectHeader")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@qoodly.com" className="text-sm text-black/70 hover:text-black transition-colors">
                  {t("linkMail")}
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/qoodly.io?igsh=NzE2N2RqNTdwanB0&utm_source=qr" className="text-sm text-black/70 hover:text-black transition-colors">
                  {t("linkInstagram")}
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/qoodly/?viewAsMember=true" className="text-sm text-black/70 hover:text-black transition-colors">
                  {t("linkLinkedIn")}
                </a>
              </li>
              <li>
                <a href="tel:+905414201560" className="text-sm text-black/70 hover:text-black transition-colors">
                  {t("linkPhone")}
                </a>
              </li>
              <li>
                <a href="https://wa.me/905414201560" className="text-sm text-black/70 hover:text-black transition-colors">
                  {t("linkWhatsApp")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-content mt-12 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-black/60">{t("copyright")}</p>
          <div className="flex gap-4 text-sm text-black/60">
            <a href="#" className="hover:text-black">
              {t("privacyPolicy")}
            </a>
            <a href="#" className="hover:text-black">
              {t("termsOfUse")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
