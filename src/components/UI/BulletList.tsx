interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-2 text-sm text-white/80 leading-relaxed">
      {items.map((item) => (
        <li key={item} className="relative pl-4">
          <span className="absolute left-0 text-white/40">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
