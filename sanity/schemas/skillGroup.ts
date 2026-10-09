import { defineType } from "sanity";

export const skillGroup = defineType({
  name: "skillGroup",
  title: "Groupe de compétences",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "internationalizedArrayString" },
    { name: "order", title: "Ordre", type: "number" },
    {
      name: "items",
      title: "Compétences",
      type: "array",
      of: [
        {
          type: "object",
          name: "skill",
          fields: [{ name: "value", title: "Compétence", type: "internationalizedArrayString" }],
          preview: {
            select: { title: "value" },
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: "title" },
  },
});