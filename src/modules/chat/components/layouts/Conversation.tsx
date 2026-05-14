import { IoIosArrowBack } from "react-icons/io";
import ChatHeader from "../ui/ChatHeader.js";
import ChatInput from "../ui/ChatInput.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/reduxHooks.js";
import { deleteMessage, getMessages } from "../../store/chatSlice.js";
import EmptyState from "../ui/EmptyState.js";
import { validate as isUuid } from "uuid";
import { ChatError } from "../../types.js";
import MessageList from "../MessageList.js";
import BackLink from "../../../../components/UI/BackLink.js";
import { isNearBottom } from "../../utils.js";

export default function Conversation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { messages, chats } = useAppSelector((state) => state.chat);
  const { user_uid } = useAppSelector((state) => state.user);

  // Работа со скроллом
  const messagesWrapperRef = useRef<HTMLDivElement | null>(null);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!id || !user_uid) return;

      if (!isUuid(id)) {
        navigate("/messages", {
          replace: true,
          state: { error: "CHAT_NOT_FOUND" },
        });
        return;
      }

      try {
        await dispatch(getMessages({ chatId: id, user_uid })).unwrap();
      } catch (err: any) {
        if (err === ChatError.NOT_FOUND) {
          navigate("/messages", {
            replace: true,
            state: { error: "CHAT_NOT_FOUND" },
          });
        }

        if (err === ChatError.FORBIDDEN) {
          navigate("/messages", {
            replace: true,
            state: { error: "FORBIDDEN" },
          });
        }
      }
    };

    fetchMessages();
  }, [id, user_uid, dispatch, navigate]);

  useEffect(() => {
    if (!messagesWrapperRef.current) return;

    // первый заход в чат
    if (isInitialLoadRef.current) {
      messagesWrapperRef.current.scrollTop =
        messagesWrapperRef.current.scrollHeight;
      isInitialLoadRef.current = false;
      return;
    }

    // последующие обновления
    if (isNearBottom(messagesWrapperRef.current)) {
      messagesWrapperRef.current.scrollTop =
        messagesWrapperRef.current.scrollHeight;
    }
  }, [messages]);

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

        <div
          ref={messagesWrapperRef}
          className="flex-1 min-h-0 overflow-y-auto custom-scrollbar-accent p-4"
        >
          {chatMessages.length > 0 && (
            <MessageList
              messages={chatMessages}
              userId={user_uid}
              onDelete={(id) => dispatch(deleteMessage(id))}
            />
          )}
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
