import Like from "./Like.js";
import Comment from "./Comment.js";
import BookMark from "./BookMark.js";

import {
  addLike,
  checkLike,
  deleteLike,
  toggleLikeLocally,
} from "../../../redux/slices/postLikesSlice.js";
import {
  addBookmark,
  deleteBookmark,
  getBookmark,
  toggleBookmarkLocally,
} from "../../../redux/slices/postBookmarksSlice.js";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks.js";

interface ActivePanelProps {
  post_id: number;
  isLikeDefault: any;
  likeCount: any;
}

export default function ActivePanel({
  post_id,
  isLikeDefault,
  likeCount,
}: ActivePanelProps) {
  const dispatch = useAppDispatch();
  const { user_uid } = useAppSelector((state) => state.user);
  const { bookmarks } = useAppSelector((state) => state.bookmarks);

  const isBookMarks = bookmarks.includes(Number(post_id));

  const onLikeClik = async (e: React.MouseEvent<SVGElement>) => {
    dispatch(toggleLikeLocally({ post_id }));
    const likeObj = { post_id, user_uid };

    const res = await dispatch(checkLike(likeObj)).unwrap();
    await dispatch(
      res.length > 0 ? deleteLike(likeObj) : addLike(likeObj)
    ).unwrap();
  };

  const onBoolmarkClik = async (e: React.MouseEvent<SVGElement>) => {
    dispatch(toggleBookmarkLocally({ post_id }));
    const bookmarkObj = { post_id, user_uid };

    const res = await dispatch(getBookmark(bookmarkObj)).unwrap();

    await dispatch(
      res.length > 0 ? deleteBookmark(bookmarkObj) : addBookmark(bookmarkObj)
    ).unwrap();
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-x-2">
        <Like
          isLike={isLikeDefault}
          onClik={onLikeClik}
          likeCount={likeCount}
        />
        <Comment />
      </div>

      <div>
        <BookMark onClik={onBoolmarkClik} isActiveBookmark={isBookMarks} />
      </div>
    </div>
  );
}
