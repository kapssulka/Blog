import StatsPanel from "../../../features/StatsPanel/StatsPanel.js";
import UserBio from "./UserBio/UserBio.js";
import Button from "../../../components/Button/Button.js";
import { useState } from "react";
import EditProfile from "./EditProfile/EditProfile.js";
import EditAvatar from "../../../components/Avatar/EditAvatar.js";
import { useAppSelector } from "../../../hooks/reduxHooks.js";

export default function ProfileHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isCurrentUserProfile } = useAppSelector((state) => state.users);

  return (
    <div className="px-15 ">
      <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex items-center justify-between">
        <EditAvatar />
        <StatsPanel />
      </div>

      <div className="mt-5 flex flex-col gap-y-5">
        <UserBio />
        {isCurrentUserProfile && (
          <Button
            onClick={() => setIsOpen(true)}
            className="self-center w-full"
            text="Редактирвоать профиль"
          />
        )}
      </div>
    </div>
  );
}
