import AvatarIcon from "./../../../components/Avatar/AvatarIcon";
import StatsPanel from "../../../features/StatsPanel/StatsPanel";
import UserBio from "./UserBio/UserBio";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import EditProfile from "./EditProfile/EditProfile";

export default function ProfileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-15 ">
      <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex items-center justify-between">
        <AvatarIcon classNameSize="h-30 w-30" />
        <StatsPanel />
      </div>

      <div className="mt-5 flex flex-col gap-y-5">
        <UserBio />

        <Button
          onClick={() => setIsOpen(true)}
          className="self-center w-full"
          text="Редактирвоать профиль"
        />
      </div>
    </div>
  );
}
