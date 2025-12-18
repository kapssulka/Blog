import { Link, type LinkProps } from "react-router-dom";
import cn from "classnames";

interface LinkAccentProps extends LinkProps {
  text: string;
  to: string;
  className?: string;
}

export default function LinkAccent({
  text = "",
  to = "#",
  className = "",
  ...props
}: LinkAccentProps) {
  return (
    <>
      <Link
        {...props}
        to={to}
        className={cn(
          `flex text-center items-center justify-center cursor-pointer font-medium 
        opacity-80 px-2 py-3 rounded-[10px]
        bg-accent hover:bg-accent-hover duration-300`,
          className
        )}
      >
        {text}
      </Link>
    </>
  );
}
