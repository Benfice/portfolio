import { defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "À propos",
  type: "document",
  fields: [
    { name: "intro", title: "Introduction", type: "internationalizedArrayText" },
    {
      name: "paragraphs",
      title: "Paragraphes",
      type: "array",
      of: [
        {
          type: "object",
          name: "paragraph",
          fields: [{ name: "value", title: "Texte", type: "internationalizedArrayText" }],
          preview: {
            select: { title: "value" },
          },
        },
      ],
    },
    {
      name: "principles",
      title: "Principes",
      type: "array",
      of: [
        {
          type: "object",
          name: "principle",
          fields: [{ name: "value", title: "Texte", type: "internationalizedArrayString" }],
          preview: {
            select: { title: "value" },
          },
        },
      ],
    },
  ],
});