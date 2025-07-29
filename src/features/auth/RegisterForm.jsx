import { useForm } from "react-hook-form";
import ButtonOrange from "../../components/ButtonOrange";
import InputForm from "./components/InputForm";

import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validation";
import AuthRedirectMessage from "./components/AuthRedirectMessage";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "sonner";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema), mode: "onBlur" });

  const onSubmit = async (data) => {
    const email = data?.email;
    const password = data?.password;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setTimeout(() => {
        toast.success("Регистрация прошла успешно!");
      }, 600);

      reset();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Пользователь с таким email уже зарегистрирован");
      } else {
        toast.error("Ошибка регистрации: " + error.message);
      }
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
          register={register}
          label="Имя"
          placeholder="Введите ваше имя..."
          name="name"
          errors={errors?.name}
        />

        <InputForm
          register={register}
          label="Email"
          placeholder="Введите ваш email..."
          name="email"
          errors={errors?.email}
        />

        <InputForm
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

      <AuthRedirectMessage
        message="Уже есть аккаунт? Самое время"
        textLink="войти!"
        to="/login"
        className="mt-10"
      />
    </form>
  );
}
