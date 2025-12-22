import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useDispatch } from "react-redux";
import { resetDataUser } from "../../redux/slices/currentUserSlice.js";
import { resetAllBookmarks } from "../../redux/slices/postBookmarksSlice.js";

interface LogoutButtonProps {
  maxWidth?: string;
}

export default function LogoutButton({ maxWidth }: LogoutButtonProps) {
  const dispatch = useDispatch();
  const handleClick = () => {
    signOut(auth);
    dispatch(resetDataUser());
    dispatch(resetAllBookmarks());
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full px-4 py-2 rounded-lg
                cursor-pointer
                 bg-error
                 hover:bg-error-hover
                 text-white font-medium transition-colors duration-300 ${
                   maxWidth ? maxWidth : ""
                 }`}
    >
      Выйти
    </button>
  );
}
