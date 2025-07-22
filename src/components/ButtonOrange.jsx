import { Link, NavLink } from "react-router-dom";
import cn from "classnames";

export default function ButtonOrange({
  text = "",
  to = "#",
  className = "",
  isLink = false,
}) {
  return (
    <>
      {!isLink && (
        <NavLink
          to={to}
          className={({ isActive }) =>
            cn(
              isActive
                ? "flex items-center justify-center cursor-pointer font-medium opacity-80 px-2 py-1 border rounded-[10px] border-amber-400 hover:border-amber-400 transition-border durati"
                : "flex items-center justify-center cursor-pointer font-medium opacity-80 px-2 py-1 border rounded-[10px] border-gray-600 hover:border-amber-400 transition-border durati",
              className
            )
          }
        >
          {text}
        </NavLink>
      )}

      {isLink && (
        <Link
          to={to}
          className={cn(
            "flex items-center justify-center cursor-pointer font-medium opacity-80 px-2 py-1 border rounded-[10px] border-gray-600 hover:border-amber-400 transition-border durati",
            className
          )}
        >
          {text}
        </Link>
      )}
    </>
  );
}
