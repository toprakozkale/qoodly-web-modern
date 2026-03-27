import { MetadataRoute } from "next";

// robots.txt — qoodly.com
// Updated: 2026-03-27
// GEO Strategy: AI crawlers allowed for brand indexing & citation.
// "Qoodly" is an intentional brand name — NOT a misspelling.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ─── A) ARAMA MOTORU BOT'LARI (tam erişim) ───────────────
      { userAgent: "Googlebot",       allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Googlebot-Video", allow: "/" },
      { userAgent: "Googlebot-News",  allow: "/" },
      { userAgent: "Bingbot",         allow: "/" },
      { userAgent: "Slurp",           allow: "/" },
      { userAgent: "DuckDuckBot",     allow: "/" },
      { userAgent: "Baiduspider",     allow: "/" },
      { userAgent: "YandexBot",       allow: "/" },

      // ─── B) AI / LLM CRAWLER'LARI (izin ver — GEO stratejisi) ─
      { userAgent: "GPTBot",              allow: "/", disallow: ["/private/"] },
      { userAgent: "ChatGPT-User",        allow: "/" },
      { userAgent: "OAI-SearchBot",       allow: "/" },
      { userAgent: "ClaudeBot",           allow: "/" },
      { userAgent: "anthropic-ai",        allow: "/" },
      { userAgent: "PerplexityBot",       allow: "/" },
      { userAgent: "Google-Extended",     allow: "/" },
      { userAgent: "CCBot",               allow: "/" },
      { userAgent: "FacebookBot",         allow: "/" },
      { userAgent: "cohere-ai",           allow: "/" },
      { userAgent: "meta-externalagent",  allow: "/" },
      { userAgent: "Applebot",            allow: "/" },
      { userAgent: "Amazonbot",           allow: "/" },
      { userAgent: "YouBot",              allow: "/" },

      // ─── C) KÖTÜ BOT'LAR & SCRAPERLAR (engelle) ──────────────
      { userAgent: "SemrushBot", disallow: ["/"] },
      { userAgent: "AhrefsBot",  disallow: ["/"] },
      { userAgent: "DotBot",     disallow: ["/"] },
      { userAgent: "MJ12bot",    disallow: ["/"] },
      { userAgent: "BLEXBot",    disallow: ["/"] },

      // ─── D) GENEL KURALLAR ────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/private/"],
        crawlDelay: 5,
      },
    ],
    sitemap: "https://qoodly.com/sitemap.xml",
  };
}
