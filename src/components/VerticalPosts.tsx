import Post from "../features/Post/Post.js";
import type { PostData } from "../types/models/data.js";
import { formatDate } from "../utils/date.js";

interface VerticalPostsProps {
  posts: PostData[];
  refPosts?: React.RefObject<Record<string, HTMLDivElement | null>>;
}
export default function VerticalPosts({ posts, refPosts }: VerticalPostsProps) {
  return (
    <div className="flex flex-col gap-10 ">
      {posts.map((post) => {
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
            avatar_url={post.author.avatar_url}
          />
        );
      })}
    </div>
  );
}
