import { IoHeart } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";

interface LikeProps {
  isLike: boolean;
  onClik?: React.MouseEventHandler<SVGElement>;
  likeCount: number;
}
export default function Like({ isLike, onClik, likeCount }: LikeProps) {
  const Icon: IconType = isLike ? IoHeart : FaRegHeart;

  return (
    <div className="flex items-center  gap-1">
      <Icon
        className={`cursor-pointer transition-opacity duration-200 ${
          isLike ? "text-red-500" : "opacity-80"
        }`}
        opacity={0.8}
        size={28}
        onClick={onClik}
      />
      {likeCount && <div>{likeCount}</div>}
    </div>
  );
}
