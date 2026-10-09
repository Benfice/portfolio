import type { Localized } from "./types";

export type PhotoRatio = "portrait" | "landscape" | "square";

export type Photo = {
  id: string;
  title: Localized;
  location: string;
  year: string;
  ratio: PhotoRatio;
};

export type Album = {
  id: string;
  title: Localized;
  description: Localized;
  photos: Photo[];
};

export const albums: Album[] = [
  {
    id: "urban-light",
    title: {
      fr: "Lumière urbaine",
      en: "Urban light",
      sr: "Urbansko svetlo",
    },
    description: {
      fr: "Rues, reflets et passages : la ville comme terrain de jeu.",
      en: "Streets, reflections and passageways: the city as a playground.",
      sr: "Ulice, odrazi i prolazi: grad kao igralište.",
    },
    photos: [
      {
        id: "urban-1",
        title: {
          fr: "Rue en pente",
          en: "Sloping street",
          sr: "Ulica na nagibu",
        },
        location: "Paris",
        year: "2024",
        ratio: "portrait",
      },
      {
        id: "urban-2",
        title: {
          fr: "Reflets",
          en: "Reflections",
          sr: "Odrazi",
        },
        location: "Lyon",
        year: "2023",
        ratio: "portrait",
      },
      {
        id: "urban-3",
        title: {
          fr: "Passage",
          en: "Passageway",
          sr: "Prolaz",
        },
        location: "Marseille",
        year: "2024",
        ratio: "square",
      },
    ],
  },
  {
    id: "horizons",
    title: {
      fr: "Horizons",
      en: "Horizons",
      sr: "Horizonti",
    },
    description: {
      fr: "Grands espaces, lignes d'horizon et lumière rasante.",
      en: "Open spaces, horizon lines and low light.",
      sr: "Otvoreni prostori, linije horizonta i nisko svetlo.",
    },
    photos: [
      {
        id: "horizon-1",
        title: {
          fr: "Côte atlantique",
          en: "Atlantic coast",
          sr: "Atlantska obala",
        },
        location: "Biarritz",
        year: "2022",
        ratio: "landscape",
      },
      {
        id: "horizon-2",
        title: {
          fr: "Champs",
          en: "Fields",
          sr: "Polja",
        },
        location: "Normandie",
        year: "2023",
        ratio: "landscape",
      },
      {
        id: "horizon-3",
        title: {
          fr: "Mer calme",
          en: "Calm sea",
          sr: "Mirno more",
        },
        location: "Croatie",
        year: "2022",
        ratio: "landscape",
      },
    ],
  },
  {
    id: "fragments",
    title: {
      fr: "Fragments",
      en: "Fragments",
      sr: "Fragmenti",
    },
    description: {
      fr: "Détails, ombres et textures saisis au plus près.",
      en: "Details, shadows and textures captured up close.",
      sr: "Detalji, senke i teksture snimljene izbliza.",
    },
    photos: [
      {
        id: "fragment-1",
        title: {
          fr: "Détail",
          en: "Detail",
          sr: "Detalj",
        },
        location: "Paris",
        year: "2023",
        ratio: "square",
      },
      {
        id: "fragment-2",
        title: {
          fr: "Ombre portée",
          en: "Cast shadow",
          sr: "Bačena senka",
        },
        location: "Lyon",
        year: "2024",
        ratio: "portrait",
      },
      {
        id: "fragment-3",
        title: {
          fr: "Textures",
          en: "Textures",
          sr: "Teksture",
        },
        location: "Paris",
        year: "2022",
        ratio: "square",
      },
    ],
  },
];
