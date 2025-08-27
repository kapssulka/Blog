import cn from "classnames";
export default function DropDownItem({
  icon,
  text = "item",
  hoverColor = null,
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded  cursor-pointer transition-colors duration-200",
        hoverColor === "red" ? "hover:bg-red-400" : "hover:bg-zinc-700"
      )}
    >
      {icon} <span>{text}</span>
    </li>
  );
}
