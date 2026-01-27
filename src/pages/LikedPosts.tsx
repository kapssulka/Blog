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

  useEffect(() => {
    if (!user_uid) return;
    dispatch(getLikedPosts(user_uid));
  }, [user_uid]);

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
