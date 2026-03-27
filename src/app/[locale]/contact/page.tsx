import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactHeroSection } from "@/components/ContactHeroSection";
import { ContactFormSection } from "@/components/ContactFormSection";

const BASE_URL = "https://qoodly.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        en: `${BASE_URL}/en/contact`,
        tr: `${BASE_URL}/tr/contact`,
        de: `${BASE_URL}/de/contact`,
        ru: `${BASE_URL}/ru/contact`,
        "x-default": `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/contact`,
    },
  };
}

export default function ContactPage() {
  return (
    <main className="relative text-[#f5f5f5] overflow-x-hidden">
      <ContactHeroSection />
      <ContactFormSection />
    </main>
  );
}
