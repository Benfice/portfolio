import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slugify";

describe("slugify", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(slugify("Photographie de Rue")).toBe("photographie-de-rue");
  });

  it("removes accents", () => {
    expect(slugify("Été à Paris")).toBe("ete-a-paris");
  });

  it("trims leading and trailing separators", () => {
    expect(slugify("  --Hello World!!  ")).toBe("hello-world");
  });
});
