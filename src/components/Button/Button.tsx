import cn from "classnames";
import type { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  text: string;
  className?: string;
  isLoading?: boolean;
}

export default function Button({
  text,
  className,
  type = "button",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      {...props}
      className={cn(
        "min-h-[38px] px-5 py-2 text-sm font-bold border border-gray-300 rounded-md transition-colors duration-300",
        {
          "cursor-not-allowed bg-gray-100": isDisabled,
          "cursor-pointer hover:bg-gray-100 hover:text-black active:bg-gray-200":
            !isDisabled,
        },
        className,
      )}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </span>
      ) : (
        text
      )}
    </button>
  );
}
