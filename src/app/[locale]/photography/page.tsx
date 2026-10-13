import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAlbums } from "@/lib/sanity/content";
import { pickLocalized } from "@/lib/localized";
import { buildPageMetadata } from "@/lib/metadata";
import { getBaseUrl } from "@/lib/site";
import { buildBreadcrumbs, buildImageGallery } from "@/lib/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Photography" });

  return buildPageMetadata({
    locale,
    path: "/photography",
    absoluteTitle: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PhotographyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Photography");
  const nav = await getTranslations("Nav");
  const albums = await getAlbums();

  const base = getBaseUrl();
  const breadcrumbs = buildBreadcrumbs({
    base,
    locale,
    items: [
      { name: nav("home"), path: "/" },
      { name: nav("photography"), path: "/photography" },
    ],
  });
  const gallery = buildImageGallery({
    locale,
    albums,
    pageUrl: `${base}/${locale}/photography`,
    pageName: t("metaTitle"),
  });

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={gallery} />
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
