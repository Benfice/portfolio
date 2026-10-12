"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../sanity.config";
import { isConfigured } from "@/lib/sanity/env";

export default function Studio() {
  if (!isConfigured) {
    return (
      <main style={{ padding: "3rem", fontFamily: "system-ui, sans-serif" }}>
        <h1>Sanity Studio</h1>
        <p>
          Le Studio n&apos;est pas encore configuré. Renseigne{" "}
          <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> et{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> dans <code>.env.local</code>,
          puis redémarre le serveur.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
