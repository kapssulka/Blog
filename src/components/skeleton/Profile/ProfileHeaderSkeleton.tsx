import Skeleton from "react-loading-skeleton";
import { colorsSeleton } from "../../../constants/colors.js";
import SwitchSkeleton from "../SwitchSkeleton.js";

interface ProfileHeaderSkeletonProps {
  className?: string;
}

export default function ProfileHeaderSkeleton({
  className,
}: ProfileHeaderSkeletonProps) {
  const countPanelSkeletons = Array.from({ length: 3 });

  return (
    <div
      className={`w-full  bg-zinc-900 rounded-2xl py-6 px-21 aspect-[2/1] ${className}`}
    >
      <div className="flex items-center justify-between">
        <Skeleton
          width="120px"
          height="120px"
          circle
          baseColor={colorsSeleton.base}
          highlightColor={colorsSeleton.highlightColor}
          borderRadius="0.75rem"
        />

        <div className="flex gap-x-10">
          {countPanelSkeletons.map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton
                width="40px"
                baseColor={colorsSeleton.base}
                highlightColor={colorsSeleton.highlightColor}
              />
              <Skeleton
                width="90px"
                baseColor={colorsSeleton.base}
                highlightColor={colorsSeleton.highlightColor}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 mb-8 flex flex-col gap-y-5">
        <div>
          <Skeleton
            width="120px"
            baseColor={colorsSeleton.base}
            highlightColor={colorsSeleton.highlightColor}
          />
          <Skeleton
            width="180px"
            baseColor={colorsSeleton.base}
            highlightColor={colorsSeleton.highlightColor}
          />
        </div>
        <Skeleton
          width="100%"
          height="40px"
          baseColor={colorsSeleton.base}
          highlightColor={colorsSeleton.highlightColor}
        />
      </div>
      <SwitchSkeleton />
    </div>
  );
}
