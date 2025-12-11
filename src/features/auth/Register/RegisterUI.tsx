import InputForm from "../components/InputForm.js";

import AuthRedirectMessage from "../components/AuthRedirectMessage.js";
import ButtonOrange from "../../../components/orangeButton/ButtonOrange.js";
import type { RegisterFormData } from "../../../utils/validation.js";
import FormWrapper from "../FormWrapper.js";

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
    <FormWrapper onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-10">
        <InputForm<RegisterFormData>
          register={register}
          label="Имя"
          placeholder="Введите ваше имя..."
          name="name"
          errors={errors?.name}
        />

        <InputForm<RegisterFormData>
          register={register}
          label="Email"
          placeholder="Введите ваш email..."
          name="email"
          type="email"
          errors={errors?.email}
        />

        <InputForm<RegisterFormData>
          register={register}
          label="Пароль"
          placeholder="Придумайте пароль..."
          type="password"
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
    </FormWrapper>
  );
}
