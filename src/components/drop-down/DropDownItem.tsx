import cn from "classnames";

interface DropDownItemProps extends React.ComponentPropsWithoutRef<"li"> {
  icon: React.ReactNode;
  text: string;
  hoverColor: string | null;
}

export default function DropDownItem({
  icon,
  text = "item",
  hoverColor = null,
  ...props
}: DropDownItemProps) {
  return (
    <li
      {...props}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded  cursor-pointer transition-colors duration-200",
        hoverColor === "red" ? "hover:bg-error" : "hover:bg-zinc-700"
      )}
    >
      {icon} <span>{text}</span>
    </li>
  );
}
