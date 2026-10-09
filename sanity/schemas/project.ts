import { defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  fields: [
    { name: "name", title: "Nom", type: "string", validation: (rule) => rule.required() },
    { name: "client", title: "Client", type: "string" },
    { name: "role", title: "Rôle", type: "internationalizedArrayString" },
    { name: "description", title: "Description", type: "internationalizedArrayText" },
    { name: "order", title: "Ordre", type: "number" },
    {
      name: "environment",
      title: "Environnement",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "client" },
  },
});