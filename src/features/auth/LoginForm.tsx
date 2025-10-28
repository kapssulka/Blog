import { useForm } from "react-hook-form";
import InputForm from "./components/InputForm.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type LoginFormInput } from "../../utils/validation.js";
import AuthRedirectMessage from "./components/AuthRedirectMessage.js";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setHasVisited } from "../../redux/slices/currentUserSlice.js";
import ButtonOrange from "../../components/orangeButton/ButtonOrange.js";

export default function LoginForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormInput) => {
    const email = data?.email;
    const password = data?.password;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(setHasVisited(true));

      reset();
    } catch (error) {
      toast.error("Неправильный логин или парль!");
      reset();
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
        text="Войти"
        className="max-w-[500px] w-full self-center mt-12"
        typeButton="submit"
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
