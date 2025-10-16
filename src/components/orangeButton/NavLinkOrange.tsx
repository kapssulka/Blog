import { NavLink, type NavLinkProps } from "react-router-dom";
import cn from "classnames";

interface NavLinkOrangeProps extends NavLinkProps {
  text: string;
  to: string;
  className?: string;
}

export default function NavLinkOrange({
  text = "",
  to = "#",
  className = "",
  ...props
}: NavLinkOrangeProps) {
  const baseStyleActive =
    "flex text-center items-center justify-center cursor-pointer font-medium opacity-80 px-2 py-1 border rounded-[10px] border-amber-400 hover:border-amber-400 transition-border duration-300";
  const baseStyle =
    "flex text-center items-center justify-center cursor-pointer font-medium opacity-80 px-2 py-1 border rounded-[10px] border-gray-600 hover:border-amber-400 transition-border duration-300";
  return (
    <>
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
    </>
  );
}
