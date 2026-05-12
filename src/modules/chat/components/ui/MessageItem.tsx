import cn from "classnames";
import { MdDeleteOutline } from "react-icons/md";

interface MessageItemProps {
  text: string;
  time: string;
  isMine?: boolean;
  onDeleteClick?: () => void;
}

export default function MessageItem({
  text,
  time,
  isMine = false,
  onDeleteClick,
}: MessageItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 w-full mb-3",
        isMine ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "group relative max-w-[70%] px-3 py-2 rounded-2xl",
          "flex flex-col gap-1",
          "break-words",

          isMine ? "bg-accent-hover/20 text-white" : "bg-white/5 text-white",
        )}
      >
        {/* TEXT */}
        <span className="text-sm leading-snug whitespace-pre-wrap">{text}</span>

        {/* TIME */}
        <span className={cn("text-[10px] opacity-50 self-end")}>{time}</span>
      </div>

      {/* DELETE BUTTON */}
      {isMine && (
        <div
          className="
            flex justify-center items-center"
        >
          <div
            onClick={onDeleteClick}
            className={`cursor-pointer 
            bg-accent-grey rounded-full
            p-2 duration-200 
            hover:bg-error`}
          >
            <MdDeleteOutline />
          </div>
        </div>
      )}
    </div>
  );
}
