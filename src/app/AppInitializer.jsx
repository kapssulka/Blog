import { useDispatch } from "react-redux";
import { useAuthUser } from "../hooks/useAuthUser";
import App from "./App";
import { fetchGetDataUser } from "../redux/slices/userSlice";
import { useEffect } from "react";

export default function AppInitializer() {
  const userUid = useAuthUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userUid) dispatch(fetchGetDataUser(userUid));
  }, [userUid, dispatch]);

  return <App />;
}
