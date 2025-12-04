interface UserBioItemProps {
  text?: string;
  name?: boolean;
}

export default function UserBioItem({ text = "", name }: UserBioItemProps) {
  if (name)
    return (
      <div className="text-zinc-100 whitespace-pre-wrap break-words">
        {text}
      </div>
    );
  else
    return (
      <div className="text-zinc-400 whitespace-pre-wrap break-words max-h-[100px] overflow-auto custom-scrollbar">
        {text}
      </div>
    );
}
