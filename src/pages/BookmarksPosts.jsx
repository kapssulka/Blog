import TitleDot from "../components/TitleDot";
import ViewSwitcher from "./Profile/components/ViewSwitcher";
import EmptyPosts from "../components/EmptyPosts";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBookmarksPosts } from "../redux/selectors/posts";
import GridPosts from "../features/GridPosts/GridPosts";
import VerticalPosts from "../components/VerticalPosts";

export default function BookmarksPosts() {
  const [activeBlock, setActiveBlock] = useState("grid");

  const bookmarksPosts = useSelector(selectBookmarksPosts);

  const onChangeActiveBlock = (variant) => setActiveBlock(variant);

  return (
    <div>
      <div className="mb-5 bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
        <TitleDot title="Сохраненные публикации" dotColor="bg-blue-500" />

        {bookmarksPosts.length > 0 && (
          <ViewSwitcher
            className="mt-8"
            activeView={activeBlock}
            onChange={onChangeActiveBlock}
          />
        )}
      </div>

      {activeBlock === "grid" && <GridPosts posts={bookmarksPosts} />}
      {activeBlock === "list" && <VerticalPosts posts={bookmarksPosts} />}

      {bookmarksPosts.length < 1 && (
        <EmptyPosts title="У вас пока нет понравившихся постов" />
      )}
    </div>
  );
}
