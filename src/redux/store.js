import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { postsSlice } from "./slices/postsSlice";
import userReducer from "./slices/userSlice";
import postsReduser from "./slices/postsSlice";

export default configureStore({
  reducer: {
    [userSlice.name]: userReducer,
    [postsSlice.name]: postsReduser,
  },
});
