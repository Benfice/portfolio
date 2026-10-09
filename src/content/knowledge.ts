import type { Localized } from "./types";

export type Concept = {
  id: string;
  title: Localized;
  summary: Localized;
  tags: string[];
};

export type KnowledgeTheme = {
  id: string;
  title: Localized;
  description: Localized;
  concepts: Concept[];
};

export const knowledgeThemes: KnowledgeTheme[] = [
  {
    id: "quality",
    title: {
      fr: "Qualité & tests",
      en: "Quality & testing",
      sr: "Kvalitet i testiranje",
    },
    description: {
      fr: "Fondamentaux pour décider quoi tester et comment.",
      en: "Foundations for deciding what to test and how.",
      sr: "Osnove za odlučivanje šta i kako testirati.",
    },
    concepts: [
      {
        id: "test-strategy",
        title: {
          fr: "Stratégie de test",
          en: "Test strategy",
          sr: "Strategija testiranja",
        },
        summary: {
          fr: "Décider quoi tester, à quel niveau et avec quels critères d'acceptation.",
          en: "Decide what to test, at which level and with which acceptance criteria.",
          sr: "Odluči šta testirati, na kom nivou i sa kojim kriterijumima prihvatanja.",
        },
        tags: ["Stratégie"],
      },
      {
        id: "test-pyramid",
        title: {
          fr: "Pyramide des tests",
          en: "Test pyramid",
          sr: "Piramida testova",
        },
        summary: {
          fr: "Équilibrer tests unitaires, d'intégration et de bout en bout.",
          en: "Balance unit, integration and end-to-end tests.",
          sr: "Uravnoteži unit, integracione i end-to-end testove.",
        },
        tags: ["Équilibre"],
      },
      {
        id: "risk-based",
        title: {
          fr: "Tests basés sur le risque",
          en: "Risk-based testing",
          sr: "Testiranje zasnovano na riziku",
        },
        summary: {
          fr: "Prioriser l'effort là où l'impact est le plus fort.",
          en: "Focus effort where the impact is highest.",
          sr: "Usmeri napor tamo gde je uticaj najveći.",
        },
        tags: ["Priorisation"],
      },
    ],
  },
  {
    id: "automation",
    title: {
      fr: "Automatisation",
      en: "Automation",
      sr: "Automatizacija",
    },
    description: {
      fr: "Outils et pratiques pour des tests fiables et rapides.",
      en: "Tools and practices for reliable, fast tests.",
      sr: "Alati i prakse za pouzdane i brze testove.",
    },
    concepts: [
      {
        id: "fixtures",
        title: {
          fr: "Fixtures",
          en: "Fixtures",
          sr: "Fixture-i",
        },
        summary: {
          fr: "Isoler les données et les états pour des tests fiables.",
          en: "Isolate data and state for reliable tests.",
          sr: "Izoluj podatke i stanja za pouzdane testove.",
        },
        tags: ["Isolation"],
      },
      {
        id: "flakiness",
        title: {
          fr: "Flakiness",
          en: "Flakiness",
          sr: "Nestabilnost",
        },
        summary: {
          fr: "Traquer les tests instables et restaurer la confiance.",
          en: "Track unstable tests and restore trust.",
          sr: "Prati nestabilne testove i vrati poverenje.",
        },
        tags: ["Fiabilité"],
      },
      {
        id: "contract",
        title: {
          fr: "Tests de contrat",
          en: "Contract testing",
          sr: "Contract testiranje",
        },
        summary: {
          fr: "Vérifier les interfaces entre services sans tout déployer.",
          en: "Verify interfaces between services without deploying everything.",
          sr: "Proveri interfejse između servisa bez deployovanja svega.",
        },
        tags: ["API"],
      },
    ],
  },
  {
    id: "product",
    title: {
      fr: "Produit & collaboration",
      en: "Product & collaboration",
      sr: "Proizvod i saradnja",
    },
    description: {
      fr: "La qualité au-delà des tests, dans toute l'équipe.",
      en: "Quality beyond testing, across the whole team.",
      sr: "Kvalitet izvan testiranja, u celom timu.",
    },
    concepts: [
      {
        id: "shift-left",
        title: {
          fr: "Shift-left",
          en: "Shift-left",
          sr: "Shift-left",
        },
        summary: {
          fr: "Intégrer la qualité le plus tôt possible dans le cycle.",
          en: "Bring quality into the cycle as early as possible.",
          sr: "Uvedi kvalitet u ciklus što ranije.",
        },
        tags: ["Process"],
      },
      {
        id: "observability",
        title: {
          fr: "Observabilité",
          en: "Observability",
          sr: "Observabilnost",
        },
        summary: {
          fr: "Mesurer en production pour apprendre et prévenir.",
          en: "Measure in production to learn and prevent.",
          sr: "Meri u produkciji da bi učio i sprečavao.",
        },
        tags: ["Production"],
      },
      {
        id: "collaboration",
        title: {
          fr: "Collaboration",
          en: "Collaboration",
          sr: "Saradnja",
        },
        summary: {
          fr: "La qualité est une responsabilité partagée par toute l'équipe.",
          en: "Quality is a responsibility shared by the whole team.",
          sr: "Kvalitet je odgovornost celog tima.",
        },
        tags: ["Équipe"],
      },
    ],
  },
];
