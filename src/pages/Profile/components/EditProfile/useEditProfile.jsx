import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { fetchPatchDataUser } from "../../../../redux/slices/currentUserSlice";
import { toast } from "sonner";

export const useEditProfile = (isOpen, setIsOpen) => {
  const dispatch = useDispatch();

  const {
    name: currentUserName,
    bio: currentUserBio,
    userUid,
  } = useSelector((state) => state.user);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Имя обязательно!")
      .min(2, "Минимум 2 символа!")
      .max(50, "Максимум 50 символов!"),
    bio: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: currentUserName,
      bio: currentUserBio,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: currentUserName,
        bio: currentUserBio,
      });
    }
  }, [isOpen, currentUserName, currentUserBio, reset]);

  const onSubmit = (data) => {
    const updates = {};
    if (data.name !== currentUserName) updates.name = data.name.trim();
    if (data.bio !== currentUserBio) updates.bio = data.bio.trim();

    if (Object.keys(updates).length === 0) {
      toast.info("Данные не изменились");
      return;
    }

    dispatch(fetchPatchDataUser({ userUid, data: updates }))
      .unwrap()
      .then(() => {
        toast.success("Данные успешно обновлены!");
        setIsOpen(false);
      })
      .catch(() => {
        toast.error("Ошибка при обновлении данных");
      });
  };

  return { register, onSubmit, handleSubmit, errors };
};
