import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useDispatch } from "react-redux";
import { resetDataUser } from "../../redux/slices/currentUserSlice.js";
import { resetAllBookmarks } from "../../redux/slices/postBookmarksSlice.js";
export default function Logout() {
  const dispatch = useDispatch();
  const handleClick = () => {
    signOut(auth);
    dispatch(resetDataUser());
    dispatch(resetAllBookmarks());
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-lg
                cursor-pointer
                 bg-error
                 hover:bg-error-hover
                 text-white font-medium transition-colors duration-300"
    >
      Выйти
    </button>
  );
}
