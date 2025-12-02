import Skeleton from "react-loading-skeleton";
import { colorsSeleton } from "../../constants/colors.js";

export default function GridPostsSkeleton() {
  const skeletonCount = Array.from({ length: 6 });

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
