import { useRef, useState } from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks.js";
import { addMessage } from "../../store/chatSlice.js";

interface ChatInputProps {
  chatId: string;
  senderId: string;
}

export default function ChatInput({ chatId, senderId }: ChatInputProps) {
  const textareaRef = useRef(null);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");

  const handleClick = () => {
    const newContent = value.trim();

    if (newContent.length < 1) return;

    const newMessage = {
      chat_id: chatId,
      sender_id: senderId,
      content: newContent,
    };
    dispatch(addMessage(newMessage));

    setValue("");
  };

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
        ref={textareaRef}
        onChange={(e) => setValue(e.target.value)}
        value={value}
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
        onClick={handleClick}
        disabled={value.length < 1}
        className="
          px-4 py-2
          rounded-lg

         bg-accent-hover
          text-white
          text-sm

          transition-all duration-200

          hover:bg-accent-hover/80
          hover:cursor-pointer

          active:scale-[0.98]

          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:bg-accent-hover
          disabled:active:scale-100
        "
      >
        Отправить
      </button>
    </div>
  );
}
