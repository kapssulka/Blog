import { useSelector } from "react-redux";
import { selectLikedPosts } from "../redux/selectors/posts";
import TitleDot from "../components/TitleDot";
import PostsSwitcher from "../components/PostsSwitcher";

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
