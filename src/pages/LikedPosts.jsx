import { useSelector } from "react-redux";
import { useState } from "react";
import VerticalPosts from "../components/VerticalPosts";
import GridPosts from "../features/GridPosts/GridPosts";
import ViewSwitcher from "./Profile/components/ViewSwitcher";
import EmptyPosts from "../components/EmptyPosts";
import { selectLikedPosts } from "../redux/selectors/posts";
import TitleDot from "../components/TitleDot";

export default function LikedPosts() {
  const likedPosts = useSelector(selectLikedPosts);

  const [activeBlock, setActiveBlock] = useState("grid");

  const onChangeActiveBlock = (variant) => setActiveBlock(variant);

  return (
    <div>
      <div className="mb-5 bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
        <TitleDot title="Понравившиеся публикации" />

        {likedPosts.length > 0 && (
          <ViewSwitcher
            className="mt-8"
            activeView={activeBlock}
            onChange={onChangeActiveBlock}
          />
        )}
      </div>

      {activeBlock === "grid" && <GridPosts posts={likedPosts} />}
      {activeBlock === "list" && <VerticalPosts posts={likedPosts} />}

      {likedPosts.length < 1 && (
        <EmptyPosts title="У вас пока нет понравившихся постов" />
      )}
    </div>
  );
}
