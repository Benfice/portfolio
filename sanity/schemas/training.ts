import { defineType } from "sanity";

export const training = defineType({
  name: "training",
  title: "Formation continue",
  type: "document",
  fields: [
    { name: "providerTitle", title: "Titre des plateformes", type: "string", initialValue: "OpenClassrooms · Udemy" },
    {
      name: "topics",
      title: "Thèmes",
      type: "array",
      of: [
        {
          type: "object",
          name: "topic",
          fields: [{ name: "value", title: "Thème", type: "internationalizedArrayString" }],
          preview: {
            select: { title: "value" },
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: "providerTitle" },
  },
});