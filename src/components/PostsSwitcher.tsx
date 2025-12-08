import { useRef, useState } from "react";
import ViewSwitcher from "../pages/Profile/components/ViewSwitcher.js";
import GridPosts from "../features/GridPosts/GridPosts.js";
import VerticalPosts from "./VerticalPosts.js";
import EmptyPosts from "./EmptyPosts.js";
import type { PostData } from "../types/models/data.js";
import type { PostsViewMode } from "../types/ui/view.js";
import { useAppSelector } from "../hooks/reduxHooks.js";

interface PostsSwitcherProps {
  posts: PostData[];
  topContent: React.ReactNode;
  showCreatePost?: boolean;
}

export default function PostsSwitcher({
  posts,
  topContent,
  showCreatePost = false,
}: PostsSwitcherProps) {
  const { byKey } = useAppSelector((state) => state.loading);

  const [activeBlock, setActiveBlock] = useState<PostsViewMode>("grid");

  const refPosts = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const onChangeActiveBlock = (variant: PostsViewMode) =>
    setActiveBlock(variant);

  const scrollToPost = (index: number) => {
    onChangeActiveBlock("list");

    setTimeout(() => {
      refPosts?.current[index]?.scrollIntoView({ behavior: "smooth" });
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

      {byKey.posts && posts.length < 1 && (
        <EmptyPosts
          title="У вас пока нет сохраненных постов"
          showCreatePost={showCreatePost}
        />
      )}
    </div>
  );
}
