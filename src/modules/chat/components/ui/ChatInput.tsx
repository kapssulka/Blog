export default function ChatInput() {
  return (
    <div
      className="
        flex items-end gap-2
        p-3
        bg-[#272727]
        border-t border-white/5
        rounded-xl
      "
    >
      {/* TEXTAREA */}
      <textarea
        placeholder="Введите сообщение..."
        className="
    flex-1 resize-none
    bg-transparent
    text-white text-sm
    placeholder:text-white/30
    custom-scrollbar-accent
    outline-none
    
    px-2 py-2
    leading-5
  "
        rows={1}
      />

      {/* SEND BUTTON */}
      <button
        className="
          px-4 py-2
          rounded-lg

          bg-white/5
          text-white/70
          text-sm

          transition-all duration-200

          hover:bg-[#13907a]/20
          hover:text-white
          hover:cursor-pointer

          active:scale-[0.98]
        "
      >
        Отправить
      </button>
    </div>
  );
}
