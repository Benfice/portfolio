import { defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Expérience",
  type: "document",
  fields: [
    { name: "company", title: "Entreprise", type: "string", validation: (rule) => rule.required() },
    { name: "role", title: "Rôle", type: "internationalizedArrayString" },
    { name: "period", title: "Période", type: "internationalizedArrayString" },
    { name: "location", title: "Lieu", type: "internationalizedArrayString" },
    { name: "summary", title: "Résumé", type: "internationalizedArrayText" },
    { name: "earlier", title: "Expérience antérieure", type: "boolean", initialValue: false },
    { name: "order", title: "Ordre", type: "number" },
    {
      name: "highlights",
      title: "Points clés",
      type: "array",
      of: [
        {
          type: "object",
          name: "highlight",
          fields: [{ name: "text", title: "Texte", type: "internationalizedArrayString" }],
          preview: {
            select: { title: "text" },
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: "company", subtitle: "order" },
  },
});