import { useSelector } from "react-redux";
import UserBioItem from "./components/UserBioItem";

export default function UserBio() {
  const { users, activeProfileUid } = useSelector((state) => state.users);

  const { name, bio } = users[activeProfileUid] ?? {};

  return (
    <div className="flex flex-col gap-y-3">
      {name && <UserBioItem name text={name} />}
      {bio && <UserBioItem text={bio} />}
    </div>
  );
}
