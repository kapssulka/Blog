import UserBioItem from "./components/UserBioItem.js";
import { useAppSelector } from "../../../../hooks/reduxHooks.js";

export default function UserBio() {
  const { users, activeProfileUid } = useAppSelector((state) => state.users);
  const currentUser = activeProfileUid ? users[activeProfileUid] : null;

  return (
    <div className="flex flex-col gap-y-3">
      {currentUser?.name && <UserBioItem name text={currentUser.name} />}
      {currentUser?.bio && <UserBioItem text={currentUser.bio} />}
    </div>
  );
}
