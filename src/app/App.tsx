import { toast, Toaster } from "sonner";
import Loader from "../components/Loader.js";
import { useEffect } from "react";
import { setHasVisited } from "../redux/slices/currentUserSlice.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks.js";
import AppRoutes from "./AppRoutes.js";

export default function App() {
  const { global } = useAppSelector((state) => state.loading);
  const { user_uid, name, hasVisited } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!hasVisited) return;
    if (user_uid && name) {
      const timer = setTimeout(() => {
        toast.success(`${name}, добро пожаловать!`);
        dispatch(setHasVisited(false));
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [hasVisited, name, dispatch]);

  return (
    <div className=" min-h-screen bg-bg-main text-zinc-100">
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "12px",
          },
        }}
      />
      {global > 0 && <Loader />}

      <AppRoutes />
    </div>
  );
}
