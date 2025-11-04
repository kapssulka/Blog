import { createListenerMiddleware, isFulfilled } from "@reduxjs/toolkit";
import {
  fetchDeleteAvatar,
  fetchPatchDataUser,
  fetchUploadAvatar,
} from "./slices/currentUserSlice";
import {
  changeBioAndNameForPosts,
  uploadAvatarForPosts,
} from "./slices/postsSlice";
import { changeBioAndName, uploadAvatarForUsers } from "./slices/usersSlice";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: (action) =>
    isFulfilled(fetchUploadAvatar)(action) ||
    isFulfilled(fetchDeleteAvatar)(action),
  effect: async (action, { dispatch }) => {
    const payload = action.payload;
    dispatch(uploadAvatarForPosts(payload));
    dispatch(uploadAvatarForUsers(payload));
  },
});

listenerMiddleware.startListening({
  matcher: isFulfilled(fetchPatchDataUser),
  effect: async (action, { dispatch }) => {
    const payload = action.payload;

    dispatch(changeBioAndName(payload));
    dispatch(changeBioAndNameForPosts(payload));
  },
});
