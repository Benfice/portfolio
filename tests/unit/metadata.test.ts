import { afterEach, describe, expect, it } from "vitest";
import { buildPageMetadata, localeAlternates } from "@/lib/metadata";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
});

describe("localeAlternates", () => {
  it("builds a language map for the home path", () => {
    expect(localeAlternates("/")).toEqual({
      languages: { fr: "/fr", en: "/en", sr: "/sr" },
    });
  });

  it("keeps the path for inner pages", () => {
    expect(localeAlternates("/qa")).toEqual({
      languages: { fr: "/fr/qa", en: "/en/qa", sr: "/sr/qa" },
    });
  });
});

describe("buildPageMetadata", () => {
  it("adds a canonical URL alongside the language map", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    const metadata = buildPageMetadata({
      locale: "fr",
      path: "/qa",
      title: "Qualité",
      description: "Description",
    });

    expect(metadata.title).toBe("Qualité");
    expect(metadata.description).toBe("Description");
    expect(metadata.alternates).toEqual({
      canonical: "https://example.com/fr/qa",
      languages: { fr: "/fr/qa", en: "/en/qa", sr: "/sr/qa" },
    });
  });

  it("omits the path suffix for the home page", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    const metadata = buildPageMetadata({ locale: "en", path: "/" });

    expect(metadata.alternates?.canonical).toBe("https://example.com/en");
  });

  it("does not set title or description when omitted", () => {
    const metadata = buildPageMetadata({ locale: "sr", path: "/" });

    expect(metadata).not.toHaveProperty("title");
    expect(metadata).not.toHaveProperty("description");
  });
});
