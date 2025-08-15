import { useDispatch } from "react-redux";
import { useAuthUser } from "../hooks/useAuthUser";
import App from "./App";
import { fetchGetDataUser } from "../redux/slices/userSlice";
import { useEffect } from "react";
import { getPosts } from "../redux/slices/postsSlice";

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
      };

      fetchData();
    }
  }, [userUid, dispatch]);

  return <App />;
}
