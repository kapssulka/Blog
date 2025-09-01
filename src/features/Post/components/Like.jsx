import { IoHeart } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";

export default function Like({ isLike, onClike, likeCount }) {
  const Icon = isLike ? IoHeart : FaRegHeart;

  return (
    <div className="flex items-center  gap-1">
      <Icon
        className={`cursor-pointer transition-opacity duration-200 ${
          isLike ? "text-red-500" : "opacity-80"
        }`}
        opacity={0.8}
        size={28}
        onClick={onClike}
      />
      {likeCount && <div>{likeCount}</div>}
    </div>
  );
}
