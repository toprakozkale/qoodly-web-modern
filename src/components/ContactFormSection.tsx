"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tagColors = [
  { bg: "#88ce02", textClass: "text-black" },
  { bg: "rgba(255,107,157,0.8)", textClass: "text-white" },
  { bg: "rgba(255,255,255,0.1)", textClass: "text-white" },
];

export function ContactFormSection() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name    = (form.elements.namedItem("name")    as HTMLInputElement).value.trim();
    const email   = (form.elements.namedItem("email")   as HTMLInputElement).value.trim();
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    if (!name || !email || !message) return;
    const to  = "info@qoodly.com";
    const sub = encodeURIComponent(subject || "Qoodly - Contact");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${sub}&body=${body}`;
  };

  const tagWords = [t("formTag1"), t("formTag2"), t("formTag3")];

  const infoRows = [
    { icon: "📍", labelKey: "formLocationLabel" as const, valueKey: "formLocationValue" as const },
    { icon: "⏰", labelKey: "formResponseTimeLabel" as const, valueKey: "formResponseTimeValue" as const },
    { icon: "💼", labelKey: "formWorkingHoursLabel" as const, valueKey: "formWorkingHoursValue" as const },
  ];

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

      gsap.fromTo(
        ".form-field",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".form-field"),
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".info-row",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".info-row"),
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Qoodly Software",
    image: "https://qoodly.com/og-image.png",
    telephone: "+90-541-420-15-60",
    email: "info@qoodly.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Çukurambar Mah. 1474. Sokak Pembe Köşk",
      addressLocality: "Ankara",
      addressRegion: "Ankara",
      postalCode: "06530",
      addressCountry: "TR",
    },
    url: "https://qoodly.com",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$",
    areaServed: ["TR", "DE", "RU", "Worldwide"],
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "UI/UX Design",
      "AI Integration",
      "E-Commerce Development",
      "Technology Consulting",
    ],
    sameAs: [
      "https://www.linkedin.com/company/qoodly/",
      "https://www.instagram.com/qoodly.io",
    ],
  };

  return (
    <section ref={sectionRef} id="contact-form" className="relative py-20 px-6 md:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Top Tags */}
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

      {/* Two-column grid */}
      <div className="grid md:grid-cols-2 gap-16 mt-12 items-start">
        {/* LEFT — Form */}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder={t("formNamePlaceholder")}
            className="form-field w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#88ce02] transition-colors mb-4 text-sm"
          />
          <input
            name="email"
            type="email"
            placeholder={t("formEmailPlaceholder")}
            className="form-field w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#88ce02] transition-colors mb-4 text-sm"
          />
          <input
            name="subject"
            type="text"
            placeholder={t("formSubjectPlaceholder")}
            className="form-field w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#88ce02] transition-colors mb-4 text-sm"
          />
          <textarea
            name="message"
            rows={5}
            placeholder={t("formMessagePlaceholder")}
            className="form-field w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#88ce02] transition-colors mb-4 text-sm resize-none"
          />
          <button
            type="submit"
            className="form-field w-full py-3 rounded-full font-medium text-black bg-[#88ce02] hover:opacity-90 transition-opacity mt-2 text-sm"
          >
            {t("formSubmitButton")}
          </button>
        </form>

        {/* RIGHT — Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">{t("formOrReachOut")}</h2>
          {infoRows.map(({ icon, labelKey, valueKey }) => (
            <div key={labelKey} className="info-row flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">{t(labelKey)}</p>
                <p className="text-white text-sm mt-0.5">{t(valueKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
