import Post from "../../features/Post/Post";
import Header from "../../features/Header/Header";
import Aside from "../../features/Aside/Aside";

export default function Home() {
  return (
    <div>
      <Header />
      <main
        className="container mx-auto max-w-[1000px]
        flex gap-x-10 items-start
       pt-10"
      >
        <div className="flex flex-col gap-10 flex-1">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>

        <Aside />
      </main>
    </div>
  );
}
