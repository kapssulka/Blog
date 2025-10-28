import type { ImageData } from "../types/models/data.js";

export const returnMainImage = (images: ImageData[]): string => {
  return images.find((img) => img.is_main)?.url || "";
};
