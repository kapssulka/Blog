import InputForm from "../components/InputForm.js";

import AuthRedirectMessage from "../components/AuthRedirectMessage.js";
import ButtonOrange from "../../../components/orangeButton/ButtonOrange.js";
import type { RegisterFormInput } from "../../../utils/validation.js";

interface RegisterUIProps {
  onSubmit: any;
  register: any;
  errors: any;
}

export default function RegisterUI({
  onSubmit,
  register,
  errors,
}: RegisterUIProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="
    flex flex-col
    p-10 bg-zinc-900 h-auto rounded-2xl
    max-w-[800px] w-full
    "
    >
      <div className="flex flex-col gap-y-10">
        <InputForm<RegisterFormInput>
          register={register}
          label="Имя"
          placeholder="Введите ваше имя..."
          name="name"
          errors={errors?.name}
        />

        <InputForm<RegisterFormInput>
          register={register}
          label="Email"
          placeholder="Введите ваш email..."
          name="email"
          errors={errors?.email}
        />

        <InputForm<RegisterFormInput>
          register={register}
          label="Пароль"
          placeholder="Придумайте пароль..."
          name="password"
          errors={errors?.password}
        />
      </div>

      <ButtonOrange
        typeButton="submit"
        text="Зарегестрироваться"
        className="max-w-[500px] w-full self-center mt-12"
      />

      <AuthRedirectMessage
        message="Уже есть аккаунт? Самое время"
        textLink="войти!"
        to="/login"
        className="mt-10"
      />
    </form>
  );
}
