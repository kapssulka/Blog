import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "../../supabase/supabase";

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (uid, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/users?user_uid=eq.${uid}&select=*`;
      const response = await fetch(url, {
        headers: fetchHeaders,
      });

      if (!response.ok) throw new Error("Error getting user");
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    isCurrentUserProfile: false,
    activeProfileUid: null,
    users: {},
  },
  reducers: {
    setActiveProfileUid: (state, action) => {
      state.activeProfileUid = action.payload;
    },
    setIsCurrentUserProfile: (state, action) => {
      state.isCurrentUserProfile = action.payload;
    },
    setNewBioLocal: (state, action) => {
      const { user_uid, data } = action.payload;

      state.users[user_uid] = { ...state.users[user_uid], ...data };
    },
    uploadAvatarForUsers: (state, action) => {
      const changedUserObj = action.payload;

      const { user_uid, avatar_url, avatar_path } = changedUserObj;

      state.users[user_uid] = {
        ...state.users[user_uid],
        avatar_url,
        avatar_path,
      };
    },
    changeBioAndName: (state, action) => {
      const changedUserObj = action.payload;

      const { user_uid, bio, name } = changedUserObj;

      state.users[user_uid] = {
        ...state.users[user_uid],
        bio,
        name,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      const user = action.payload[0];
      state.users[user.user_uid] = user;
    });
  },
});
export const {
  setActiveProfileUid,
  setIsCurrentUserProfile,
  setNewBioLocal,
  uploadAvatarForUsers,
  changeBioAndName,
} = usersSlice.actions;
export default usersSlice.reducer;
