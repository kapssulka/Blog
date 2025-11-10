import { useAuthUser } from "../hooks/useAuthUser.js";
import App from "./App.js";
import { fetchGetDataUser } from "../redux/slices/currentUserSlice.js";
import { useEffect } from "react";
import { getPosts } from "../redux/slices/postsSlice.js";
import { getLikes } from "../redux/slices/postLikesSlice.js";
import { getBookmarks } from "../redux/slices/postBookmarksSlice.js";
import { useAppDispatch } from "../hooks/reduxHooks.js";

export default function AppInitializer() {
  const user_uid = useAuthUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user_uid) {
      const fetchData = async () => {
        await Promise.all([
          dispatch(fetchGetDataUser(user_uid)).unwrap(),
          dispatch(getPosts()).unwrap(),
        ]);

        await dispatch(getLikes()).unwrap();
        await dispatch(getBookmarks(user_uid)).unwrap();
      };

      fetchData();
    }
  }, [user_uid, dispatch]);

  return <App />;
}
