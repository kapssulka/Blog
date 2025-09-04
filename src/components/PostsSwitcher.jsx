import { useRef, useState } from "react";
import ViewSwitcher from "../pages/Profile/components/ViewSwitcher";
import GridPosts from "../features/GridPosts/GridPosts";
import VerticalPosts from "./VerticalPosts";
import EmptyPosts from "./EmptyPosts";

export default function PostsSwitcher({
  posts,
  topContent,
  showCreatePost = false,
}) {
  const [activeBlock, setActiveBlock] = useState("grid");

  const refPosts = useRef({});

  const onChangeActiveBlock = (variant) => setActiveBlock(variant);

  const scrollToPost = (index) => {
    onChangeActiveBlock("list");

    setTimeout(() => {
      refPosts.current[index]?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div>
      <div className="mb-5 bg-zinc-900 backdrop-blur-sm rounded-2xl p-6 transition-colors">
        {topContent}

        {posts.length > 0 && (
          <ViewSwitcher
            className="mt-8"
            activeView={activeBlock}
            onChange={onChangeActiveBlock}
          />
        )}
      </div>

      {activeBlock === "grid" && (
        <GridPosts posts={posts} scrollToPost={scrollToPost} />
      )}
      {activeBlock === "list" && (
        <VerticalPosts posts={posts} refPosts={refPosts} />
      )}

      {posts.length < 1 && (
        <EmptyPosts
          title="У вас пока нет сохраненных постов"
          showCreatePost={showCreatePost}
        />
      )}
    </div>
  );
}
