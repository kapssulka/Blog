import Skeleton from "react-loading-skeleton";
import SwitchSkeleton from "../SwitchSkeleton.js";
import { colorsSeleton } from "../../../constants/colors.js";
interface HeaderForSavePostsSkeletonProps {
  className?: string;
}

export default function HeaderForSavePostsSkeleton({
  className,
}: HeaderForSavePostsSkeletonProps) {
  return (
    <div className={`mb-5 bg-zinc-900 p-6 rounded-2xl ${className}`}>
      <Skeleton
        width="300px"
        height="20px"
        baseColor={colorsSeleton.base}
        highlightColor={colorsSeleton.highlightColor}
        className="mb-8"
      />
      <SwitchSkeleton />
    </div>
  );
}
