import { describe, expect, it } from "vitest";
import { localeAlternates } from "@/lib/metadata";

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
