import type { Localized, LocalizedList } from "./types";

export const about = {
  intro: {
    fr: "QA Lead le jour, photographe dès que la lumière le permet : deux manières de chercher la justesse.",
    en: "QA Lead by day, photographer whenever the light allows: two ways of seeking precision.",
    sr: "QA Lead danju, fotograf kad god svetlo dozvoli: dva načina da se traži preciznost.",
  } satisfies Localized,
  paragraphs: {
    fr: [
      "Depuis plusieurs années, j'aide les équipes produit à livrer des logiciels auxquels on peut se fier. Mon travail part d'une question simple : qu'est-ce qui pourrait mal tourner, et comment le détecter assez tôt ?",
      "La photographie m'apprend la même patience : observer, composer, attendre le bon moment. Ce portfolio rassemble ces deux facettes et la carte de connaissances qui les relie.",
    ],
    en: [
      "For several years I have helped product teams ship software people can trust. My work starts with a simple question: what could go wrong, and how can we catch it early enough?",
      "Photography teaches me the same patience: observe, compose, wait for the right moment. This portfolio brings those two facets together, along with the knowledge map that connects them.",
    ],
    sr: [
      "Već nekoliko godina pomažem produktnim timovima da isporuče softver u koji se može verovati. Moj rad počinje jednostavnim pitanjem: šta može poći naopako i kako to otkriti dovoljno rano?",
      "Fotografija me uči istoj strpljivosti: posmatraj, komponuj, sačekaj pravi trenutak. Ovaj portfolio spaja ta dva aspekta i mapu znanja koja ih povezuje.",
    ],
  } satisfies LocalizedList,
  principles: {
    fr: [
      "Qualité par défaut, pas par obligation",
      "Automatiser ce qui se répète",
      "Documenter pour transmettre",
      "Regarder avant de juger",
    ],
    en: [
      "Quality by default, not by obligation",
      "Automate what repeats",
      "Document to pass it on",
      "Look before judging",
    ],
    sr: [
      "Kvalitet podrazumevano, ne po obavezi",
      "Automatizuj ono što se ponavlja",
      "Dokumentuj da bi preneo",
      "Pogledaj pre nego što prosudiš",
    ],
  } satisfies LocalizedList,
};
