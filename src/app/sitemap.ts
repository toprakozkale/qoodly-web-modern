import { MetadataRoute } from "next";

const BASE_URL = "https://qoodly.com";
const locales = ["en", "tr", "de", "ru"];

const pages = [
  { path: "",         priority: 1.0, changeFreq: "weekly"  as const },
  { path: "/about",   priority: 0.8, changeFreq: "monthly" as const },
  { path: "/work",    priority: 0.9, changeFreq: "weekly"  as const },
  { path: "/contact", priority: 0.6, changeFreq: "yearly"  as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales.map((l) => [l, `${BASE_URL}/${l}${page.path}`])
            ),
            "x-default": `${BASE_URL}/en${page.path}`,
          },
        },
      });
    }
  }

  // 16 URL toplam: 4 dil × 4 sayfa, her birinde hreflang alternates gömülü
  return entries;
}
