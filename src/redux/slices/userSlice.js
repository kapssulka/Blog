import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "./../../supabase/supabase";
import { data } from "react-router-dom";

// GET
export const fetchGetData = createAsyncThunk(
  "users/fetchGetData",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/users?select=*`;
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
  "users/fetchPostDataUsers",
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
      //   return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    test: "Всё супер!",
  },
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchGetData.pending, (state, action) => {})
      .addCase(fetchGetData.fulfilled, (state, action) => {
        console.log("Супер");
        console.log(action.payload);
      })
      .addCase(fetchGetData.rejected, (state, action) => {
        console.log("Ошибка");

        console.log(action.payload);
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

export default userSlice.reducer;
