export default function Post({ content }) {
  return (
    <div className="rounded-2xl p-3 bg-zinc-900 border-1 border-zinc-400 aspect-square overflow-hidden">
      {content}
    </div>
  );
}
