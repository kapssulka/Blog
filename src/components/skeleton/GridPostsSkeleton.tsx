import Skeleton from "react-loading-skeleton";
import { colorsSeleton } from "../../constants/colors.js";

interface GridPostsSkeletonProps {
  itemsCount?: number;
}

export default function GridPostsSkeleton({
  itemsCount = 6,
}: GridPostsSkeletonProps) {
  const skeletonCount = Array.from({ length: itemsCount });

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {skeletonCount.map((_, index) => (
        <Skeleton
          key={index}
          className="aspect-square"
          borderRadius="0.75rem"
          baseColor={colorsSeleton.base}
          highlightColor={colorsSeleton.highlightColor}
        />
      ))}
    </div>
  );
}
