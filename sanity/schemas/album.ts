import { defineType } from "sanity";

export const album = defineType({
  name: "album",
  title: "Album photo",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "internationalizedArrayString" },
    { name: "description", title: "Description", type: "internationalizedArrayText" },
    { name: "order", title: "Ordre", type: "number" },
    {
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "object",
          name: "photo",
          fields: [
            { name: "title", title: "Titre", type: "internationalizedArrayString" },
            { name: "location", title: "Lieu", type: "string" },
            { name: "year", title: "Année", type: "string" },
            {
              name: "ratio",
              title: "Format",
              type: "string",
              options: {
                list: [
                  { title: "Portrait", value: "portrait" },
                  { title: "Paysage", value: "landscape" },
                  { title: "Carré", value: "square" },
                ],
              },
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
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