import { useForm } from "react-hook-form";
import ButtonOrange from "../../components/ButtonOrange";
import InputForm from "./components/InputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validation";
import AuthRedirectMessage from "./components/AuthRedirectMessage";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onBlur" });

  const onSubmit = async (data) => {
    const email = data?.email;
    const password = data?.password;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Вход выполнен успешно!");

      reset();
    } catch (error) {
      console.error("Ошибка входа:", error.code, error.message);
    }
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
          label="Email"
          placeholder="Введите ваш email..."
          name="email"
          register={register}
          errors={errors?.email}
        />
        <InputForm
          label="Пароль"
          placeholder="Введите ваш пароль..."
          name="password"
          register={register}
          errors={errors?.password}
        />
      </div>

      <ButtonOrange
        isButton
        text="Войти"
        className="max-w-[500px] w-full self-center mt-12"
      />

      <AuthRedirectMessage
        message="Ещё нет аккаунта? Самое время"
        textLink="зарегестрироваться!"
        to="/register"
        className="mt-10"
      />
    </form>
  );
}
