import MainWrapper from "../components/layout/MainWrapper.js";
import LoginForm from "../features/auth/LoginForm.js";

export default function Login() {
  return (
    <MainWrapper className="flex flex-col items-center min-h-screen justify-center">
      <h1 className="text-4xl font-bold mb-10  xs:mt-20">Вход</h1>
      <LoginForm />
    </MainWrapper>
  );
}
