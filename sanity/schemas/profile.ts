import { defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profil",
  type: "document",
  fields: [
    { name: "name", title: "Nom", type: "string", validation: (rule) => rule.required() },
    { name: "role", title: "Rôle", type: "internationalizedArrayString" },
    { name: "location", title: "Localisation", type: "internationalizedArrayString" },
    { name: "availability", title: "Disponibilité", type: "internationalizedArrayString" },
    { name: "email", title: "E-mail", type: "string", validation: (rule) => rule.email() },
    {
      name: "socials",
      title: "Réseaux",
      type: "array",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "URL", type: "url" },
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    },
  ],
});