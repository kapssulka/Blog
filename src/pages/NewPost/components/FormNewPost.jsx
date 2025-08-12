import { useForm } from "react-hook-form";
import ButtonOrange from "../../../components/ButtonOrange";
import TitlePage from "../../../components/TitlePage";
import TextareaForm from "../../../features/auth/components/TextareaForm";
import FileInput from "./FileInput";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

export default function FormNewPost() {
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
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
          text="Добавть пост"
          className="max-w-[400px] w-full self-center"
        />
      </form>
    </div>
  );
}
