import Like from "./Like";
import Comment from "./Comment";
import BookMark from "./BookMark";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  checkLike,
  deleteLike,
} from "../../../redux/slices/postLikesSlice";
import {
  addBookmark,
  deleteBookmark,
  getBookmark,
} from "../../../redux/slices/postBookmarksSlice";

export default function ActivePanel({ post_id, isLikeDefault, likeCount }) {
  const dispatch = useDispatch();
  const { user_uid } = useSelector((state) => state.user);
  const { bookmarks } = useSelector((state) => state.bookmarks);

  const isBookMarks = bookmarks.includes(Number(post_id));

  const onLikeClik = async (e) => {
    const likeObj = { post_id, user_uid };

    const res = await dispatch(checkLike(likeObj)).unwrap();
    await dispatch(
      res.length > 0 ? deleteLike(likeObj) : addLike(likeObj)
    ).unwrap();
  };

  const onBoolmarkClik = async (e) => {
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
