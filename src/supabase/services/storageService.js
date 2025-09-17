import imageCompression from "browser-image-compression";
import { supabase } from "../supabase";
import { decrement, increment } from "../../redux/slices/loadingSlice";

export const uploadToSupabaseStorage = async (files, dispatch) => {
  dispatch(increment());

  const urls = [];
  for (const file of files) {
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
      fileType: "image/webp",
    };

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
  dispatch(decrement());

  return urls;
};

export async function uploadAvatarToSupabaseStorage(file, dispatch) {
  dispatch(increment());

  const fileName = `${crypto.randomUUID()}.webp`;

  const path = `images/${fileName}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(path, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(path);

  dispatch(decrement());

  return { publicUrl, path };
}

export const removeFromSupabaseStorage = async (arrPath) => {
  return supabase.storage.from("posts").remove(arrPath);
};
