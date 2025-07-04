export default function Aside() {
  const links = [
    "Мой профиль",
    "Сообщения",
    "Сохраненные посты",
    "Понравившиеся посты",
  ];

  return (
    <aside className="sticky top-4 min-h-80 overflow-y-auto  w-70 shadow-2xl rounded-2xl p-5">
      <ul className="flex flex-col gap-2">
        {links &&
          links.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer px-2 py-1 border rounded-[10px]
           border-gray-600
         hover:border-amber-400 transition-border duration-200"
            >
              <a href="" className="block font-medium opacity-80">
                {item}
              </a>
            </li>
          ))}
      </ul>
    </aside>
  );
}
