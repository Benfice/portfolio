import type { Localized } from "./types";

export const profile = {
  name: "Benoît Freulon",
  role: {
    fr: "QA Lead & Photographe",
    en: "QA Lead & Photographer",
    sr: "QA Lead i fotograf",
  } satisfies Localized,
  location: {
    fr: "Novi Sad, Serbie",
    en: "Novi Sad, Serbia",
    sr: "Novi Sad, Srbija",
  } satisfies Localized,
  availability: {
    fr: "Ouvert aux missions et collaborations",
    en: "Open to missions and collaborations",
    sr: "Otvoren za saradnje i projekte",
  } satisfies Localized,
  email: "benfice@proton.me",
  socials: [
    { label: "GitHub", href: "https://github.com/Benfice" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/benoit-freulon" },
  ],
};
