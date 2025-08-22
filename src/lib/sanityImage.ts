import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: import.meta.env.PROJECT_ID, 
  dataset:   "production",
  apiVersion:"2025-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanity);

export function urlForImage(img: any) {
  return builder.image(img);
}
