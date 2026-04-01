import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarfieldBackground } from "@/components/StarfieldBackground";
import { CookieConsent } from "@/components/CookieConsent";
import { FloatingAssistantWrapper } from "@/components/FloatingAssistantWrapper";
import { locales } from "@/navigation";
import { geistSans, geistMono } from "../layout";

const BASE_URL = "https://qoodly.com";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  tr: "tr_TR",
  de: "de_DE",
  ru: "ru_RU",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? BASE_URL),
    title: {
      default: t("title"),
      template: "%s | Qoodly Software",
    },
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        tr: `${BASE_URL}/tr`,
        de: `${BASE_URL}/de`,
        ru: `${BASE_URL}/ru`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      url: `${BASE_URL}/${locale}`,
      siteName: "Qoodly Software",
      title: t("title"),
      description: t("description"),
      locale: OG_LOCALE[locale] ?? "en_US",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Qoodly Software – Web & Mobile Development Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/rback-logo-ligh.png",
      apple: "/rback-logo-ligh.png",
    },
  };
}

function GlobalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://qoodly.com/#organization",
        name: "Qoodly Software",
        url: "https://qoodly.com",
        logo: {
          "@type": "ImageObject",
          url: "https://qoodly.com/logo-dark.png",
          width: 200,
          height: 60,
        },
        description:
          "Ankara-based software agency delivering web, mobile, and AI-powered digital products for businesses worldwide.",
        foundingDate: "2024",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Çukurambar Mah. 1474. Sokak Pembe Köşk",
          addressLocality: "Ankara",
          addressRegion: "Ankara",
          postalCode: "06530",
          addressCountry: "TR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+90-541-420-15-60",
          email: "info@qoodly.com",
          contactType: "customer support",
          availableLanguage: ["English", "Turkish", "German", "Russian"],
        },
        sameAs: [
          "https://www.linkedin.com/company/qoodly/",
          "https://www.instagram.com/qoodly.io",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://qoodly.com/#website",
        url: "https://qoodly.com",
        name: "Qoodly Software",
        publisher: { "@id": "https://qoodly.com/#organization" },
        inLanguage: ["en", "tr", "de", "ru"],
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full bg-[#0a0a0a] text-[#f5f5f5]">
        <GlobalSchema />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SmoothScrollProvider>
            <StarfieldBackground />
            <Navbar />
            {children}
            <Footer />
            <CookieConsent />
            {/* <FloatingAssistantWrapper /> */}
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
