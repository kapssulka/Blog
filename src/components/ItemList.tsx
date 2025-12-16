import NavLinkAccent from "./accentButton/NavLinkAccent.js";

interface ItemListProps {
  index: string | number;
  text: string;
  to: string;
}

export default function ItemList({
  index = "",
  text = "",
  to = "#",
}: ItemListProps) {
  return (
    <li key={index} className="">
      <NavLinkAccent text={text} to={to} />
    </li>
  );
}
