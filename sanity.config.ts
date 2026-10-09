import { defineConfig } from "sanity";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "portfolio",
  title: "Portfolio — Benoît Freulon",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ title: "Contenu" }),
    internationalizedArray({
      languages: [
        { id: "fr", title: "Français" },
        { id: "en", title: "English" },
        { id: "sr", title: "Srpski" },
      ],
      defaultLanguages: ["fr"],
      fieldTypes: ["string", "text"],
    }),
  ],
  schema: { types: schemaTypes },
});