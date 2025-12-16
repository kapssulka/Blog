import cn from "classnames";

interface ButtonAccentProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  className: string;
  typeButton?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export default function ButtonAccent({
  text = "",
  className = "",
  typeButton = "button",
  ...props
}: ButtonAccentProps) {
  return (
    <button
      {...props}
      type={typeButton}
      className={cn(
        `flex text-center items-center justify-center cursor-pointer font-medium 
        opacity-80 px-2 py-3 border rounded-[10px]
        border-gray-600 hover:border-amber-400 transition-border duration-300`,
        className
      )}
    >
      {text}
    </button>
  );
}
