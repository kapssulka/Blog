import Skeleton from "react-loading-skeleton";
import { colorsSeleton } from "../../constants/colors.js";

export default function SwitchSkeleton() {
  return (
    <div className="flex justify-center items-center gap-4">
      <Skeleton
        width="97px"
        height="36px"
        baseColor={colorsSeleton.base}
        highlightColor={colorsSeleton.highlightColor}
      />
      <Skeleton
        width="97px"
        height="36px"
        baseColor={colorsSeleton.base}
        highlightColor={colorsSeleton.highlightColor}
      />
    </div>
  );
}
