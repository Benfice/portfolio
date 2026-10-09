import type { Localized } from "./types";

export type Education = {
  school: string;
  degree: Localized;
  period: Localized;
  location: Localized;
};

export const education: Education[] = [
  {
    school: "ESC Troyes",
    degree: {
      fr: "Master — Commerce & Management, Innovation & Entrepreneuriat",
      en: "Master's Degree — Commerce & Management, Innovation & Entrepreneurship",
      sr: "Master — Trgovina i menadžment, inovacije i preduzetništvo",
    },
    period: {
      fr: "2008 — 2011",
      en: "2008 — 2011",
      sr: "2008 — 2011",
    },
    location: {
      fr: "Troyes, France",
      en: "Troyes, France",
      sr: "Troa, Francuska",
    },
  },
  {
    school: "Ferris State University",
    degree: {
      fr: "Programme d'échange — Business / Management",
      en: "Exchange Program — Business / Management",
      sr: "Program razmene — Biznis / Menadžment",
    },
    period: {
      fr: "Août 2009 — Déc. 2009",
      en: "Aug 2009 — Dec 2009",
      sr: "Avg 2009 — Dec 2009",
    },
    location: {
      fr: "Big Rapids, États-Unis",
      en: "Big Rapids, USA",
      sr: "Big Rapids, SAD",
    },
  },
  {
    school: "Lycée Montaigne",
    degree: {
      fr: "Classes préparatoires — Économie & Commerce",
      en: "Preparatory Classes — Economics & Business",
      sr: "Pripremne klase — Ekonomija i biznis",
    },
    period: {
      fr: "2006 — 2008",
      en: "2006 — 2008",
      sr: "2006 — 2008",
    },
    location: {
      fr: "Bordeaux, France",
      en: "Bordeaux, France",
      sr: "Bordo, Francuska",
    },
  },
];