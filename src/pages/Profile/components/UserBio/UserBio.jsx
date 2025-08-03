import { useSelector } from "react-redux";
import UserBioItem from "./components/UserBioItem";

export default function UserBio() {
  const { name, bio } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-y-3">
      {name && <UserBioItem name text={name} />}
      {bio && <UserBioItem text={bio} />}
    </div>
  );
}
