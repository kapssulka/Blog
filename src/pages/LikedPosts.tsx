import { useSelector } from "react-redux";
import { selectLikedPosts } from "../redux/selectors/posts.js";
import TitleDot from "../components/TitleDot.js";
import PostsSwitcher from "../components/PostsSwitcher.js";
import SavePostsSkeleton from "../components/skeleton/SavePosts/SavePostsSkeleton.js";
import { useAppSelector } from "../hooks/reduxHooks.js";

export default function LikedPosts() {
  const likedPosts = useSelector(selectLikedPosts);
  const { byKey } = useAppSelector((state) => state.loading);

  return (
    <>
      {byKey.posts ? (
        <SavePostsSkeleton />
      ) : (
        <PostsSwitcher
          posts={likedPosts}
          topContent={
            <TitleDot title="Понравившиеся публикации" dotColor="bg-blue-500" />
          }
        />
      )}
    </>
  );
}
