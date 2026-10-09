import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "sr"],
  defaultLocale: "fr",
});

export type Locale = (typeof routing.locales)[number];
