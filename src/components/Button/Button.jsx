import cn from "classnames";

export default function Button({ text, className }) {
  return (
    <button
      className={cn(
        "cursor-pointer px-5 py-2 text-sm font-bold border border-gray-300 rounded-md hover:bg-gray-100 hover:text-black active:bg-gray-200 duration-300 transition-colors",
        className
      )}
    >
      {text}
    </button>
  );
}
