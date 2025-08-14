import { supabase } from "../supabase";

export const uploadToSupabaseStorage = async (files) => {
  const urls = [];

  for (const file of files) {
    const ext = (file.name.split(".").pop() || "bin").toLowerCase();

    const fileName = `${crypto.randomUUID()}.${ext}`;
    const path = `images/${fileName}`;

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(path, file);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("posts")
      .getPublicUrl(path);

    urls.push(publicUrlData);
  }

  return urls;
};
