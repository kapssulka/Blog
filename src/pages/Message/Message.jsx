import TitlePage from "../../components/TitlePage";

import { IoIosArrowBack } from "react-icons/io";
import ChatAllUsers from "../../features/chat/ChatAllUsers/ChatAllUsers";
import ChatSingleUser from "../../features/chat/ChatSingleUser/ChatSingleUser";
import { Outlet } from "react-router-dom";

export default function Message() {
  return (
    <div className="overflow-hidden bg-zinc-900 h-full max-h-[calc(100vh-140px)] rounded-2xl p-5">
      {/* Left */}
      {/* <TitlePage text="Чаты" iconComponent={<IoMenu size={30} />} />

      <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[calc(100%-52px)] custom-scrollbar mt-6">
        <ProfilePreview chatMessageEl={<ChatUserPreview />} />
      </div> */}

      <Outlet />
      {/* <ChatAllUsers />
      <ChatSingleUser /> */}

      {/* <TitlePage
        text="Вернуться к чатам"
        iconComponent={<IoIosArrowBack size={30} />}
      />

      <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[calc(100%-52px)] custom-scrollbar mt-6"></div> */}

      {/* Поиск */}
      {/* Контакты */}

      {/* Right */}

      {/* Выбирите пользователя */}
    </div>
  );
}
