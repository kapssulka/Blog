import { createListenerMiddleware, isFulfilled } from "@reduxjs/toolkit";
import {
  fetchDeleteAvatar,
  fetchUploadAvatar,
} from "./slices/currentUserSlice";
import { uploadAvatarForPosts } from "./slices/postsSlice";
import { uploadAvatarForUsers } from "./slices/usersSlice";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: (action) =>
    isFulfilled(fetchUploadAvatar)(action) ||
    isFulfilled(fetchDeleteAvatar)(action),
  effect: async (action, { dispatch }) => {
    const payload = action.payload[0];
    dispatch(uploadAvatarForPosts(payload));
    dispatch(uploadAvatarForUsers(payload));
  },
});
