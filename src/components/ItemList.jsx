export default function ItemList({ key = "", text = "", to = "#" }) {
  return (
    <li
      key={key}
      className="cursor-pointer px-2 py-1 border rounded-[10px]
           border-gray-600
         hover:border-amber-400 transition-border duration-200"
    >
      <a href={to} className="block font-medium opacity-80">
        {text}
      </a>
    </li>
  );
}
