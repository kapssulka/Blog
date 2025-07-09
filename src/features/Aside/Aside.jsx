import ItemList from "../../components/ItemList";

export default function Aside() {
  const links = [
    "Мой профиль",
    "Сообщения",
    "Сохраненные посты",
    "Понравившиеся посты",
  ];

  return (
    <aside
      className="sticky top-4 min-h-80 overflow-y-auto  w-70 
    bg-zinc-900 rounded-2xl p-5"
    >
      <ul className="flex flex-col gap-2">
        {links &&
          links.map((item, index) => <ItemList key={index} text={item} />)}
      </ul>
    </aside>
  );
}
