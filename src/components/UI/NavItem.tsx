import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

export default function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "relative text-sm transition-colors",
          "after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:rounded-full after:transition-opacity",
          isActive
            ? "text-white after:bg-accent after:opacity-100"
            : "text-white/60 hover:text-white after:opacity-0",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
