import Like from "./Like";
import Comment from "./Comment";
import BookMark from "./BookMark";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  checkLike,
  deleteLike,
} from "../../../redux/slices/postLikesSlice";

export default function ActivePanel({ postId, isLikeDefault, likeCount }) {
  const dispatch = useDispatch();
  const { userUid } = useSelector((state) => state.user);

  const onLikeClike = async (e) => {
    const likeObj = { id: postId, user_uid: userUid };
    await dispatch(checkLike(likeObj)).unwrap();

    await dispatch(
      res.length > 0 ? deleteLike(likeObj) : addLike(likeObj)
    ).unwrap();
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-x-2">
        <Like
          isLike={isLikeDefault}
          onClike={onLikeClike}
          likeCount={likeCount}
        />
        <Comment />
      </div>

      <div>
        <BookMark />
      </div>
    </div>
  );
}
