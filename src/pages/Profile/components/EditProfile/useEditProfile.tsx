import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { fetchPatchDataUser } from "../../../../redux/slices/currentUserSlice.js";
import { toast } from "sonner";
import { setNewBioLocal } from "../../../../redux/slices/usersSlice.js";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/reduxHooks.js";
import type { SetState } from "../../../../types/utils.types.js";
import {
  schemaEditProfile,
  type EditProfileFormData,
} from "../../../../utils/validation.js";

interface UseEditProfileParams {
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
}

export const useEditProfile = ({ isOpen, setIsOpen }: UseEditProfileParams) => {
  const dispatch = useAppDispatch();

  const {
    name: currentUserName,
    bio: currentUserBio,
    user_uid,
  } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: yupResolver(schemaEditProfile),
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

  const onSubmit = (data: EditProfileFormData) => {
    const updates: Partial<EditProfileFormData> = {};
    if (data.name !== currentUserName) updates.name = data.name.trim();
    if (data.bio !== currentUserBio) updates.bio = data.bio.trim();

    if (Object.keys(updates).length === 0) {
      toast.info("Данные не изменились");
      return;
    }

    dispatch(fetchPatchDataUser({ user_uid, data: updates }))
      .unwrap()
      .then(() => {
        toast.success("Данные успешно обновлены!");
        setIsOpen(false);
      })
      .catch(() => {
        toast.error("Ошибка при обновлении данных");
      });

    // dispatch(setNewBioLocal({ user_uid, data: updates }));
  };

  return { register, onSubmit, handleSubmit, errors };
};
