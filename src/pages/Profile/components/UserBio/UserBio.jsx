import { useSelector } from "react-redux";
import UserBioItem from "./components/UserBioItem";

export default function UserBio() {
  const { name, bio } = useSelector((state) => state.user);

  return (
    <div>
      {name && <UserBioItem name text={name} />}
      {bio && <UserBioItem text={bio} />}
    </div>
  );
}
