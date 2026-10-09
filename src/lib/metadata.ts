import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export function localeAlternates(path: string): Metadata["alternates"] {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `/${locale}${suffix}`;
  }

  return { languages };
}
