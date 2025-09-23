import { createListenerMiddleware, isFulfilled } from "@reduxjs/toolkit";
import { fetchUploadAvatar } from "./slices/currentUserSlice";
import { uploadAvatarForPosts } from "./slices/postsSlice";
import { uploadAvatarForUsers } from "./slices/usersSlice";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isFulfilled(fetchUploadAvatar),
  effect: async (action, { dispatch }) => {
    const payload = action.payload[0];
    dispatch(uploadAvatarForPosts(payload));
    dispatch(uploadAvatarForUsers(payload));
  },
});
