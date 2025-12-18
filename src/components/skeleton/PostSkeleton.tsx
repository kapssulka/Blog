import Skeleton from "react-loading-skeleton";
import { colorsSeleton } from "../../constants/colors.js";

export default function PostSkeleton() {
  return (
    <div className="w-full max-h-[740px] bg-bg-secondary rounded-2xl px-3 py-5 xs:px-5 pb-[95px]">
      <div className="flex items-center mb-5">
        <Skeleton
          circle
          height={60}
          width={60}
          baseColor={colorsSeleton.base}
          highlightColor={colorsSeleton.highlightColor}
          className="mr-5"
        />
        <div className="w-full flex flex-col gap-2">
          <Skeleton
            height={20}
            width="30%"
            baseColor={colorsSeleton.base}
            highlightColor={colorsSeleton.highlightColor}
          />
          <Skeleton
            height={20}
            width="50%"
            baseColor={colorsSeleton.base}
            highlightColor={colorsSeleton.highlightColor}
          />
        </div>
      </div>

      <Skeleton
        width="100%"
        baseColor={colorsSeleton.base}
        highlightColor={colorsSeleton.highlightColor}
        className="aspect-[5/3]"
        borderRadius="0.75rem"
      />
    </div>
  );
}
