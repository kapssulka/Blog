import LogoutButton from "../../components/Logout/LogoutButton.js";
import { useAppSelector } from "../../hooks/reduxHooks.js";
import type { SetState } from "../../types/utils.types.js";
import BurgerNavItem from "./BurgerNavItem.js";

interface BurgerNavProps {
  setOpen: SetState<boolean>;
}

export default function BurgerNav({ setOpen }: BurgerNavProps) {
  const { user_uid } = useAppSelector((state) => state.user);

  const listItems = [
    { name: "Главная", path: `/`, isBlank: false },
    { name: "Профиль", path: `/profile/${user_uid}`, isBlank: false },
    {
      name: "Ссылка на Git проекта",
      path: "https://github.com/kapssulka/Blog",
      isBlank: true,
    },
  ];

  return (
    <div className="border-t border-accent-grey-hover pt-2">
      <div className="p-4 border-b border-accent-grey-hover">
        <h2 className="text-xl font-bold">Pet-проект</h2>
        <p className="text-sm text-zinc-300 mt-1">
          Мини-социальная сеть для демонстрации навыков React
        </p>
      </div>

      <div className="flex flex-col p-4 space-y-3">
        {listItems.map((item, index) => (
          <BurgerNavItem
            key={index}
            setOpen={setOpen}
            isBlank={item.isBlank}
            to={item.path}
          >
            {item.name}
          </BurgerNavItem>
        ))}
      </div>

      <div className="flex justify-center p-4 border-t border-accent-grey-hover">
        <LogoutButton maxWidth="max-w-[500px]" />
      </div>
    </div>
  );
}
