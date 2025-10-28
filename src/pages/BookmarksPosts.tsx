import TitleDot from "../components/TitleDot.js";
import { selectBookmarksPosts } from "../redux/selectors/posts.js";

import PostsSwitcher from "../components/PostsSwitcher.js";
import { useAppSelector } from "../hooks/reduxHooks.js";
import type { PostData } from "../types/models/data.js";

export default function BookmarksPosts() {
  const bookmarksPosts: PostData[] = useAppSelector(selectBookmarksPosts);

  return (
    <div>
      <PostsSwitcher
        posts={bookmarksPosts}
        topContent={
          <TitleDot title="Сохраненные публикации" dotColor="bg-blue-500" />
        }
      />
    </div>
  );
}
