import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutHeroSection } from "@/components/AboutHeroSection";
import { AboutMissionSection } from "@/components/AboutMissionSection";
import { AboutTeamSection } from "@/components/AboutTeamSection";
import { AboutValuesSection } from "@/components/AboutValuesSection";
import { AboutFAQSection } from "@/components/AboutFAQSection";

const BASE_URL = "https://qoodly.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        en: `${BASE_URL}/en/about`,
        tr: `${BASE_URL}/tr/about`,
        de: `${BASE_URL}/de/about`,
        ru: `${BASE_URL}/ru/about`,
        "x-default": `${BASE_URL}/en/about`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/about`,
    },
  };
}

function TeamSchema() {
  const team = [
    {
      name: "Toprak Özkale",
      jobTitle: "Full Stack Developer",
      url: "https://www.linkedin.com/in/toprakozkale/",
    },
    {
      name: "Eren Öz",
      jobTitle: "Backend Developer",
      url: "https://www.linkedin.com/in/eren-öz-93aa94317/",
    },
    {
      name: "Furkan Bozdaş",
      jobTitle: "AI Integrator",
      url: "https://www.linkedin.com/in/furkan-bozdaş-915576177/",
    },
    {
      name: "Şevval Neva Durmuş",
      jobTitle: "UI Architect",
      url: "https://www.linkedin.com/in/şevval-neva-durmuş-815664329/",
    },
  ];

  const schemas = team.map((person) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: "Qoodly Software",
      url: "https://qoodly.com",
    },
    url: person.url,
    sameAs: [person.url],
  }));

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

export default function AboutPage() {
  return (
    <main className="relative text-[#f5f5f5] overflow-x-hidden">
      <TeamSchema />
      <AboutHeroSection />
      <AboutMissionSection />
      <AboutTeamSection />
      <AboutValuesSection />
      <AboutFAQSection />
    </main>
  );
}
