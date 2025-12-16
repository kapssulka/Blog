import { useForm } from "react-hook-form";
import InputForm from "./components/InputForm.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type LoginFormData } from "../../utils/validation.js";
import AuthRedirectMessage from "./components/AuthRedirectMessage.js";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setHasVisited } from "../../redux/slices/currentUserSlice.js";
import ButtonAccent from "../../components/accentButton/ButtonAccent.js";
import FormWrapper from "./FormWrapper.js";

export default function LoginForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
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
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-10">
        <InputForm<LoginFormData>
          label="Email"
          placeholder="Введите ваш email..."
          name="email"
          register={register}
          errors={errors?.email}
        />
        <InputForm<LoginFormData>
          label="Пароль"
          placeholder="Введите ваш пароль..."
          name="password"
          type="password"
          register={register}
          errors={errors?.password}
        />
      </div>

      <ButtonAccent
        text="Войти"
        className="max-w-[500px] w-full self-center mt-12"
        typeButton="submit"
      />

      <AuthRedirectMessage
        message="Ещё нет аккаунта? Самое время"
        textLink="зарегестрироваться!"
        to="/register"
        className="mt-5 xs:mt-10"
      />
    </FormWrapper>
  );
}
