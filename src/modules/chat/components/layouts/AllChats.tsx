import { useMemo } from "react";
import TitlePage from "../../../../components/TitlePage.js";
import ChatItem from "../ui/ChatItem.js";
import EmptyState from "../ui/EmptyState.js";
import { useAppSelector } from "../../../../hooks/reduxHooks.js";
import type { ChatPreview } from "../../types.js";

export default function AllChats() {
  const { chats } = useAppSelector((state) => state.chat);

  const chatsArray = useMemo(() => {
    return chats.allIds
      .map((id) => chats.byId[id])
      .filter((chat): chat is ChatPreview => Boolean(chat));
  }, [chats]);

  return (
    <div className="min-h-0 flex-1 flex flex-col">
      <TitlePage text="Чаты" />

      {chatsArray.length < 1 ? (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState />
        </div>
      ) : (
        <div
          className="
        flex flex-col gap-2 
        overflow-y-auto min-h-0 overflow-x-hidden
        pb-4 bt-2 mt-2 custom-scrollbar-accent"
        >
          {chatsArray.map((item) => (
            <ChatItem
              avatar={item.user_info.avatar_url || ""}
              key={item.chat_id}
              name={item.user_info.name}
              lastMessage={item.last_message}
              to={item.chat_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
