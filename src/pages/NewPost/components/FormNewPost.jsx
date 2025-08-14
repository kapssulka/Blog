import { useForm } from "react-hook-form";
import ButtonOrange from "../../../components/ButtonOrange";
import TitlePage from "../../../components/TitlePage";
import TextareaForm from "../../../features/auth/components/TextareaForm";
import FileInput from "./FileInput";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { uploadToSupabaseStorage } from "../../../supabase/services/storageService";
import { useDispatch, useSelector } from "react-redux";
import { createPost, uploadImages } from "../../../redux/slices/postsSlice";
import { toast } from "sonner";

export default function FormNewPost() {
  const dispatch = useDispatch();
  const { userUid } = useSelector((state) => state.user);

  const schema = yup.object().shape({
    file: yup
      .array()
      .min(1, "Добавьте хотя бы одно фото")
      .max(5, "Можно загрузить не более 5 фото")
      .required("Это поле обязательно"),

    description: yup.string().min(1, "Описание не может быть пустым"),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      const text = data.description;
      const files = data.file;

      const urls = await uploadToSupabaseStorage(files);

      const createPostResult = await dispatch(
        createPost({ user_uid: userUid, text })
      ).unwrap();

      const postId = createPostResult[0].id;

      for (let i = 0; i < urls.length; i++) {
        const imageRow = {
          post_id: postId,
          image_url: urls[i],
          position: i,
          is_main: i === 0,
        };

        await dispatch(uploadImages(imageRow)).unwrap();
      }

      toast.success("Пост успешно добавлен!");
    } catch (error) {
      toast.error("Ошибка при создании поста:", error);

      console.error("Ошибка при создании поста:", error);
    }
    reset();
  };

  return (
    <div>
      <TitlePage text="Новый пост" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col mt-5"
      >
        <TextareaForm
          placeholder="Введите описание..."
          className="mb-3"
          register={register}
          name={"description"}
          errors={errors.description}
        />
        <FileInput control={control} name="file" errors={errors.file} />
        <ButtonOrange
          isButton
          typeButton="submit"
          text="Добавить пост"
          className="max-w-[400px] w-full self-center"
        />
      </form>
    </div>
  );
}
