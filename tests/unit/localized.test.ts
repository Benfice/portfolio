import { describe, expect, it } from "vitest";
import { pickLocalized, pickLocalizedList } from "@/lib/localized";

const value = { fr: "bonjour", en: "hello", sr: "zdravo" };
const list = { fr: ["a"], en: ["b"], sr: ["c"] };

describe("pickLocalized", () => {
  it("returns the value for the requested locale", () => {
    expect(pickLocalized(value, "en")).toBe("hello");
  });

  it("falls back to French for an unknown locale", () => {
    expect(pickLocalized(value, "de")).toBe("bonjour");
  });
});

describe("pickLocalizedList", () => {
  it("returns the list for the requested locale", () => {
    expect(pickLocalizedList(list, "sr")).toEqual(["c"]);
  });

  it("falls back to French for an unknown locale", () => {
    expect(pickLocalizedList(list, "de")).toEqual(["a"]);
  });
});
