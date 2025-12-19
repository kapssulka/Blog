import Logout from "../../components/Logout/Logout.js";

export default function BurgerNav() {
  return (
    <div className="border-t border-accent-grey-hover pt-2">
      {/* Слайд-меню */}

      {/* Верхняя часть: название и описание */}
      <div className="p-4 border-b border-accent-grey-hover">
        <h2 className="text-xl font-bold">Pet-проект</h2>
        <p className="text-sm text-zinc-300 mt-1">
          Мини-социальная сеть для демонстрации навыков React
        </p>
      </div>

      {/* Основной блок: дополнительные ссылки */}
      <div className="flex-grow p-4 space-y-3">
        <button className="w-full text-left p-2 rounded hover:bg-gray-100">
          Ссылка на Git проекта
        </button>
        <button className="w-full text-left p-2 rounded hover:bg-gray-100">
          Настройки
        </button>
        <button className="w-full text-left p-2 rounded hover:bg-gray-100">
          Справка
        </button>
      </div>

      {/* Нижняя часть: Logout */}
      <div className="p-4 border-t border-accent-grey-hover">
        <Logout />
      </div>
    </div>
  );
}
