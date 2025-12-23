import NavLinkAccent from "./accentButton/NavLinkAccent.js";

interface ItemListProps {
  text: string;
  to: string;
}

export default function ItemList({ text = "", to = "#" }: ItemListProps) {
  return (
    <li className="list-none">
      <NavLinkAccent text={text} to={to} />
    </li>
  );
}
