import { useForm, type FieldError, type SubmitHandler } from "react-hook-form";
import TitlePage from "../../../components/TitlePage.js";
import TextareaForm from "../../../features/auth/components/TextareaForm.js";
import ButtonOrange from "../../../components/orangeButton/ButtonOrange.js";
import FileInput from "./FileInput.js";
import { yupResolver } from "@hookform/resolvers/yup";

import { uploadToSupabaseStorage } from "../../../supabase/services/storageService.js";
import {
  addLastPost,
  createPost,
  uploadImages,
} from "../../../redux/slices/postsSlice.js";
import { toast } from "sonner";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks.js";
import type { FileWithPreview } from "../types.js";
import {
  schemaNewPost,
  type NewPostFormData,
} from "../../../utils/validation.js";
import {
  decrementGlobal,
  incrementGlobal,
} from "../../../redux/slices/loadingSlice.js";

export default function FormNewPost() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const dispatch = useAppDispatch();
  const { user_uid } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewPostFormData>({
    resolver: yupResolver(schemaNewPost),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<NewPostFormData> = async (data) => {
    try {
      dispatch(incrementGlobal());
      const text = data.description;
      const files = data.file;

      const urls = await uploadToSupabaseStorage(files, dispatch);

      const createPostResult = await dispatch(
        createPost({ user_uid, text })
      ).unwrap();

      const post_id = createPostResult[0].post_id;

      for (let i = 0; i < urls.length; i++) {
        const urlObj = urls[i];
        if (!urlObj) continue;

        const imageRow = {
          post_id: post_id,
          url: urls[i]!.publicUrl,
          path: urls[i]!.path,
          position: i,
          is_main: i === 0,
        };
        await dispatch(uploadImages(imageRow)).unwrap();
      }
      dispatch(addLastPost());
      dispatch(decrementGlobal());

      toast.success("Пост успешно добавлен!");
    } catch (error) {
      dispatch(decrementGlobal());

      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";

      toast.error(`Ошибка при создании поста: ${message}`);
      console.error("Ошибка при создании поста:", error);
    }
    reset();
    setFiles([]);
  };

  return (
    <div>
      <TitlePage text="Новый пост" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col mt-5"
      >
        <TextareaForm<NewPostFormData>
          placeholder="Введите описание..."
          className="mb-3"
          register={register}
          name={"description"}
          errors={errors.description}
        />
        <FileInput
          control={control}
          name="file"
          errors={errors.file as FieldError | undefined}
          files={files}
          setFiles={setFiles}
        />
        <ButtonOrange
          typeButton="submit"
          text="Добавить пост"
          className="max-w-[400px] w-full self-center"
        />
      </form>
    </div>
  );
}
