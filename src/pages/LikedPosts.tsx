import { useSelector } from "react-redux";
import { selectLikedPosts } from "../redux/selectors/posts.js";
import TitleDot from "../components/TitleDot.js";
import PostsSwitcher from "../components/PostsSwitcher.js";

export default function LikedPosts() {
  const likedPosts = useSelector(selectLikedPosts);

  return (
    <>
      <PostsSwitcher
        posts={likedPosts}
        topContent={
          <TitleDot title="Понравившиеся публикации" dotColor="bg-blue-500" />
        }
      />
    </>
  );
}
