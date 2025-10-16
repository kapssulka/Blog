import MainWrapper from "../components/layout/MainWrapper.js";
import RegisterForm from "../features/auth/Register/RegisterForm";

export default function Register() {
  return (
    <MainWrapper className="flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 mt-40">Регистрация</h1>
      <RegisterForm />
    </MainWrapper>
  );
}
