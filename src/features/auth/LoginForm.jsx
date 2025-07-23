import ButtonOrange from "../../components/ButtonOrange";
import InputForm from "./components/InputForm";

export default function LoginForm() {
  return (
    <form
      className="
    flex flex-col
    p-10 bg-zinc-900 h-auto rounded-2xl
    max-w-[800px] w-full
    "
    >
      <div className="flex flex-col gap-y-5">
        <InputForm
          label="Email"
          placeholder="Введите ваш email..."
          name="email"
        />
        <InputForm
          label="Пароль"
          placeholder="Введите ваш пароль..."
          name="password"
        />
      </div>

      <ButtonOrange
        isButton
        text="Войти"
        className="max-w-[500px] w-full self-center mt-10"
      />
    </form>
  );
}
