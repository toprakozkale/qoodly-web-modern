import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr", "de", "ru"],
  defaultLocale: "en",
  localePrefix: "always",
  // Cookie adını açıkça belirt — v4'te varsayılan bazen okunmaz
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});
