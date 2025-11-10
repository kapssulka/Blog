import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home.js";
import Message from "../pages/Message/Message.js";
import Layout from "../pages/Layout.js";
import Profile from "../pages/Profile/Profile.js";
import ChatAllUsers from "../features/chat/ChatAllUsers/ChatAllUsers.js";
import ChatSingleUser from "../features/chat/ChatSingleUser/ChatSingleUser.js";
import Register from "../pages/Register.js";
import Login from "../pages/Login.js";
import NotFound from "../pages/NotFound.js";

import { ROUTES } from "../constants/routes.js";
import PrivateRoute from "../components/routes/PrivateRoute.js";
import PublicRoute from "../components/routes/PublicRoute.js";
import { toast, Toaster } from "sonner";
import NewPost from "../pages/NewPost/NewPost.js";
import Loader from "../components/Loader.js";
import { useEffect } from "react";
import { setHasVisited } from "../redux/slices/currentUserSlice.js";
import LikedPosts from "../pages/LikedPosts.js";
import BookmarksPosts from "../pages/BookmarksPosts.js";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks.js";

export default function App() {
  const { loadingCount } = useAppSelector((state) => state.loading);
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
    // <div className="flex flex-col min-h-screen  bg-zinc-950 text-zinc-100">
    <div className=" min-h-screen  bg-zinc-950 text-zinc-100">
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "12px",
          },
        }}
      />
      {loadingCount > 0 && <Loader />}

      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />

          {/* <Route path={ROUTES.MESSAGE.INDEX} element={<Message />}>
            <Route index element={<ChatAllUsers />} />
            <Route path=":id" element={<ChatSingleUser />} />
          </Route> */}

          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route
            path={"/profile"}
            element={<Navigate to={`/profile/${user_uid}`} />}
          />

          <Route path={ROUTES.NEW_POST} element={<NewPost />} />
          <Route path={ROUTES.LIKED} element={<LikedPosts />} />
          <Route path={ROUTES.BOOKMARKS} element={<BookmarksPosts />} />
        </Route>

        <Route
          path={ROUTES.REGISTER}
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </div>
  );
}
