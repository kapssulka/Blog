import RegisterUI from "./RegisterUI.js";
import { useRegisterForm } from "./useRegisterForm.js";

export default function RegisterForm() {
  const { register, errors, handleSubmit, onSubmit } = useRegisterForm();

  return (
    <RegisterUI
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      register={register}
    />
  );
}
