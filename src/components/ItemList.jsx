import { NavLink } from "react-router-dom";

export default function ItemList({ index = "", text = "", to = "#" }) {
  return (
    <li key={index} className="">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "block cursor-pointer font-medium opacity-80 px-2 py-1 border rounded-[10px] border-amber-400 hover:border-amber-400 transition-border durati"
            : "block cursor-pointer font-medium opacity-80 px-2 py-1 border rounded-[10px] border-gray-600 hover:border-amber-400 transition-border durati"
        }
      >
        {text}
      </NavLink>
    </li>
  );
}
