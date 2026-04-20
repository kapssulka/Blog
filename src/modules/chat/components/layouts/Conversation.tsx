import { IoIosArrowBack } from "react-icons/io";
import BackLink from "../../../../components/UI/BackLink.js";
import ChatHeader from "../ui/ChatHeader.js";
import MessageItem from "../ui/MessageItem.js";
import { mockMessages } from "../../mockData.js";
import ChatInput from "../ui/ChatInput.js";

export default function Conversation() {
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
          <ChatHeader />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar-accent p-4">
          {mockMessages.map((msg) => (
            <MessageItem
              key={msg.id}
              text={msg.text}
              time={msg.time}
              isMine={msg.isMine}
            />
          ))}
        </div>

        <div className="shrink-0">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
