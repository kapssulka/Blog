import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "./../../supabase/supabase";

// GET
export const fetchGetDataUser = createAsyncThunk(
  "user/fetchGetDataUser",
  async (uid, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/users?userUid=eq.${uid}&select=*`;
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
      console.log("Код ответа: ", response);

      if (!response.ok) throw new Error("Ошибка c добавлением");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
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
        const { userUid, name, bio, created_at } = action.payload[0];

        state.userUid = userUid;
        state.name = name;
        state.bio = bio;
        state.created_at = created_at;
      })
      .addCase(fetchGetDataUser.rejected, (state, action) => {
        console.log("ОШИБКА: ", action.payload);
      })
      .addCase(fetchPostDataUsers.pending, (state, action) => {})
      .addCase(fetchPostDataUsers.fulfilled, (state, action) => {
        console.log("Имя добавлено");
        console.log(action.payload);
      })
      .addCase(fetchPostDataUsers.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});
export const { setUserUid } = userSlice.actions;
export default userSlice.reducer;
