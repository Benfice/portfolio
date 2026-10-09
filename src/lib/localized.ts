import type { Localized, LocalizedList } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export function pickLocalized(value: Localized, locale: string): string {
  return value[locale as Locale] ?? value.fr;
}

export function pickLocalizedList(
  value: LocalizedList,
  locale: string,
): string[] {
  return value[locale as Locale] ?? value.fr;
}
