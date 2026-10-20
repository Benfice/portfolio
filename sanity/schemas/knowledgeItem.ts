import { defineType } from "sanity";

export const knowledgeItem = defineType({
  name: "knowledgeItem",
  title: "Élément de connaissance",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "internationalizedArrayString", validation: (rule) => rule.required() },
    { name: "shortDescription", title: "Description courte", type: "internationalizedArrayText" },
    { name: "definition", title: "Définition", type: "internationalizedArrayText" },
    { name: "explanation", title: "Explication", type: "internationalizedArrayText" },
    { name: "example", title: "Exemple", type: "internationalizedArrayText" },
    { name: "practicalApplication", title: "Application pratique", type: "internationalizedArrayText" },
    { name: "domain", title: "Domaine principal", type: "reference", to: { type: "domain" }, validation: (rule) => rule.required() },
    { name: "domains", title: "Domaines supplémentaires", type: "array", of: [{ type: "reference", to: { type: "domain" } }] },
    { name: "category", title: "Catégorie/Sous-domaine", type: "internationalizedArrayString" },
    {
      name: "status",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "Pratiqué professionnellement", value: "practiced_professionally" },
          { title: "Pratiqué en projets personnels", value: "practiced_personal" },
          { title: "En apprentissage", value: "learning" },
          { title: "Connaissance théorique", value: "theoretical" },
        ],
      },
    },
    { name: "order", title: "Ordre", type: "number" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "imageAlt", title: "Texte alternatif de l'image", type: "internationalizedArrayText" },
    { name: "relatedKnowledge", title: "Connaissances liées", type: "array", of: [{ type: "reference", to: { type: "knowledgeItem" } }] },
    { name: "relatedProjects", title: "Projets liés", type: "array", of: [{ type: "reference", to: { type: "project" } }] },
    { name: "relatedExperiences", title: "Expériences liées", type: "array", of: [{ type: "reference", to: { type: "experience" } }] },
    { name: "relatedTools", title: "Outils associés", type: "array", of: [{ type: "string" }] },
    {
      name: "externalResources",
      title: "Ressources externes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Libellé", type: "internationalizedArrayString" },
            { name: "href", title: "URL", type: "url" },
            { name: "internal", title: "Lien interne", type: "boolean", initialValue: false },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: unknown }) {
      return {
        title: Array.isArray(title)
          ? (title.find((t: { language?: string; value?: string }) => t?.language === "fr")?.value ||
              (title[0] as { value?: string })?.value ||
              "Élément")
          : "Élément",
      };
    },
  },
});
