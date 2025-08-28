import { useSelector } from "react-redux";
import ProfilePreview from "../../components/Avatar/ProfilePreview";
import DropDownMenu from "../../components/drop-down/DropDownMenu";
import ActivePanel from "./components/ActivePanel";
import Content from "./components/Content";

export default function Post({
  images = [],
  description,
  avtor,
  userUid,
  create_at,
  postId,
}) {
  const { userUid: currenUserUid } = useSelector((state) => state.user);

  const isCurrentUser = userUid === currenUserUid;

  return (
    <div className="relative rounded-2xl p-5 bg-zinc-900 max-w-full">
      <ProfilePreview
        className="mb-5"
        avtor={avtor}
        linkTo={`/profile/${userUid}`}
        create_at={create_at}
      />

      {isCurrentUser && (
        <DropDownMenu
          className="top-5 right-5"
          postId={postId}
          images={images}
        />
      )}

      <Content className="mb-5" images={images} description={description} />

      <ActivePanel />
    </div>
  );
}
