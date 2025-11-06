import { useForm, type SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  registerSchema,
  type RegisterFormData,
} from "../../../utils/validation.js";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase.js";
import { toast } from "sonner";
import { fetchPostDataUsers } from "../../../redux/slices/currentUserSlice.js";
import { useAppDispatch } from "../../../hooks/reduxHooks.js";
import { FirebaseError } from "firebase/app";

export const useRegisterForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const { email, password, name } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user_uid = userCredential.user.uid;

      await dispatch(fetchPostDataUsers({ name, user_uid })).unwrap();

      setTimeout(() => {
        toast.success(`${name}, регистрация прошла успешно!`);
      }, 600);

      reset();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Пользователь с таким email уже зарегистрирован");
        }
      } else if (error instanceof Error) {
        toast.error("Ошибка регистрации: " + error.message);
      }
    }
  };

  return { register, onSubmit, handleSubmit, errors };
};
