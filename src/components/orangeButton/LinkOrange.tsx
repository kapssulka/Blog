import { Link, type LinkProps } from "react-router-dom";
import cn from "classnames";

interface LinkOrangeProps extends LinkProps {
  text: string;
  to: string;
  className?: string;
}

export default function LinkOrange({
  text = "",
  to = "#",
  className = "",
  ...props
}: LinkOrangeProps) {
  return (
    <>
      <Link
        {...props}
        to={to}
        className={cn(
          `flex text-center items-center justify-center cursor-pointer font-medium 
          opacity-80 px-2 py-1 border rounded-[10px]
         border-gray-600 hover:border-amber-400 transition-border duration-300`,
          className
        )}
      >
        {text}
      </Link>
    </>
  );
}
