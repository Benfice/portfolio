import type { Localized } from "./types";

export type Project = {
  name: string;
  description: Localized;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Framework E2E Playwright",
    description: {
      fr: "Un socle de tests de bout en bout réutilisable, avec fixtures et rapports lisibles.",
      en: "A reusable end-to-end test foundation with fixtures and readable reports.",
      sr: "Višekratna osnova za end-to-end testove sa fixture-ima i čitljivim izveštajima.",
    },
    tags: ["Playwright", "TypeScript", "CI"],
  },
  {
    name: "Stratégie de test API",
    description: {
      fr: "Contrats, tests de contrat et scénarios de non-régression pour une API SaaS.",
      en: "Contracts, contract tests and regression scenarios for a SaaS API.",
      sr: "Ugovori, contract testovi i scenariji regresije za SaaS API.",
    },
    tags: ["REST", "Contrats", "Python"],
  },
  {
    name: "Tableau de bord qualité",
    description: {
      fr: "Indicateurs de qualité (couverture, flakiness, temps de retour) agrégés en CI.",
      en: "Quality metrics (coverage, flakiness, feedback time) aggregated in CI.",
      sr: "Metrike kvaliteta (pokrivenost, flakiness, vreme povratne informacije) u CI-ju.",
    },
    tags: ["Métriques", "GitHub Actions", "Dashboards"],
  },
];
