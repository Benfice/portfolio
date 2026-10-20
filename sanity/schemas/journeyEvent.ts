import { defineField, defineType } from "sanity";

export const journeyEvent = defineType({
  name: "journeyEvent",
  title: "Parcours - Événement",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Année",
      type: "number",
      validation: (Rule) => Rule.required().min(1900).max(2100).integer(),
    }),
    defineField({
      name: "month",
      title: "Mois",
      type: "number",
      validation: (Rule) => Rule.min(1).max(12).integer(),
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "title",
      title: "Titre",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Texte alternatif de l'image",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Personnel", value: "personal" },
          { title: "Formation", value: "education" },
          { title: "Expérience professionnelle", value: "professional" },
          { title: "Photographie", value: "photography" },
          { title: "Projets", value: "projects" },
          { title: "Apprentissage", value: "learning" },
        ],
      },
    }),
    defineField({
      name: "relatedLinks",
      title: "Liens liés",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Libellé",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({ allowRelative: true, scheme: ["http", "https"] }),
            }),
            defineField({
              name: "internal",
              title: "Lien interne",
              type: "boolean",
              initialValue: false,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      month: "month",
    },
    prepare({ title, year, month }: { title?: unknown; year?: number; month?: number }) {
      const subtitle =
        year && month ? `${year}-${String(month).padStart(2, "0")}` : year ? String(year) : "";
      return {
        title: Array.isArray(title)
          ? ((title.find((t: { language?: string; value?: string }) => t?.language === "fr")?.value ||
              (title[0] as { value?: string })?.value ||
              "Événement"))
          : "Événement",
        subtitle,
      };
    },
  },
});
