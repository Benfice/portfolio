import { defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    { name: "name", title: "Nom", type: "string", validation: (rule) => rule.required() },
    { name: "provider", title: "Organisme", type: "string" },
    { name: "order", title: "Ordre", type: "number" },
  ],
  preview: {
    select: { title: "name", subtitle: "provider" },
  },
});