"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const toggle = () => {
    const body = bodyRef.current;
    const icon = iconRef.current;
    if (!body || !icon) return;

    if (!open) {
      gsap.set(body, { display: "block" });
      gsap.fromTo(body, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" });
      gsap.to(icon, { rotate: 45, duration: 0.3, ease: "power3.inOut" });
    } else {
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => { gsap.set(body, { display: "none" }); },
      });
      gsap.to(icon, { rotate: 0, duration: 0.3, ease: "power3.inOut" });
    }

    setOpen((v) => !v);
  };

  useEffect(() => {
    if (bodyRef.current) {
      gsap.set(bodyRef.current, { height: 0, opacity: 0, display: "none" });
    }
  }, []);

  return (
    <div className="faq-item border-b border-white/10 py-6 cursor-pointer" onClick={toggle}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base md:text-lg font-medium text-white/90 leading-snug pr-4 select-none">
          <span className="text-[#88ce02] mr-2 font-bold text-sm">
            {String(index + 1).padStart(2, "0")}.
          </span>
          {q}
        </h3>
        <span
          ref={iconRef}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center mt-0.5 select-none"
          style={{ fontSize: "18px", lineHeight: 1, color: "#88ce02" }}
        >
          +
        </span>
      </div>
      <div ref={bodyRef} className="overflow-hidden">
        <p className="text-white/55 text-sm md:text-base leading-relaxed pt-4 pb-1 max-w-3xl">{a}</p>
      </div>
    </div>
  );
}

export function AboutFAQSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);

  const faqCount = 9;
  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    q: t(`faq${i}q` as Parameters<typeof t>[0]),
    a: t(`faq${i}a` as Parameters<typeof t>[0]),
  }));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-label",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".faq-heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-6 md:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #88ce02 40%, #2ec4b6 60%, transparent 100%)",
          opacity: 0.3,
        }}
      />

      {/* Label */}
      <div className="faq-label flex items-center gap-2 mb-4">
        <span className="text-white/40">{"{"}</span>
        <span className="text-sm text-white/40 tracking-widest uppercase">{t("faqLabel")}</span>
        <span className="text-white/40">{"}"}</span>
      </div>

      {/* Heading */}
      <h2 className="faq-heading text-4xl md:text-6xl font-bold leading-tight mb-16">
        {t("faqHeading")}
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #88ce02 0%, #2ec4b6 60%, #ff7057 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("faqHeadingGradient")}
        </span>
      </h2>

      {/* FAQ List */}
      <div className="faq-list max-w-4xl">
        {faqs.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="faq-item mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-white/50 text-sm">{t("faqStillHaveQuestions")}</p>
        <Link
          href="/contact"
          className="text-sm font-medium text-white border border-white/20 rounded-full px-5 py-2 hover:border-[#88ce02] hover:text-[#88ce02] transition-colors"
        >
          {t("faqContactUs")}
        </Link>
      </div>
    </section>
  );
}
