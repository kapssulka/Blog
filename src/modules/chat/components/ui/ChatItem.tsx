import { Link } from "react-router-dom";
import AvatarIcon from "../../../../components/Avatar/AvatarIcon.js";

interface ChatItemProps {
  avatar: string;
  name: string;
  lastMessage: string;
  to: string;
  time?: string;
  unread?: number;
}

export default function ChatItem({
  avatar,
  name,
  lastMessage,
  time,
  unread = 0,
  to,
}: ChatItemProps) {
  return (
    <Link
      to={to}
      className={`
        group
        flex items-center gap-4 p-3 rounded-2xl cursor-pointer
        
        bg-bg-secondary/40
        border border-white/5
        
        transition-all duration-200
        
        hover:bg-bg-secondary/70
        hover:border-white/10
        hover:shadow-md
        hover:scale-[1.01]
      `}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <AvatarIcon src={avatar} />

        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-bg-main rounded-full"></span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-white truncate group-hover:text-white">
            {name}
          </h3>

          {time && (
            <span className="text-xs text-zinc-400 shrink-0 ml-2">{time}</span>
          )}
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-zinc-400 truncate">
            {lastMessage || "Напишите первое сообщение"}
          </p>

          {unread > 0 && (
            <div className="min-w-[20px] h-5 px-1 flex items-center justify-center text-xs rounded-full bg-accent text-black font-medium">
              {unread}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
