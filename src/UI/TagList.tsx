interface TagListProps {
  items: string[];
}

export default function TagList({ items }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-2 text-sm">
      {items.map((item, index) => (
        <li
          key={index}
          className="rounded-md border border-white/10 px-3 py-1 text-white/80"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
