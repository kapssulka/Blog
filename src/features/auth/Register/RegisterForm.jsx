import RegisterUI from "./RegisterUI";
import { useRegisterForm } from "./useRegisterForm";

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
