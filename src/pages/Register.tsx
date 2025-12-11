import MainWrapper from "../components/layout/MainWrapper.js";
import RegisterForm from "../features/auth/Register/RegisterForm.js";

export default function Register() {
  return (
    <MainWrapper className="flex flex-col items-center h-screen justify-center">
      <h1 className="text-4xl font-bold mb-10 mt-20">Регистрация</h1>
      <RegisterForm />
    </MainWrapper>
  );
}
