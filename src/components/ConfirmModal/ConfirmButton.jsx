import cn from "classnames";

export default function ConfirmButton({ text = "Кнопка", isRed, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "cursor-pointer flex-1  text-white px-4 py-2 rounded transition",
        isRed ? "bg-red-600 hover:bg-red-70" : "bg-zinc-700 hover:bg-zinc-600"
      )}
    >
      {text}
    </button>
  );
}
