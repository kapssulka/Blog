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

      return await response.json();
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      const user = action.payload[0];
      state.users[user.user_uid] = user;
    });
  },
});
export const { setActiveProfileUid, setIsCurrentUserProfile } =
  usersSlice.actions;
export default usersSlice.reducer;
