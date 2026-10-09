import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

export function getPhotoUrl(
  image: { asset?: { _ref?: string } } | null | undefined,
): string | null {
  if (!builder || !image?.asset?._ref) {
    return null;
  }
  return builder.image(image).auto("format").width(1440).quality(80).url();
}