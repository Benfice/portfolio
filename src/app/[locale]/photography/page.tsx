import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { albums, type PhotoRatio } from "@/content/photos";
import { pickLocalized } from "@/lib/localized";
import { localeAlternates } from "@/lib/metadata";

const ratioClass: Record<PhotoRatio, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Photography" });

  return {
    title: t("title"),
    description: t("lead"),
    alternates: localeAlternates("/photography"),
  };
}

export default async function PhotographyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Photography");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      {albums.map((album) => (
        <Section key={album.id} className="pt-0">
          <Container>
            <SectionHeading
              title={pickLocalized(album.title, locale)}
              description={pickLocalized(album.description, locale)}
            />
            <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
              {album.photos.map((photo) => {
                const title = pickLocalized(photo.title, locale);
                const label = `${title} — ${photo.location}, ${photo.year}`;

                return (
                  <figure
                    key={photo.id}
                    className="mb-6 break-inside-avoid"
                  >
                    <div
                      className={`overflow-hidden rounded-xl border border-border ${ratioClass[photo.ratio]}`}
                    >
                      <PhotoPlaceholder id={photo.id} label={label} />
                    </div>
                    <figcaption className="mt-3 text-sm">
                      <span>{title}</span>
                      <span className="text-muted">
                        {" "}
                        · {photo.location}, {photo.year}
                      </span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
