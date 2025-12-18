interface AvatarTextProps {
  avtor: string;
  create_at: string;
}

export default function AvatarText({ avtor, create_at }: AvatarTextProps) {
  return (
    <div className="flex flex-col min-w-0">
      <h3 className="text-zinc-400 text-1xl font-bold mb-2 truncate min-w-0 max-w-full">
        {avtor}
      </h3>
      <h4 className="text-zinc-500 font-medium text-[14px] truncate min-w-0">
        Опубликовано {create_at}
      </h4>
    </div>
  );
}
