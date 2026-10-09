import { defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Formation",
  type: "document",
  fields: [
    { name: "school", title: "Établissement", type: "string", validation: (rule) => rule.required() },
    { name: "degree", title: "Diplôme", type: "internationalizedArrayString" },
    { name: "period", title: "Période", type: "internationalizedArrayString" },
    { name: "location", title: "Lieu", type: "internationalizedArrayString" },
    { name: "order", title: "Ordre", type: "number" },
  ],
  preview: {
    select: { title: "school", subtitle: "degree" },
  },
});