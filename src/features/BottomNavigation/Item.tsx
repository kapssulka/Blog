import { NavLink, type NavLinkProps } from "react-router-dom";
import cn from "classnames";

interface ItemProps extends NavLinkProps {
  text: string;
  to: string;
  className?: string;
  icon: React.ReactNode;
}

export default function Item({ text, to, icon, ...props }: ItemProps) {
  return (
    <li className="list-none m-0 p-0">
      <NavLink
        end={false}
        {...props}
        to={to}
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center justify-center gap-1 text-[13px] transition-colors duration-200",
            isActive ? "text-amber-400" : "text-gray-500"
          )
        }
      >
        {({ isActive }) => (
          <div className="flex flex-col items-center justify-center gap-1">
            <div className={cn(isActive ? "text-amber-400" : "text-gray-400")}>
              {icon}
            </div>
            <span>{text}</span>
          </div>
        )}
      </NavLink>
    </li>
  );
}
