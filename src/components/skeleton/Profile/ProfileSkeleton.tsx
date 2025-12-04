import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton.js";
import GridPostsSkeleton from "../GridPostsSkeleton.js";

export default function ProfileSkeleton() {
  return (
    <>
      <ProfileHeaderSkeleton className="mb-5" />
      <GridPostsSkeleton />
    </>
  );
}
