import type { Album } from "@/content/photos";
import type { Profile } from "@/content/profile";
import { pickLocalized } from "@/lib/localized";

export type JsonLdObject = Record<string, unknown>;

export function buildHomeGraph({
  base,
  locale,
  profile,
}: {
  base: string;
  locale: string;
  profile: Profile;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name: profile.name,
        alternateName: "Benoit Freulon",
        jobTitle: pickLocalized(profile.role, locale),
        email: `mailto:${profile.email}`,
        url: `${base}/${locale}`,
        image: `${base}/${locale}/opengraph-image`,
        knowsLanguage: ["fr", "en", "sr"],
        knowsAbout: [
          "Software quality assurance",
          "Test automation",
          "Photography",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Novi Sad",
          addressCountry: "RS",
        },
        sameAs: profile.socials.map((social) => social.href),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: profile.name,
        inLanguage: locale,
        publisher: { "@id": `${base}/#person` },
      },
    ],
  };
}

export function buildBreadcrumbs({
  base,
  locale,
  items,
}: {
  base: string;
  locale: string;
  items: { name: string; path: string }[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base}/${locale}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function buildImageGallery({
  locale,
  albums,
  pageUrl,
  pageName,
}: {
  locale: string;
  albums: Album[];
  pageUrl: string;
  pageName: string;
}): JsonLdObject {
  const images = albums
    .flatMap((album) => album.photos)
    .filter((photo) => Boolean(photo.src))
    .map((photo) => {
      const title = pickLocalized(photo.title, locale);
      return {
        "@type": "ImageObject",
        contentUrl: photo.src as string,
        name: title,
        caption: `${title} — ${photo.location}, ${photo.year}`,
        contentLocation: { "@type": "Place", name: photo.location },
      };
    });

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: pageName,
    url: pageUrl,
    image: images,
  };
}
