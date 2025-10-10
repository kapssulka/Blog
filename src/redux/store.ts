import { configureStore } from "@reduxjs/toolkit";
// @ts-ignore
import { currentUserSlice } from "./slices/currentUserSlice.js";
// @ts-ignore

import { postsSlice } from "./slices/postsSlice.js";
// @ts-ignore
import { loadingSlice } from "./slices/loadingSlice.js";
// @ts-ignore
import { usersSlice } from "./slices/usersSlice.js";
import { postLikesSlice } from "./slices/postLikesSlice.js";
import { postBookmarksSlice } from "./slices/postBookmarksSlice.js";
// @ts-ignore
import userReducer from "./slices/currentUserSlice.js";
// @ts-ignore
import postsReducer from "./slices/postsSlice.js";
// @ts-ignore
import loadingReducer from "./slices/loadingSlice.js";
// @ts-ignore
import usersReducer from "./slices/usersSlice.js";
import postLikesReducer from "./slices/postLikesSlice.js";
import postBookmarksReducer from "./slices/postBookmarksSlice.js";
// @ts-ignore
import { listenerMiddleware } from "./listeners.js";

// @ts-ignore
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
