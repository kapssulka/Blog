import ItemList from "../../components/ItemList";

export default function Aside() {
  const links = [
    { text: "Главная", path: "/" },
    { text: "Мой профиль", path: "/profile" },
    { text: "Сообщения", path: "/message" },
    { text: "Сохраненные посты", path: "/bookmarks" },
    { text: "Понравившиеся посты", path: "/liked" },
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
