export default function Post({ src }) {
  return (
    <div className="rounded-2xl bg-zinc-900 border-1 border-zinc-400 aspect-square overflow-hidden">
      <img
        src={src}
        className="w-full h-full max-w-full object-cover rounded-2xl"
      />
    </div>
  );
}
