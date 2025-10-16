import { Link, NavLink } from "react-router-dom";
import cn from "classnames";

interface ButtonOrangeProps {
  text: string;
  to: string;
  className: string;
  isLink: boolean;
  isButton: boolean;
  typeButton: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export default function ButtonOrange({
  text = "",
  to = "#",
  className = "",
  isLink = false,
  isButton = false,
  typeButton = "",
  ...props
}: ButtonOrangeProps) {
  const baseStyleActive =
    "flex text-center items-center justify-center cursor-pointer font-medium opacity-80 px-2 py-1 border rounded-[10px] border-amber-400 hover:border-amber-400 transition-border duration-300";
  const baseStyle =
    "flex text-center items-center justify-center cursor-pointer font-medium opacity-80 px-2 py-1 border rounded-[10px] border-gray-600 hover:border-amber-400 transition-border duration-300";
  return (
    <>
      {!isLink && !isButton && (
        <NavLink
          end={false}
          {...props}
          to={to}
          className={({ isActive }) =>
            cn(isActive ? baseStyleActive : baseStyle, className)
          }
        >
          {text}
        </NavLink>
      )}
      {isLink && (
        <Link {...props} to={to} className={cn(baseStyle, className)}>
          {text}
        </Link>
      )}

      {isButton && (
        <button
          {...props}
          type={typeButton}
          className={cn(baseStyle, className)}
        >
          {text}
        </button>
      )}
    </>
  );
}
