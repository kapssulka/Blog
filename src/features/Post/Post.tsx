import ProfilePreview from "../../components/Avatar/ProfilePreview.js";
import DropDownMenu from "../../components/drop-down/DropDownMenu.js";
import ActivePanel from "./components/ActivePanel.js";
import Content from "./components/Content.js";
import { forwardRef, type ForwardedRef } from "react";
import { useAppSelector } from "../../hooks/reduxHooks.js";
import type { ImageData } from "../../types/models/data.js";

interface PostProps {
  images: ImageData[];
  description: string;
  avtor: string;
  user_uid: string;
  create_at: string;
  post_id: number;
  avatar_url: string;
}

export default forwardRef(function Post(
  props: PostProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    images = [],
    description,
    avtor,
    user_uid,
    create_at,
    post_id,
    avatar_url,
  } = props;

  const { user_uid: currenUserUid } = useAppSelector((state) => state.user);
  const { likes } = useAppSelector((state) => state.postLikes);
  const currentLikesPost = likes?.[post_id]! || false;

  const isCurrentUser = user_uid === currenUserUid;

  return (
    <div ref={ref} className="relative rounded-2xl p-5 bg-zinc-900">
      <ProfilePreview
        className="mb-5"
        avtor={avtor}
        linkTo={`/profile/${user_uid}`}
        create_at={create_at}
        avatar_url={avatar_url}
      />

      {isCurrentUser && (
        <DropDownMenu
          post_id={post_id}
          images={images}
          className="top-5 right-5"
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
});
