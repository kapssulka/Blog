import imageCompression from "browser-image-compression";
import { supabase } from "../supabase.js";
import {
  decrementGlobal,
  incrementGlobal,
} from "../../redux/slices/loadingSlice.js";
import type { AppDispatch } from "../../redux/store.js";

interface ReturnUrl {
  path: string;
  publicUrl: string;
}

export const uploadToSupabaseStorage = async (
  files: File[],
  dispatch: AppDispatch
): Promise<ReturnUrl[]> => {
  // dispatch(incrementGlobal());

  const urls = [];
  for (const file of files) {
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
      fileType: "image/webp",
    };

    // @ts-ignore
    const compressedFile = await imageCompression(file, options);

    const fileName = `${crypto.randomUUID()}.webp`;

    const path = `images/${fileName}`;

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(path, compressedFile);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("posts").getPublicUrl(path);

    urls.push({ publicUrl, path });
  }
  // dispatch(decrementGlobal());

  return urls;
};

export async function uploadAvatarToSupabaseStorage(
  file: File,
  dispatch: AppDispatch
): Promise<ReturnUrl> {
  dispatch(incrementGlobal());

  const fileName = `${crypto.randomUUID()}.webp`;

  const path = `images/${fileName}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(path, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(path);

  dispatch(decrementGlobal());

  return { publicUrl, path };
}

export const removeFromSupabaseStorage = async (
  arrPath: string[] | string,
  bucket: string | null = null,
  folder: string = "images"
) => {
  if (!bucket) throw new Error("Укажите имя 'bucket'");

  const paths = Array.isArray(arrPath) ? arrPath : [arrPath];

  return await supabase.storage.from(bucket).remove(paths);
};
