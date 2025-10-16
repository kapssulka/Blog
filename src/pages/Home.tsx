import VerticalPosts from "../components/VerticalPosts.js";
import EmptyPosts from "../components/EmptyPosts.js";
import { useAppSelector } from "../hooks/reduxHooks.js";

export default function Home() {
  const posts = useAppSelector((state) => state.posts.posts);
  const { loadingCount } = useAppSelector((state) => state.loading);
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
