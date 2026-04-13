import type { PostImage } from "../types/models/data.js";

export const returnMainImage = (images: PostImage[]): string => {
  return images.find((img) => img.is_main)?.url || "";
};
