import Post from "../features/Post/Post.js";
import { useAppSelector } from "../hooks/reduxHooks.js";
import type { LoadingKey } from "../types/models/loading.js";
import { formatDate } from "../utils/date.js";
import PostSkeleton from "./skeleton/PostSkeleton.js";

interface VerticalPostsProps {
  postsId: number[];
  refPosts?: React.RefObject<Record<string, HTMLDivElement | null>>;
  loadingKey: LoadingKey;
}
export default function VerticalPosts({
  postsId,
  refPosts,
}: VerticalPostsProps) {
  const { byKey } = useAppSelector((state) => state.loading);
  const postsById = useAppSelector((state) => state.posts.posts.byId);

  return (
    <div className="flex flex-col gap-y-5">
      {byKey.loadingKey ? (
        <PostSkeleton />
      ) : (
        postsId.map((id) => {
          const post = postsById[id];

          if (!post) return null;

          const date = formatDate(post.created_at);

          return (
            <Post
              ref={(el) => {
                if (refPosts && refPosts.current) {
                  refPosts.current[post.post_id] = el;
                }
              }}
              images={post.images}
              description={post.text}
              key={post.post_id}
              avtor={post.author.name}
              user_uid={post.author.user_uid}
              create_at={date}
              post_id={post.post_id}
              avatar_url={post.author.avatar_url ?? ""}
            />
          );
        })
      )}
    </div>
  );
}
