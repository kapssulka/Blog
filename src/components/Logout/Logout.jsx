import { TbLogout } from "react-icons/tb";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useDispatch } from "react-redux";
import { resetDataUser } from "../../redux/slices/currentUserSlice";
export default function Logout() {
  const dispatch = useDispatch();
  const handleClick = () => {
    signOut(auth);
    dispatch(resetDataUser());
  };

  return (
    <div className="flex items-center gap-x-1 cursor-pointer">
      <button
        onClick={handleClick}
        className="text-white font-bold text-[18px] hover:underline cursor-pointer"
      >
        Выйти
      </button>
      <TbLogout color="#fff" size={30} />
    </div>
  );
}
