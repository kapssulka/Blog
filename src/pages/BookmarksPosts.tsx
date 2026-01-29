import TitleDot from "../components/TitleDot.js";

import PostsSwitcher from "../components/PostsSwitcher.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks.js";
import SavePostsSkeleton from "../components/skeleton/SavePosts/SavePostsSkeleton.js";
import { useEffect } from "react";
import { getBookmarksPosts } from "../redux/slices/postsSlice.js";

export default function BookmarksPosts() {
  const dispatch = useAppDispatch();

  const { byKey } = useAppSelector((state) => state.loading);
  const bookmarksPosts = useAppSelector((state) => state.bookmarks.bookmarks);
  const { user_uid } = useAppSelector((state) => state.user);

  const hasRequestedBookmarks = useAppSelector(
    (state) => state.posts.hasRequestedPage.bookmarks,
  );

  useEffect(() => {
    if (user_uid && !hasRequestedBookmarks)
      dispatch(getBookmarksPosts(user_uid));
  }, [dispatch, user_uid, hasRequestedBookmarks]);

  return (
    <>
      {byKey.bookmarkPosts ? (
        <SavePostsSkeleton />
      ) : (
        <PostsSwitcher
          loadingKey="bookmarkPosts"
          postsId={bookmarksPosts}
          topContent={
            <TitleDot title="Сохраненные публикации" dotColor="bg-blue-500" />
          }
        />
      )}
    </>
  );
}
