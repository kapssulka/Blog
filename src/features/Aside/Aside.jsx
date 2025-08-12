import ItemList from "../../components/ItemList";
import { ROUTES } from "../../constants/routes";

export default function Aside() {
  const links = [
    { text: "Добавить пост", path: ROUTES.NEW_POST },
    { text: "Главная", path: ROUTES.HOME },
    { text: "Мой профиль", path: ROUTES.PROFILE },
    { text: "Сообщения", path: ROUTES.MESSAGE.INDEX },
    { text: "Сохраненные посты", path: ROUTES.BOOKMARKS },
    { text: "Понравившиеся посты", path: ROUTES.LIKED },
  ];

  return (
    <aside
      className="sticky top-4 min-h-80 overflow-y-auto self-start  w-70 
    bg-zinc-900 rounded-2xl p-5"
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
