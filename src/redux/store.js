import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    [userSlice.name]: userReducer,
  },
});
