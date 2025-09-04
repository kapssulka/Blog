import { FaTh, FaList } from "react-icons/fa";

const views = [
  { id: "grid", label: "Сетка", icon: FaTh },
  { id: "list", label: "Лента", icon: FaList },
];

export default function ViewSwitcher({ activeView, onChange, className = "" }) {
  return (
    <div className={`flex justify-center items-center gap-4 mt-4 ${className}`}>
      {views.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
            ${
              activeView === id
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
        >
          <Icon />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
