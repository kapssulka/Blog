import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import AnimatedIconPulse from "../../../animations/AnimatedIconPulse.js";

interface BookMarkProps {
  onClik?: React.MouseEventHandler<SVGAElement>;
  isActiveBookmark: boolean;
}

export default function BookMark({ onClik, isActiveBookmark }: BookMarkProps) {
  const Icon: IconType = isActiveBookmark ? FaBookmark : FaRegBookmark;

  return (
    <AnimatedIconPulse isActive={isActiveBookmark}>
      <Icon className="cursor-pointer opacity-80" size={26} onClick={onClik} />
    </AnimatedIconPulse>
  );
}
