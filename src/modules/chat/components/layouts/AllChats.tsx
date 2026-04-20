import TitlePage from "../../../../components/TitlePage.js";
import ChatItem from "../ui/ChatItem.js";
import EmptyState from "../ui/EmptyState.js";

export default function AllChats() {
  // const array: string[] = [];
  const array: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="min-h-0 flex-1 flex flex-col">
      <TitlePage text="Чаты" />

      {array.length < 1 ? (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState />
        </div>
      ) : (
        <div
          className="
        flex flex-col gap-2 
        overflow-y-auto min-h-0 overflow-x-hidden
        pb-4 bt-2 mt-2 px-2 custom-scrollbar-accent"
        >
          {array.map((item) => (
            <ChatItem
              avatar=""
              key={item}
              name="Данил"
              lastMessage="Последнее сообщение"
              link={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
