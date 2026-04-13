import TitleDot from "../components/TitleDot.js";
import PostsSwitcher from "../components/PostsSwitcher.js";
import SavePostsSkeleton from "../components/skeleton/SavePosts/SavePostsSkeleton.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks.js";
import { useEffect } from "react";
import { getLikedPosts } from "../redux/slices/postsSlice.js";

export default function LikedPosts() {
  const dispatch = useAppDispatch();
  const { byKey } = useAppSelector((state) => state.loading);
  const { user_uid } = useAppSelector((state) => state.user);
  const { likedPostIds } = useAppSelector((state) => state.posts);

  const hasRequestedLiked = useAppSelector(
    (state) => state.posts.hasRequestedPage.liked,
  );

  useEffect(() => {
    if (user_uid && !hasRequestedLiked) dispatch(getLikedPosts(user_uid));
  }, [dispatch, user_uid, hasRequestedLiked]);

  return (
    <>
      {byKey.likedPosts ? (
        <SavePostsSkeleton />
      ) : (
        <PostsSwitcher
          loadingKey="likedPosts"
          postsId={likedPostIds}
          topContent={
            <TitleDot title="Понравившиеся публикации" dotColor="bg-blue-500" />
          }
        />
      )}
    </>
  );
}
