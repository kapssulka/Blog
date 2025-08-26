import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "../../supabase/supabase";

// GET
export const fetchGetDataUser = createAsyncThunk(
  "user/fetchGetDataUser",
  async (uid, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/users?user_uid=eq.${uid}&select=*`;
      const response = await fetch(url, {
        headers: fetchHeaders,
      });

      if (!response.ok) throw new Error("Ошибка с запросом");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST
export const fetchPostDataUsers = createAsyncThunk(
  "user/fetchPostDataUsers",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(arg),
      });

      if (!response.ok) throw new Error("Ошибка c добавлением");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PATCH

export const fetchPatchDataUser = createAsyncThunk(
  "user/fetchPatchDataUser",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/users?user_uid=eq.${obj.userUid}`,
        {
          method: "PATCH",
          headers: fetchHeaders,
          body: JSON.stringify(obj.data),
        }
      );

      if (!response.ok) throw new Error("Ошибка с обновлением данных!");

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const currentUserSlice = createSlice({
  name: "user",
  initialState: {
    userUid: "",
    name: "",
    bio: "",
    created_at: "",
  },
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchGetDataUser.fulfilled, (state, action) => {
        const { user_uid, name, bio, created_at } = action.payload[0];

        state.userUid = user_uid;
        state.name = name;
        bio ? (state.bio = bio) : (state.bio = "");
        state.created_at = created_at;
      })
      .addCase(fetchGetDataUser.rejected, (state, action) => {
        console.log("ОШИБКА: ", action.payload);
      })
      .addCase(fetchPostDataUsers.fulfilled, (state, action) => {})
      .addCase(fetchPostDataUsers.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchPatchDataUser.fulfilled, (state, action) => {
        const { name, bio } = action.payload[0];
        state.name = name;
        state.bio = bio;
      })
      .addCase(fetchPatchDataUser.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});
export const { setUserUid } = currentUserSlice.actions;
export default currentUserSlice.reducer;
