import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../utils/validation";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { fetchPostDataUsers } from "../../../redux/slices/currentUserSlice";

export const useRegisterForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema), mode: "onBlur" });

  const onSubmit = async (data) => {
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
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Пользователь с таким email уже зарегистрирован");
      } else {
        toast.error("Ошибка регистрации: " + error.message);
      }
    }
  };

  return { register, onSubmit, handleSubmit, errors };
};
