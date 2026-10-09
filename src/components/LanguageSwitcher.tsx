"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("Language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        onChange={(event) =>
          router.replace(pathname, { locale: event.target.value as Locale })
        }
        className="h-9 rounded-md border border-foreground/15 bg-transparent px-2 text-sm"
      >
        {routing.locales.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
