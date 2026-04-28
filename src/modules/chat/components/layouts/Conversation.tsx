import { IoIosArrowBack } from "react-icons/io";
import BackLink from "../../../../components/UI/BackLink.js";
import ChatHeader from "../ui/ChatHeader.js";
import MessageItem from "../ui/MessageItem.js";
import ChatInput from "../ui/ChatInput.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/reduxHooks.js";
import { getMessages } from "../../store/chatSlice.js";
import { formatTime } from "../../../../utils/date.js";
import EmptyState from "../ui/EmptyState.js";

export default function Conversation() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { messages, chats } = useAppSelector((state) => state.chat);
  const { user_uid } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (id) dispatch(getMessages(id));
  }, [id]);

  if (!id || !user_uid) return null;

  const chatMessages = messages[id] ?? [];

  const currentParticipant = chats.byId[id]?.user_info;

  return (
    <div className="min-h-0 flex-1 flex flex-col">
      <BackLink
        className="self-start"
        text="Вернуться к чатам"
        linkTo="/messages"
        iconComponent={<IoIosArrowBack size={30} />}
      />

      <div
        className="
        min-h-0 flex-1 flex flex-col
        mt-4 rounded-xl
        border border-white/5"
      >
        <div className="shrink-0">
          <ChatHeader
            name={currentParticipant?.name || ""}
            url={currentParticipant?.avatar_url || ""}
          />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar-accent p-4">
          {chatMessages.map((msg) => (
            <MessageItem
              key={msg.id}
              text={msg.content}
              time={formatTime(msg.created_at)}
              isMine={msg.sender_id === user_uid}
            />
          ))}
          {chatMessages.length < 1 && (
            <div className="flex h-full items-center justify-center">
              <EmptyState
                title="Здесь пока ничего нет"
                description="Отправьте сообщение"
              />
            </div>
          )}
        </div>

        <div className="shrink-0">
          <ChatInput chatId={id} senderId={user_uid} />
        </div>
      </div>
    </div>
  );
}
