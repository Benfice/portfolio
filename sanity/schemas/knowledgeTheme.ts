import { defineType } from "sanity";

export const knowledgeTheme = defineType({
  name: "knowledgeTheme",
  title: "Thème de connaissances",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "internationalizedArrayString" },
    { name: "description", title: "Description", type: "internationalizedArrayText" },
    { name: "order", title: "Ordre", type: "number" },
    {
      name: "concepts",
      title: "Concepts",
      type: "array",
      of: [
        {
          type: "object",
          name: "concept",
          fields: [
            {
              name: "id",
              title: "Identifiant technique",
              type: "string",
              description: "Identifiant stable utilisé par l'application (ex. test-strategy).",
            },
            { name: "title", title: "Titre", type: "internationalizedArrayString" },
            { name: "summary", title: "Résumé", type: "internationalizedArrayText" },
            {
              name: "tags",
              title: "Tags",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: "title" },
  },
});