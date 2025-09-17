import cn from "classnames";

export default function ConfirmButton({
  text = "Кнопка",
  isRed,
  isGreen,
  className,
  onClick,
  ...props
}) {
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
