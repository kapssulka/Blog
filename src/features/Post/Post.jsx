import { useSelector } from "react-redux";
import ProfilePreview from "../../components/Avatar/ProfilePreview";
import DropDownMenu from "../../components/drop-down/DropDownMenu";
import ActivePanel from "./components/ActivePanel";
import Content from "./components/Content";

export default function Post({
  images = [],
  description,
  avtor,
  user_uid,
  create_at,
  post_id,
}) {
  const { user_uid: currenUserUid } = useSelector((state) => state.user);
  const { likes } = useSelector((state) => state.postLikes);
  const currentLikesPost = likes?.[post_id] || false;

  const isCurrentUser = user_uid === currenUserUid;

  return (
    <div className="relative rounded-2xl p-5 bg-zinc-900 max-w-full">
      <ProfilePreview
        className="mb-5"
        avtor={avtor}
        linkTo={`/profile/${user_uid}`}
        create_at={create_at}
      />

      {isCurrentUser && (
        <DropDownMenu
          className="top-5 right-5"
          post_id={post_id}
          images={images}
        />
      )}

      <Content className="mb-5" images={images} description={description} />

      <ActivePanel
        post_id={post_id}
        isLikeDefault={currentLikesPost?.likedByCurrentUser}
        likeCount={currentLikesPost?.likesCount}
      />
    </div>
  );
}
