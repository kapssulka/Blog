import { useSelector } from "react-redux";
import VerticalPosts from "../components/VerticalPosts";
import EmptyPosts from "../components/EmptyPosts";

export default function Home() {
  const posts = useSelector((state) => state.posts.posts);
  const { loadingCount } = useSelector((state) => state.loading);
  return (
    <>
      {loadingCount === 0 && posts.length < 1 && (
        <EmptyPosts
          showCreatePost
          title="Будь первым, кто поделится чем-то интересным!"
        />
      )}
      <VerticalPosts posts={posts} />
    </>
  );
}
