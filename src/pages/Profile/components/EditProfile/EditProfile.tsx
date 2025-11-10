import type { SetState } from "../../../../types/utils.types.js";
import EditProfileUI from "./EditProfileUI.js";
import { useEditProfile } from "./useEditProfile.js";

interface EditProfileProps {
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
}

export default function EditProfile({ isOpen, setIsOpen }: EditProfileProps) {
  const { errors, register, onSubmit, handleSubmit } = useEditProfile({
    isOpen,
    setIsOpen,
  });

  const props = {
    errors,
    register,
    onSubmit: handleSubmit(onSubmit),
    isOpen,
    setIsOpen,
  };

  return <EditProfileUI {...props} />;
}
