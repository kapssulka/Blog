import AvatarWrapper from "../../components/Avatar/AvatarWrapper";
import ActivePanel from "./components/ActivePanel";
import Content from "./components/Content";

export default function Post() {
  return (
    <div className="shadow-2xl rounded-2xl p-5 ">
      <AvatarWrapper className="mb-5" />

      <Content className="mb-5" />

      <ActivePanel />
    </div>
  );
}
