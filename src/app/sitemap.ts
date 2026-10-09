import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/site";

const routes = [
  "",
  "/photography",
  "/qa",
  "/knowledge",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
