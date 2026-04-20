import cn from "classnames";

interface MessageItemProps {
  text: string;
  time: string;
  isMine?: boolean;
}

export default function MessageItem({
  text,
  time,
  isMine = false,
}: MessageItemProps) {
  return (
    <div
      className={cn(
        "flex w-full mb-3",
        isMine ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[70%] px-3 py-2 rounded-2xl",
          "flex flex-col gap-1",
          "break-words",

          isMine ? "bg-accent-hover/20 text-white" : "bg-white/5 text-white",
        )}
      >
        {/* TEXT */}
        <span className="text-sm leading-snug">{text}</span>

        {/* TIME */}
        <span className={cn("text-[10px] opacity-50 self-end")}>{time}</span>
      </div>
    </div>
  );
}
