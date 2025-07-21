import AvatarIcon from "./../../../components/Avatar/AvatarIcon";
import StatsPanel from "../../../features/StatsPanel/StatsPanel";
import UserBio from "./UserBio/UserBio";
import Button from "../../../components/Button/Button";

export default function ProfileHeader() {
  return (
    <div className="px-15">
      <div className="flex items-center justify-between">
        <AvatarIcon classNameSize="h-30 w-30" />
        <StatsPanel />
      </div>

      <div className="mt-5 flex flex-col gap-y-5">
        <UserBio />

        <Button className="self-center w-full" text="Редактирвоать профиль" />
      </div>
    </div>
  );
}
