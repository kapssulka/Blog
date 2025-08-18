import imageCompression from "browser-image-compression";
import { supabase } from "../supabase";

export const uploadToSupabaseStorage = async (files) => {
  const urls = [];

  for (const file of files) {
    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
      fileType: "image/webp",
    };

    console.log("Файл: ", file);

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

    urls.push(publicUrl);
  }

  return urls;
};
