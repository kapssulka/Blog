import ButtonOrange from "../components/ButtonOrange.js";
import MainWrapper from "../components/layout/MainWrapper.js";

export default function NotFound() {
  return (
    <MainWrapper className="justify-center">
      <div className="flex flex-col items-center bg-zinc-900 h-full p-15 rounded-2xl mt-40">
        <h1 className="text-5xl">404 - Страница не найдена :(</h1>
        <ButtonOrange
          isLink
          text="На главную"
          className="max-w-[400px] w-full mt-10"
          to="/"
        />
      </div>
    </MainWrapper>
  );
}
