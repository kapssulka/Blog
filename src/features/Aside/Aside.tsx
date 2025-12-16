import ItemList from "../../components/ItemList.js";
import { ROUTES } from "../../constants/routes.js";
import { useAppSelector } from "../../hooks/reduxHooks.js";

export default function Aside() {
  const { user_uid } = useAppSelector((state) => state.user);
  const links = [
    { text: "Добавить пост", path: ROUTES.NEW_POST },
    { text: "Главная", path: ROUTES.HOME },
    { text: "Мой профиль", path: `/profile/${user_uid}` },
    { text: "Сообщения", path: ROUTES.MESSAGE.INDEX },
    { text: "Сохраненные посты", path: ROUTES.BOOKMARKS },
    { text: "Понравившиеся посты", path: ROUTES.LIKED },
  ];

  return (
    <aside
      className="hidden sticky top-4 min-h-80 overflow-y-auto self-start  w-[250px] flex-shrink-0
    bg-bg-secondary rounded-2xl p-5 
    lg:block"
    >
      <ul className="flex flex-col gap-2">
        {links &&
          links.map((item, index) => {
            return (
              <ItemList
                key={index}
                to={item.path}
                index={index}
                text={item.text}
              />
            );
          })}
      </ul>
    </aside>
  );
}
