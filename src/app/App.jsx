import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Message from "../pages/Message/Message";
import Layout from "../pages/Layout.js";
import Profile from "../pages/Profile/Profile";
import ChatAllUsers from "../features/chat/ChatAllUsers/ChatAllUsers";
import ChatSingleUser from "../features/chat/ChatSingleUser/ChatSingleUser";
import Register from "../pages/Register";
import Login from "../pages/Login.js";
import NotFound from "../pages/NotFound";

import { ROUTES } from "../constants/routes";
import PrivateRoute from "../components/routes/PrivateRoute";
import PublicRoute from "../components/routes/PublicRoute";
import { toast, Toaster } from "sonner";
import NewPost from "../pages/NewPost/NewPost.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useEffect } from "react";
import { setHasVisited } from "../redux/slices/currentUserSlice";
import LikedPosts from "../pages/LikedPosts.js";
import BookmarksPosts from "../pages/BookmarksPosts.js";

export default function App() {
  const { loadingCount } = useSelector((state) => state.loading);
  const { user_uid, name, hasVisited } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
