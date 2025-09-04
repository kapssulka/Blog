import TitleDot from "../components/TitleDot";
import { useSelector } from "react-redux";
import { selectBookmarksPosts } from "../redux/selectors/posts";

import PostsSwitcher from "../components/PostsSwitcher";

export default function BookmarksPosts() {
  const bookmarksPosts = useSelector(selectBookmarksPosts);

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
