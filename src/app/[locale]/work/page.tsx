import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WorkHeroSection } from "@/components/WorkHeroSection";
import { WorkProjectsSection } from "@/components/WorkProjectsSection";

const BASE_URL = "https://qoodly.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.work" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/work`,
      languages: {
        en: `${BASE_URL}/en/work`,
        tr: `${BASE_URL}/tr/work`,
        de: `${BASE_URL}/de/work`,
        ru: `${BASE_URL}/ru/work`,
        "x-default": `${BASE_URL}/en/work`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/work`,
    },
  };
}

function WorkProjectsSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Qoodly Software Projects",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "SoftwareApplication",
          name: "Weekweeky",
          applicationCategory: "MobileApplication",
          operatingSystem: "iOS, Android",
          description:
            "A mobile-focused solution that simplifies weekly planning and task management with a user-friendly interface.",
          creator: {
            "@type": "Organization",
            name: "Qoodly Software",
            url: "https://qoodly.com",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "WebApplication",
          name: "GFS Corporate CMS",
          applicationCategory: "BusinessApplication",
          description:
            "A customized, high-security and scalable content management platform built for large-scale enterprises.",
          creator: {
            "@type": "Organization",
            name: "Qoodly Software",
            url: "https://qoodly.com",
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function WorkPage() {
  return (
    <main className="relative text-[#f5f5f5] overflow-x-hidden">
      <WorkProjectsSchema />
      <WorkHeroSection />
      <WorkProjectsSection />
    </main>
  );
}
