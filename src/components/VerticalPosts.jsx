import Post from "../features/Post/Post";
import { formatDate } from "../utils/date";

export default function VerticalPosts({ posts, refPosts }) {
  return (
    <div className="flex flex-col gap-10 flex-1">
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
            avtor={post.users.name}
            user_uid={post.users.user_uid}
            create_at={date}
            post_id={post.post_id}
            avatar_url={post.users.avatar_url}
          />
        );
      })}
    </div>
  );
}
