import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";
import PrivateRoute from "../components/routes/PrivateRoute.js";
import Layout from "../pages/Layout/Layout.js";
import Home from "../pages/Home.js";
import NewPost from "../pages/NewPost/NewPost.js";
import LikedPosts from "../pages/LikedPosts.js";
import Profile from "../pages/Profile/Profile.js";
import BookmarksPosts from "../pages/BookmarksPosts.js";
import PublicRoute from "../components/routes/PublicRoute.js";
import Register from "../pages/Register.js";
import Login from "../pages/Login.js";
import NotFound from "../pages/NotFound.js";
import { useAppSelector } from "../hooks/reduxHooks.js";

export default function AppRoutes() {
  const { user_uid } = useAppSelector((state) => state.user);

  return (
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
  );
}
