import cn from "classnames";

interface ConfirmButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
  isRed?: boolean;
  isGreen?: boolean;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ConfirmButton({
  text = "Кнопка",
  isRed,
  isGreen,
  className,
  onClick,
  ...props
}: ConfirmButtonProps) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={cn(
        "cursor-pointer flex-1  text-white px-4 py-2 rounded transition",
        className,
        isRed && "bg-red-600 hover:bg-red-700",
        isGreen && "bg-green-600 hover:bg-green-700",
        !isRed && !isGreen && "bg-zinc-700 hover:bg-zinc-600"
      )}
    >
      {text}
    </button>
  );
}
