import ItemList from "../../components/ItemList.js";
import LogoutButton from "../../components/Logout/LogoutButton.js";
import TitleAccent from "../../components/UI/TitleAccent.js";
import { ROUTES } from "../../constants/routes.js";
import { useAppSelector } from "../../hooks/reduxHooks.js";
import type { SetState } from "../../types/utils.types.js";
import BurgerNavItem from "./BurgerNavItem.js";

interface BurgerNavProps {
  setOpen: SetState<boolean>;
}

export default function BurgerNav({ setOpen }: BurgerNavProps) {
  const { user_uid } = useAppSelector((state) => state.user);

  const listItems = [
    { name: "Главная", path: ROUTES.HOME, isBlank: false },
    { name: "Профиль", path: `/profile/${user_uid}`, isBlank: false },
    { name: "О проекте", path: ROUTES.ABOUT_PROJECT, isBlank: false },
    {
      name: "Ссылка на Git проекта",
      path: "https://github.com/kapssulka/Blog",
      isBlank: true,
    },
  ];

  return (
    <div className="flex flex-col h-full border-t border-white/10 bg-bg-secondary/95 backdrop-blur-md">
      {/* Лого и описание */}
      <div className=" py-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Pet-проект</h2>
        <p className="text-sm text-zinc-400 mt-1">
          Мини-социальная сеть для демонстрации навыков React
        </p>
      </div>

      {/* Навигация */}
      <nav className="flex flex-col flex-1 py-4 space-y-6 overflow-y-auto">
        {listItems.map((item, index) => (
          <BurgerNavItem
            key={item.name}
            setOpen={setOpen}
            isBlank={item.isBlank}
            to={item.path}
          >
            {item.name}
          </BurgerNavItem>
        ))}
      </nav>

      {/* Выход */}
      <div className="flex justify-center py-4 border-t border-white/10">
        <LogoutButton maxWidth="max-w-[500px]" />
      </div>
    </div>
  );
}
