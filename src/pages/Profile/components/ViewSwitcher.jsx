import { FaTh, FaList } from "react-icons/fa";

export default function ViewSwitcher({ activeView, onChange }) {
  // border-b border-amber-50
  return (
    <div className="flex justify-center items-center gap-4 py-4 ">
      {/* Кнопка "Сетка" */}
      <button
        onClick={() => onChange("grid")}
        className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
          ${
            activeView === "grid"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
      >
        <FaTh />
        <span className="text-sm font-medium">Сетка</span>
      </button>

      {/* Кнопка "Лента" */}
      <button
        onClick={() => onChange("list")}
        className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
          ${
            activeView === "list"
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
      >
        <FaList />
        <span className="text-sm font-medium">Лента</span>
      </button>
    </div>
  );
}
