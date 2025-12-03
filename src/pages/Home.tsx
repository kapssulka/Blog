import VerticalPosts from "../components/VerticalPosts.js";
import EmptyPosts from "../components/EmptyPosts.js";
import { useAppSelector } from "../hooks/reduxHooks.js";

export default function Home() {
  const posts = useAppSelector((state) => state.posts.posts);
  const { byKey } = useAppSelector((state) => state.loading);
  return (
    <div>
      {!byKey.posts && posts.length < 1 && (
        <EmptyPosts
          showCreatePost
          title="Будь первым, кто поделится чем-то интересным!"
        />
      )}
      <VerticalPosts posts={posts} />
    </div>
  );
}
