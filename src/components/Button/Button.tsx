import cn from "classnames";
import type { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  text: string;
  className: string;
}

export default function Button({
  text,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        "cursor-pointer px-5 py-2 text-sm font-bold border border-gray-300 rounded-md hover:bg-gray-100 hover:text-black active:bg-gray-200 duration-300 transition-colors",
        className
      )}
    >
      {text}
    </button>
  );
}
