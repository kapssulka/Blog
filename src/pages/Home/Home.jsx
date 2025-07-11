import Post from "../../features/Post/Post";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 flex-1">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
