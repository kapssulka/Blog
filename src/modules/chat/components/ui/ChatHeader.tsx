export default function ChatHeader() {
  return (
    <div
      className="
        flex items-center justify-between
        px-4 py-3
        bg-[#272727]
        rounded-xl
        border-b border-white/5
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="
            w-10 h-10 rounded-full
            bg-white/10
            flex items-center justify-center
            overflow-hidden
          "
        >
          {/* <AvatarIcon /> */}
          <span className="text-sm text-white/60">A</span>
        </div>

        {/* Name + Status */}
        <div className="flex flex-col leading-tight">
          <span className="text-white text-sm font-medium">Username</span>

          <span className="text-xs text-white/40">
            online
            {/* later: typing... / last seen */}
          </span>
        </div>
      </div>
    </div>
  );
}
