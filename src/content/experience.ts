import type { Localized, LocalizedList } from "./types";

export type Experience = {
  company: string;
  role: Localized;
  period: Localized;
  location: Localized;
  summary: Localized;
  highlights: LocalizedList;
  earlier?: boolean;
};

export const experience: Experience[] = [
  {
    company: "PLASSIDO",
    role: {
      fr: "QA Engineer → QA Lead",
      en: "QA Engineer → QA Lead",
      sr: "QA inženjer → QA Lead",
    },
    period: {
      fr: "Janv. 2022 — aujourd'hui",
      en: "Jan 2022 — Present",
      sr: "Jan 2022 — danas",
    },
    location: {
      fr: "Novi Sad, Serbie",
      en: "Novi Sad, Serbia",
      sr: "Novi Sad, Srbija",
    },
    summary: {
      fr: "D'abord QA Engineer puis QA Lead : mise en place d'une fonction QA dans un environnement où elle n'existait pas, puis coordination de l'activité QA sur plusieurs projets du groupe Oakland.",
      en: "Started as QA Engineer and progressed to QA Lead: built a QA function where none existed, then coordinated QA across multiple Oakland Group projects.",
      sr: "Počeo kao QA inženjer i napredovao do QA Lida: uspostavio QA funkciju gde ona nije postojala, zatim koordinirao QA aktivnosti na više Oakland Group projekata.",
    },
    highlights: {
      fr: [
        "Création d'une démarche QA structurée dans une entreprise sans fonction QA dédiée.",
        "Passage d'une prise en charge individuelle à un rôle de QA Lead sur plusieurs projets.",
        "Croissance de l'organisation QA jusqu'à 6 membres : 1 QA Lead et 5 QA Engineers.",
        "Mentorat des QA Engineers vers l'autonomie, avec supervision et responsabilité finale.",
        "Mise en place de pratiques homogènes : exigences, critères d'acceptation, cas de test, anomalies et suivi QA.",
        "Reporting qualité régulier et mises à jour basées sur des KPI auprès des parties prenantes d'Oakland.",
        "Intervention sur des projets allant de la maintenance en production à des plateformes d'intégration complexes et des projets en démarrage.",
      ],
      en: [
        "Built a structured QA approach in a company where no dedicated QA function existed.",
        "Moved from individual QA ownership to a QA Lead role across multiple projects.",
        "Helped grow the QA organisation to 6 members: 1 QA Lead and 5 QA Engineers.",
        "Trained and mentored QA engineers toward autonomous ownership while keeping lead oversight.",
        "Established consistent practices around requirements, acceptance criteria, test cases, defect reporting and QA follow-up.",
        "Provided regular quality reporting and KPI-based updates to Oakland stakeholders.",
        "Worked on projects ranging from production maintenance to complex integration platforms and early development.",
      ],
      sr: [
        "Izgradio strukturisan QA pristup u kompaniji bez posebne QA funkcije.",
        "Prešao sa individualnog vlasništva nad kvalitetom na QA Lead ulogu na više projekata.",
        "Podržao rast QA organizacije na 6 članova: 1 QA Lead i 5 QA inženjera.",
        "Obuka i mentorstvo QA inženjera ka samostalnom vlasništvu, uz zadržavanje nadzora.",
        "Uspostavio dosledne prakse: zahtevi, kriterijumi prihvatanja, test slučajevi, prijava grešaka i QA praćenje.",
        "Redovno izveštavanje o kvalitetu i KPI ažuriranja za Oakland interesne strane.",
        "Radio na projektima od održavanja produkcije do složenih integracionih platformi i ranog razvoja.",
      ],
    },
  },
  {
    company: "MEDIA PRESS",
    role: {
      fr: "Rédacteur français",
      en: "French Redactor",
      sr: "Francuski redaktor",
    },
    period: {
      fr: "Janv. 2021 — Janv. 2022",
      en: "Jan 2021 — Jan 2022",
      sr: "Jan 2021 — Jan 2022",
    },
    location: {
      fr: "Novi Sad, Serbie",
      en: "Novi Sad, Serbia",
      sr: "Novi Sad, Srbija",
    },
    summary: {
      fr: "Rédaction de synopsis en français pour des films, séries, documentaires et émissions, ainsi que la préparation des maquettes d'un magazine TV.",
      en: "Wrote French synopses for movies, series, documentaries and TV shows, and prepared TV programme magazine layouts.",
      sr: "Pisanje francuskih sinopsisa za filmove, serije, dokumentarce i TV emisije, kao i priprema rasporeda TV programa časopisa.",
    },
    highlights: {
      fr: [
        "Synopsis rédigés sous contraintes strictes de longueur et de délais.",
        "Coordination et gestion d'une équipe de 5 à 10 personnes.",
        "Environnement : Adobe InDesign, logiciel interne de métadonnées.",
      ],
      en: [
        "Wrote synopses under strict character-count and deadline constraints.",
        "Coordinated and managed a team of 5 to 10 people.",
        "Environment: Adobe InDesign, internal metadata software.",
      ],
      sr: [
        "Sinopsisi pisani pod strogim ograničenjima dužine teksta i rokova.",
        "Koordinacija i upravljanje timom od 5 do 10 osoba.",
        "Okruženje: Adobe InDesign, interni softver za metapodatke.",
      ],
    },
  },
  {
    company: "SYNECHRON",
    role: {
      fr: "QA Engineer",
      en: "QA Engineer",
      sr: "QA inženjer",
    },
    period: {
      fr: "Août 2019 — Sept. 2020",
      en: "Aug 2019 — Sep 2020",
      sr: "Avg 2019 — Sep 2020",
    },
    location: {
      fr: "Novi Sad, Serbie",
      en: "Novi Sad, Serbia",
      sr: "Novi Sad, Srbija",
    },
    summary: {
      fr: "QA sur Pacifica, application d'assurance à grande échelle (assurance de flottes de véhicules) pour Crédit Agricole, au sein d'une équipe de 5 QA sous la responsabilité d'un QA Lead.",
      en: "QA on Pacifica, a large-scale vehicle fleet insurance application for Crédit Agricole, as part of a team of 5 QA engineers under a QA Lead.",
      sr: "QA na Pacifica, aplikaciji za osiguranje auto flota velikih razmera za Crédit Agricole, u timu od 5 QA inženjera pod QA Lideom.",
    },
    highlights: {
      fr: [
        "Traduction des spécifications fonctionnelles et des user stories du français vers l'anglais pour l'équipe de développement serbe.",
        "Interface de communication entre les Business Analysts francophones et les développeurs serbes.",
        "Clarification des exigences et définition des critères d'acceptation avec les Business Analysts.",
        "Conception et maintenance des cas de test dans TestRail ; tests manuels UI, fonctionnels et de régression.",
        "Contrôles et manipulations SQL ciblées pour la préparation des tests et les investigations.",
        "Suivi des anomalies dans Jira, cérémonies Agile et démonstrations client en fin de sprint.",
      ],
      en: [
        "Translated functional specifications, user stories and requirements from French to English for the Serbian development team.",
        "Acted as a communication bridge between French-speaking Business Analysts and Serbian developers.",
        "Clarified requirements and defined acceptance criteria with the Business Analysts.",
        "Designed and maintained test cases in TestRail; extensive manual UI, functional and regression testing.",
        "Performed targeted SQL checks and data modifications for test preparation and investigations.",
        "Reported and tracked defects in Jira, and joined Agile ceremonies and end-of-sprint client demos.",
      ],
      sr: [
        "Prevod funkcionalnih specifikacija i user stories sa francuskog na engleski za srpski razvojni tim.",
        "Komunikaciona veza između francuskih Business Analysta i srpskih developera.",
        "Razjašnjavanje zahteva i definisanje kriterijuma prihvatanja sa Business Analystima.",
        "Kreiranje i održavanje test slučajeva u TestRail-u; opsežno ručno UI, funkcionalno i regresiono testiranje.",
        "Ciljane SQL provere i izmene podataka za pripremu testova i istrage.",
        "Prijava i praćenje defekata u Jira-u, Agile ceremonije i predstavljanja klijentu na kraju sprinta.",
      ],
    },
  },
  {
    company: "Centre Jules Verne",
    role: {
      fr: "Enseignant — Français langue étrangère",
      en: "Teacher — French as a Foreign Language",
      sr: "Nastavnik — Francuski kao strani jezik",
    },
    period: {
      fr: "Juil. 2018 — Juil. 2019",
      en: "Jul 2018 — Jul 2019",
      sr: "Jul 2018 — Jul 2019",
    },
    location: {
      fr: "Novi Sad, Serbie",
      en: "Novi Sad, Serbia",
      sr: "Novi Sad, Srbija",
    },
    summary: {
      fr: "Organisation d'activités en français pour des enfants de maternelle et cours de français pour adolescents et jeunes adultes.",
      en: "Organized French-language activities for kindergarten children and taught French to teenagers and young adults.",
      sr: "Organizacija aktivnosti na francuskom za decu u vrtiću i predavanje francuskog tinejdžerima i mladima.",
    },
    highlights: {
      fr: ["Activités ludiques et pédagogiques en français pour la maternelle.", "Cours de français pour adolescents et jeunes adultes."],
      en: ["Fun, educational French activities for kindergarten children.", "French classes for teenagers and young adults."],
      sr: ["Zabavne i pedagoške aktivnosti na francuskom za vrtić.", "Časovi francuskog za tinejdžere i mlade."],
    },
    earlier: true,
  },
  {
    company: "Photographe indépendant",
    role: {
      fr: "Photographe",
      en: "Photographer",
      sr: "Fotograf",
    },
    period: {
      fr: "Janv. 2017 — Juil. 2018",
      en: "Jan 2017 — Jul 2018",
      sr: "Jan 2017 — Jul 2018",
    },
    location: {
      fr: "France",
      en: "France",
      sr: "Francuska",
    },
    summary: {
      fr: "Photographe indépendant : reportages d'événements pour des entreprises et des particuliers.",
      en: "Freelance photographer: event photography for companies and individuals.",
      sr: "Samostalni fotograf: reportaže događaja za kompanije i pojedince.",
    },
    highlights: {
      fr: ["Reportages d'événements (entreprises, particuliers)."],
      en: ["Event photography (companies, individuals)."],
      sr: ["Reportaže događaja (kompanije, pojedinci)."],
    },
    earlier: true,
  },
  {
    company: "Soleil Pressé",
    role: {
      fr: "Co-gérant",
      en: "Co-Manager",
      sr: "Suupravitelj",
    },
    period: {
      fr: "Sept. 2015 — Déc. 2016",
      en: "Sep 2015 — Dec 2016",
      sr: "Sep 2015 — Dec 2016",
    },
    location: {
      fr: "Marseille, France",
      en: "Marseille, France",
      sr: "Marselj, Francuska",
    },
    summary: {
      fr: "Co-gérant d'un restaurant healthy en libre-service : préparation des plats, service client, coordination d'équipe et gestion opérationnelle.",
      en: "Co-managed the daily operations of a healthy fast-casual restaurant: food preparation, customer service, team coordination and operational management.",
      sr: "Suupravitelj zdravog restorana brze ishrane: priprema hrane, korisnički servis, koordinacija tima i operativno upravljanje.",
    },
    highlights: {
      fr: ["Préparation de salades, soupes, jus frais et desserts maison.", "Coordination d'équipe et gestion opérationnelle quotidienne."],
      en: ["Prepared homemade salads, soups, fresh juices and desserts.", "Team coordination and day-to-day operational management."],
      sr: ["Priprema domaćih salata, supa, svežih sokova i dezerta.", "Koordinacija tima i svakodnevno operativno upravljanje."],
    },
    earlier: true,
  },
  {
    company: "Maison de Sagesse — ONG",
    role: {
      fr: "Responsable communication / projets",
      en: "Communication / Projects Manager",
      sr: "Menadžer komunikacije / projekata",
    },
    period: {
      fr: "Déc. 2012 — Déc. 2014",
      en: "Dec 2012 — Dec 2014",
      sr: "Dec 2012 — Dec 2014",
    },
    location: {
      fr: "Étampes, France",
      en: "Étampes, France",
      sr: "Etamp, Francuska",
    },
    summary: {
      fr: "Gestion de la communication interne et externe et coordination de projets locaux d'aide aux enfants dans le besoin.",
      en: "Managed internal and external communication and coordinated local projects supporting children in need.",
      sr: "Upravljanje internom i eksternom komunikacijom i koordinacija lokalnih projekata podrške deci u potrebi.",
    },
    highlights: {
      fr: ["Communication interne et externe.", "Organisation de l'Assemblée générale.", "Coordination de projets locaux d'aide à l'enfance."],
      en: ["Internal and external communication.", "Organized the General Assembly.", "Coordinated local projects supporting children."],
      sr: ["Interna i eksterna komunikacija.", "Organizacija Generalne skupštine.", "Koordinacija lokalnih projekata podrške deci."],
    },
    earlier: true,
  },
];