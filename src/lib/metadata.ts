import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/site";

export function localeAlternates(path: string): Metadata["alternates"] {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `/${locale}${suffix}`;
  }

  return { languages };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title?: string;
  description?: string;
}): Metadata {
  const suffix = path === "/" ? "" : path;
  const canonical = `${getBaseUrl()}/${locale}${suffix}`;

  const metadata: Metadata = {
    alternates: {
      ...localeAlternates(path),
      canonical,
    },
  };

  if (title) {
    metadata.title = title;
  }

  if (description) {
    metadata.description = description;
  }

  return metadata;
}
