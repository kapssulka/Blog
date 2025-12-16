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

  const avatarSkeletonConfig = [
    { size: "120px", class: "hidden sm:block" },
    { size: "100px", class: "hidden xs:block sm:hidden" },
    { size: "160px", class: "block xs:hidden" },
  ];

  return (
    <div
      className={`w-full bg-bg-secondary rounded-2xl py-6 px-5 aspect-[2/1] sm:px-21 ${className}`}
    >
      <div className="flex flex-col items-center justify-around gap-10 xs:gap-5  xs:flex-row sm:justify-between">
        {avatarSkeletonConfig.map((item, index) => (
          <div className={item.class} key={index}>
            <Skeleton
              width={item.size}
              height={item.size}
              circle
              baseColor={colorsSeleton.base}
              highlightColor={colorsSeleton.highlightColor}
              borderRadius="0.75rem"
            />
          </div>
        ))}

        <div className="flex  gap-x-5 sm:gap-x-10">
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

      <div className="mt-10 xs:mt-5 mb-8 flex flex-col gap-y-5">
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
