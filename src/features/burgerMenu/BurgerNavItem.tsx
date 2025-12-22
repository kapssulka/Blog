import { Link } from "react-router-dom";
import type { SetState } from "../../types/utils.types.js";

interface BurgerNavItemProps {
  children: React.ReactNode;
  to: string;
  isBlank?: boolean;
  setOpen: SetState<boolean>;
}

export default function BurgerNavItem({
  children,
  to,
  isBlank,
  setOpen,
  ...props
}: BurgerNavItemProps) {
  return (
    <span onClick={() => setOpen(false)}>
      <Link
        {...props}
        to={to}
        target={isBlank ? "_blank" : undefined}
        className="w-full text-left p-2 rounded hover:bg-gray-100"
      >
        {children}
      </Link>
    </span>
  );
}
