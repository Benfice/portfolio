import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { albums } from "@/content/photos";
import { pickLocalized } from "@/lib/localized";
import { localeAlternates } from "@/lib/metadata";

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
            <PhotoGallery
              photos={album.photos.map((photo) => ({
                ...photo,
                title: pickLocalized(photo.title, locale),
              }))}
            />
          </Container>
        </Section>
      ))}
    </>
  );
}
