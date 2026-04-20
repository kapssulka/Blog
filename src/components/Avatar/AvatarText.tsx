interface AvatarTextProps {
  avtor: string;
  create_at: string;
}

export default function AvatarText({ avtor, create_at }: AvatarTextProps) {
  return (
    <div className="flex flex-col min-w-0">
      <span className="text-white text-sm font-medium truncate min-w-0 max-w-full">
        {avtor}
      </span>
      <span className="text-xs text-white/40 min-w-0">
        Опубликовано {create_at}
      </span>
    </div>
  );
}
