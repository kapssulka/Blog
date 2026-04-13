import { useRef, useState } from "react";
import ViewSwitcher from "../pages/Profile/components/ViewSwitcher.js";
import GridPosts from "../features/GridPosts/GridPosts.js";
import VerticalPosts from "./VerticalPosts.js";
import EmptyPosts from "./EmptyPosts.js";
import type { PostsViewMode } from "../types/ui/view.js";
import { useAppSelector } from "../hooks/reduxHooks.js";
import type { LoadingKey } from "../types/models/loading.js";

interface PostsSwitcherProps {
  postsId: number[];
  topContent: React.ReactNode;
  showCreatePost?: boolean;
  loadingKey: LoadingKey;
}

export default function PostsSwitcher({
  postsId = [],
  topContent,
  showCreatePost = false,
  loadingKey,
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
      <div className="mb-5 bg-bg-secondary backdrop-blur-sm rounded-2xl p-6 transition-colors">
        {topContent}

        {postsId.length > 0 && (
          <ViewSwitcher
            className="mt-8"
            activeView={activeBlock}
            onChange={onChangeActiveBlock}
          />
        )}
      </div>

      {activeBlock === "grid" && (
        <GridPosts
          postsId={postsId}
          scrollToPost={scrollToPost}
          loadingKey={loadingKey}
        />
      )}
      {activeBlock === "list" && (
        <VerticalPosts
          postsId={postsId}
          refPosts={refPosts}
          loadingKey={loadingKey}
        />
      )}

      {!byKey[loadingKey] && postsId.length < 1 && (
        <EmptyPosts
          title="У вас ещё нет постов. Начните с нового!"
          showCreatePost={showCreatePost}
        />
      )}
    </div>
  );
}
