import { useDispatch } from "react-redux";
import { useAuthUser } from "../hooks/useAuthUser";
import App from "./App";
import { fetchGetDataUser } from "../redux/slices/currentUserSlice";
import { useEffect } from "react";
import { getPosts } from "../redux/slices/postsSlice";
import { getLikes } from "../redux/slices/postLikesSlice";

export default function AppInitializer() {
  const user_uid = useAuthUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user_uid) {
      const fetchData = async () => {
        await Promise.all([
          dispatch(fetchGetDataUser(user_uid)).unwrap(),
          dispatch(getPosts()).unwrap(),
        ]);

        await dispatch(getLikes()).unwrap();
      };

      fetchData();
    }
  }, [user_uid, dispatch]);

  return <App />;
}
