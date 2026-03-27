import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  // Explicit imports — template literals can fail to bundle in some Next.js configs
  let messages: Record<string, unknown>;
  switch (locale) {
    case "tr":
      messages = (await import("../../messages/tr.json")).default;
      break;
    case "de":
      messages = (await import("../../messages/de.json")).default;
      break;
    case "ru":
      messages = (await import("../../messages/ru.json")).default;
      break;
    default:
      messages = (await import("../../messages/en.json")).default;
  }

  return { locale, messages };
});
