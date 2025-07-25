import { useForm } from "react-hook-form";
import ButtonOrange from "../../components/ButtonOrange";
import InputForm from "./components/InputForm";
import { createValidationObj } from "../../utils/createValidationObj";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Форма отправлена");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
    flex flex-col
    p-10 bg-zinc-900 h-auto rounded-2xl
    max-w-[800px] w-full
    "
    >
      <div className="flex flex-col gap-y-10">
        <InputForm
          validationObj={createValidationObj()}
          register={register}
          label="Имя"
          placeholder="Введите ваше имя..."
          name="name"
          errors={errors?.name}
        />

        <InputForm
          validationObj={createValidationObj()}
          register={register}
          label="Email"
          placeholder="Введите ваш email..."
          name="email"
          errors={errors?.email}
        />

        <InputForm
          validationObj={createValidationObj()}
          register={register}
          label="Пароль"
          placeholder="Придумайте пароль..."
          name="password"
          errors={errors?.password}
        />
      </div>

      <ButtonOrange
        isButton
        text="Зарегестрироваться"
        className="max-w-[500px] w-full self-center mt-12"
      />
    </form>
  );
}
