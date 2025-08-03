import EditProfileUI from "./EditProfileUI";
import { useEditProfile } from "./useEditProfile";

export default function EditProfile({ isOpen, setIsOpen }) {
  const { errors, register, onSubmit, handleSubmit } = useEditProfile(
    isOpen,
    setIsOpen
  );

  const props = {
    errors,
    register,
    onSubmit: handleSubmit(onSubmit),
    isOpen,
    setIsOpen,
  };

  return <EditProfileUI {...props} />;
}
