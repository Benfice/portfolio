import { defineType } from "sanity";

export const domain = defineType({
  name: "domain",
  title: "Domaine de connaissances",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "internationalizedArrayString", validation: (rule) => rule.required() },
    { name: "shortDescription", title: "Description courte", type: "internationalizedArrayText" },
    { name: "description", title: "Description", type: "internationalizedArrayText" },
    { name: "order", title: "Ordre", type: "number" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "imageAlt", title: "Texte alternatif de l'image", type: "internationalizedArrayText" },
    {
      name: "relatedDomains",
      title: "Domaines liés",
      type: "array",
      of: [{ type: "reference", to: { type: "domain" } }],
    },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: { title?: unknown }) {
      return {
        title: Array.isArray(title)
          ? (title.find((t: { language?: string; value?: string }) => t?.language === "fr")?.value ||
              (title[0] as { value?: string })?.value ||
              "Domaine")
          : "Domaine",
      };
    },
  },
});
