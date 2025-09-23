import { configureStore } from "@reduxjs/toolkit";
import { currentUserSlice } from "./slices/currentUserSlice";
import { postsSlice } from "./slices/postsSlice";
import { loadingSlice } from "./slices/loadingSlice";
import { usersSlice } from "./slices/usersSlice";
import { postLikesSlice } from "./slices/postLikesSlice";
import { postBookmarksSlice } from "./slices/postBookmarksSlice";
import userReducer from "./slices/currentUserSlice";
import postsReducer from "./slices/postsSlice";
import loadingReducer from "./slices/loadingSlice";
import usersReducer from "./slices/usersSlice";
import postLikesReducer from "./slices/postLikesSlice";
import postBookmarksReducer from "./slices/postBookmarksSlice";
import { listenerMiddleware } from "./listeners";

const loadingMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/pending")) {
    store.dispatch({ type: "loading/increment" });
  } else if (
    action.type.endsWith("/fulfilled") ||
    action.type.endsWith("/rejected")
  ) {
    store.dispatch({ type: "loading/decrement" });
  }
  return next(action);
};

export default configureStore({
  reducer: {
    [currentUserSlice.name]: userReducer,
    [usersSlice.name]: usersReducer,
    [postsSlice.name]: postsReducer,
    [loadingSlice.name]: loadingReducer,
    [postLikesSlice.name]: postLikesReducer,
    [postBookmarksSlice.name]: postBookmarksReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      loadingMiddleware,
      listenerMiddleware.middleware
    ),
});
