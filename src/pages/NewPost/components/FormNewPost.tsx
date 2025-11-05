import { useForm, type SubmitHandler } from "react-hook-form";
import TitlePage from "../../../components/TitlePage.js";
import TextareaForm from "../../../features/auth/components/TextareaForm.js";
import ButtonOrange from "../../../components/orangeButton/ButtonOrange.js";
// @ts-ignore
import FileInput from "./FileInput.js";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { uploadToSupabaseStorage } from "../../../supabase/services/storageService.js";
import {
  addLastPost,
  createPost,
  uploadImages,
} from "../../../redux/slices/postsSlice.js";
import { toast } from "sonner";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks.js";

const schema = yup.object().shape({
  file: yup
    .array()
    .min(1, "Добавьте хотя бы одно фото")
    .max(5, "Можно загрузить не более 5 фото")
    .required("Это поле обязательно"),

  description: yup.string().required("Описание не может быть пустым"),
});

type FormData = yup.InferType<typeof schema>;

export default function FormNewPost() {
  const [files, setFiles] = useState([]);
  const dispatch = useAppDispatch();
  const { user_uid } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: "onBlur" });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
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
        // @ts-ignore
        await dispatch(uploadImages(imageRow)).unwrap();
      }
      dispatch(addLastPost());

      toast.success("Пост успешно добавлен!");
    } catch (error) {
      // @ts-ignore
      toast.error("Ошибка при создании поста:", error);

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
        {/* @ts-ignore */}
        <TextareaForm
          placeholder="Введите описание..."
          className="mb-3"
          register={register}
          name={"description"}
          errors={errors.description}
        />
        <FileInput
          control={control}
          name="file"
          errors={errors.file}
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
