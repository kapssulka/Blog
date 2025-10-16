import NavLinkOrange from "./orangeButton/NavLinkOrange.js";

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
      <NavLinkOrange text={text} to={to} />
    </li>
  );
}
