import ButtonOrange from "./ButtonOrange";

export default function ItemList({ index = "", text = "", to = "#" }) {
  return (
    <li key={index} className="">
      <ButtonOrange text={text} to={to} />
    </li>
  );
}
