import {
  configureStore,
  type AnyAction,
  type Middleware,
} from "@reduxjs/toolkit";
import { currentUserSlice } from "./slices/currentUserSlice.js";
import { postsSlice } from "./slices/postsSlice.js";
import { finish, loadingSlice, start } from "./slices/loadingSlice.js";
import { usersSlice } from "./slices/usersSlice.js";
import { postLikesSlice } from "./slices/postLikesSlice.js";
import { postBookmarksSlice } from "./slices/postBookmarksSlice.js";
import userReducer from "./slices/currentUserSlice.js";
import postsReducer from "./slices/postsSlice.js";
import loadingReducer from "./slices/loadingSlice.js";
import usersReducer from "./slices/usersSlice.js";
import postLikesReducer from "./slices/postLikesSlice.js";
import postBookmarksReducer from "./slices/postBookmarksSlice.js";
import { listenerMiddleware } from "./listeners.js";

function isActionWithType(action: unknown): action is { type: string } {
  return (
    typeof action === "object" &&
    action !== null &&
    typeof (action as any).type === "string"
  );
}

const loadingMiddleware: Middleware<{}, any, any> =
  (store) => (next) => (action) => {
    if (isActionWithType(action)) {
      if (action.type === "posts/getPosts/pending") {
        store.dispatch(start("posts"));
      } else if (
        action.type.endsWith("posts/getPosts/fulfilled") ||
        action.type.endsWith("posts/getPosts/rejected")
      ) {
        store.dispatch(finish("posts"));
      }
    }
    return next(action);
  };

const store = configureStore({
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
