import { IoHeart } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";
import AnimatedIconPulse from "../../../animations/AnimatedIconPulse.js";

interface LikeProps {
  isLike: boolean;
  onClik?: React.MouseEventHandler<SVGElement>;
  likeCount: number;
}
export default function Like({ isLike, onClik, likeCount }: LikeProps) {
  const Icon: IconType = isLike ? IoHeart : FaRegHeart;

  return (
    <div className="flex items-center  gap-1">
      <AnimatedIconPulse isActive={isLike}>
        <Icon
          className={`cursor-pointer ${isLike ? "text-red-500" : "opacity-80"}`}
          opacity={0.8}
          size={28}
          onClick={onClik}
        />
      </AnimatedIconPulse>

      {likeCount && <div>{likeCount}</div>}
    </div>
  );
}
