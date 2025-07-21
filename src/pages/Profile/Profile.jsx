import GridPosts from "../../features/GridPosts/GridPosts";
import ProfileHeader from "./components/ProfileHeader";

export default function Profile() {
  return (
    <div className="flex flex-col gap-y-5 bg-zinc-900 h-full  rounded-2xl p-5">
      <ProfileHeader />

      <GridPosts />
    </div>
  );
}
