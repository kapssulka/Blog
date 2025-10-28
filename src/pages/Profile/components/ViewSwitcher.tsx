import { FaTh, FaList } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import type { PostsViewMode } from "../../../types/ui/view.js";

interface viewsObject {
  id: PostsViewMode;
  label: string;
  icon: IconType;
}

const views: viewsObject[] = [
  { id: "grid", label: "Сетка", icon: FaTh },
  { id: "list", label: "Лента", icon: FaList },
];

interface ViewSwitcherProps {
  activeView: PostsViewMode;
  onChange: (id: PostsViewMode) => void;
  className?: string;
}

export default function ViewSwitcher({
  activeView,
  onChange,
  className,
}: ViewSwitcherProps) {
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
