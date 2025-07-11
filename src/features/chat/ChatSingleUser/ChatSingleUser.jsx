import TitlePage from "../../../components/TitlePage";
import { IoIosArrowBack } from "react-icons/io";

export default function ChatSingleUser() {
  return (
    <div className="h-full">
      <TitlePage
        text="Вернуться к чатам"
        linkTo
        iconComponent={<IoIosArrowBack size={30} />}
      />

      <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[calc(100%-52px)] custom-scrollbar mt-6"></div>
    </div>
  );
}
