import { IoMenu } from "react-icons/io5";
import ProfilePreview from "../../../components/Avatar/ProfilePreview";
import TitlePage from "../../../components/TitlePage";
import ChatUserPreview from "../../../pages/Message/components/ChatUserPreview";

export default function ChatAllUsers() {
  return (
    <div className="h-full">
      <TitlePage text="Чаты" iconComponent={<IoMenu size={30} />} />

      <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[calc(100%-52px)] custom-scrollbar mt-6">
        <ProfilePreview linkTo={":id"} chatMessageEl={<ChatUserPreview />} />
      </div>
    </div>
  );
}
