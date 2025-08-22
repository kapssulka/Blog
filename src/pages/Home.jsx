import { useSelector } from "react-redux";
import VerticalPosts from "../components/VerticalPosts";

export default function Home() {
  const posts = useSelector((state) => state.posts.posts);

  return <VerticalPosts posts={posts} />;
}
