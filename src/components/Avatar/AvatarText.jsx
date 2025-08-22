export default function AvatarText({ avtor, create_at }) {
  return (
    <div>
      <h3 className="text-zinc-400 text-1xl font-bold mb-2">{avtor}</h3>
      <h4 className="text-zinc-500 font-medium text-[14px]">
        Опубликовано {create_at}
      </h4>
    </div>
  );
}
