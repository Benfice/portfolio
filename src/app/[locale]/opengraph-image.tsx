import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getProfile } from "@/lib/sanity/content";
import { pickLocalized } from "@/lib/localized";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/site";

export const alt = "Benoît Freulon — QA Lead & Photographe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const activeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  const profile = await getProfile();
  const role = pickLocalized(profile.role, activeLocale);
  const host = new URL(getBaseUrl()).host;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf8",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 8,
              borderRadius: 999,
              background: "#1d4ed8",
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 80,
              lineHeight: 1.05,
              color: "#1c1917",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 40,
              color: "#57534e",
            }}
          >
            {role}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#1d4ed8" }}>
          {host}
        </div>
      </div>
    ),
    size,
  );
}
