import Post from "../features/Post/Post";

export default function VerticalPosts({ posts }) {
  return (
    <div className="flex flex-col gap-10 flex-1">
      {posts.map((post) => {
        return (
          <Post images={post.images} description={post.text} key={post.id} />
        );
      })}
    </div>
  );
}
