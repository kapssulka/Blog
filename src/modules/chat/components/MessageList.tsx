import { useState } from "react";
import ConfirmButton from "../../../components/ConfirmModal/ConfirmButton.js";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal.js";
import MessageItem from "./ui/MessageItem.js";
import { formatTime } from "../utils.js";
import type { MessageChat } from "../types.js";
import { toast } from "sonner";

interface MessageListProps {
  messages: MessageChat[];
  userId: string;
  onDelete: (id: string) => any;
}

export default function MessageList({
  messages,
  userId,
  onDelete,
}: MessageListProps) {
  const [selectedMessage, setSelectedMessage] = useState<MessageChat | null>(
    null,
  );

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      await onDelete(id).unwrap();
      toast.success("Сообщение успешно удалено");
    } catch (error) {
      toast.error("Не удалось удалить сообщение, попробуйте позже");
    } finally {
      setSelectedMessage(null);
    }
  };

  const isOpen = selectedMessage !== null;

  return (
    <>
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          text={msg.content}
          time={formatTime(msg.created_at)}
          isMine={msg.sender_id === userId}
          onDeleteClick={() => setSelectedMessage(msg)}
        />
      ))}

      <ConfirmModal
        isOpen={isOpen}
        setOpenConfirmModal={(value) => {
          if (!value) setSelectedMessage(null);
        }}
        confirmText="Удалить сообщение?"
      >
        <ConfirmButton onClick={() => setSelectedMessage(null)} text="Отмена" />
        <ConfirmButton
          onClick={() => {
            if (!selectedMessage?.id) return;
            handleDelete(selectedMessage?.id);
          }}
          text="Удалить"
          isRed
        />
      </ConfirmModal>
    </>
  );
}
