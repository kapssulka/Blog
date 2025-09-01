import { useDispatch } from "react-redux";
import { useAuthUser } from "../hooks/useAuthUser";
import App from "./App";
import { fetchGetDataUser } from "../redux/slices/currentUserSlice";
import { useEffect } from "react";
import { getPosts } from "../redux/slices/postsSlice";
import { getLikes } from "../redux/slices/postLikesSlice";

export default function AppInitializer() {
  const userUid = useAuthUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userUid) {
      const fetchData = async () => {
        await Promise.all([
          dispatch(fetchGetDataUser(userUid)).unwrap(),
          dispatch(getPosts()).unwrap(),
        ]);

        await dispatch(getLikes()).unwrap();
      };

      fetchData();
    }
  }, [userUid, dispatch]);

  return <App />;
}
