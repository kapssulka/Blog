import MainWrapper from "../components/layout/MainWrapper.js";
import LinkAccent from "../components/accentButton/LinkAccent.js";

export default function NotFound() {
  return (
    <MainWrapper className="justify-center">
      <div className="flex flex-col items-center bg-bg-secondary h-full p-15 rounded-2xl mt-40">
        <h1 className="text-5xl">404 - Страница не найдена :(</h1>
        <LinkAccent
          text="На главную"
          className="max-w-[400px] w-full mt-10"
          to="/"
          replace
        />
      </div>
    </MainWrapper>
  );
}
