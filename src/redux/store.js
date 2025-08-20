import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { postsSlice } from "./slices/postsSlice";
import { loadingSlice } from "./slices/loadingSlice";
import userReducer from "./slices/userSlice";
import postsReduser from "./slices/postsSlice";
import loadingReduser from "./slices/loadingSlice";

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
    [userSlice.name]: userReducer,
    [postsSlice.name]: postsReduser,
    [loadingSlice.name]: loadingReduser,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(loadingMiddleware),
});
