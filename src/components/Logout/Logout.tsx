import { TbLogout } from "react-icons/tb";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useDispatch } from "react-redux";
// @ts-ignore
import { resetDataUser } from "../../redux/slices/currentUserSlice.js";
// @ts-ignore
import { resetAllBookmarks } from "../../redux/slices/postBookmarksSlice.js";
export default function Logout() {
  const dispatch = useDispatch();
  const handleClick = () => {
    signOut(auth);
    dispatch(resetDataUser());
    dispatch(resetAllBookmarks());
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
