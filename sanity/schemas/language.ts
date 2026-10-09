import { defineType } from "sanity";

export const language = defineType({
  name: "language",
  title: "Langue",
  type: "document",
  fields: [
    { name: "name", title: "Nom", type: "string", validation: (rule) => rule.required() },
    { name: "level", title: "Niveau", type: "internationalizedArrayString" },
    { name: "order", title: "Ordre", type: "number" },
  ],
  preview: {
    select: { title: "name", subtitle: "level" },
  },
});