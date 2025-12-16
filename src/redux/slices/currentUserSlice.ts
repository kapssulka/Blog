import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @ts-ignore
import { baseUrl, fetchHeaders } from "../../supabase/supabase.js";
import type { UserData } from "../../types/models/data.js";
import type {
  CurrentUserArgs,
  DataChangeAvatar,
  DataChangeBio,
} from "../types/currentUserSlice.type.js";

// GET
export const fetchGetDataUser = createAsyncThunk<UserData, string>(
  "user/fetchGetDataUser",
  async (uid, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/users?user_uid=eq.${uid}&select=*`;
      const response = await fetch(url, {
        headers: fetchHeaders,
      });

      if (!response.ok) throw new Error("Ошибка с запросом");
      const data = await response.json();

      return data[0];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

// POST
interface fetchPostDataUsers {
  name: string;
  user_uid: string;
}

export const fetchPostDataUsers = createAsyncThunk<
  UserData,
  fetchPostDataUsers
>("user/fetchPostDataUsers", async (arg, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify(arg),
    });

    if (!response.ok) throw new Error("Ошибка c добавлением");

    const data = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

// PATCH

export const fetchPatchDataUser = createAsyncThunk<
  UserData,
  CurrentUserArgs<DataChangeBio>
>("user/fetchPatchDataUser", async (obj, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${baseUrl}/users?user_uid=eq.${obj.user_uid}`,
      {
        method: "PATCH",
        headers: fetchHeaders,
        body: JSON.stringify(obj.data),
      }
    );

    if (!response.ok) throw new Error("Ошибка с обновлением данных!");

    const data = await response.json();

    return data[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

// UPLOAD AVATAR

export const fetchUploadAvatar = createAsyncThunk<
  UserData,
  CurrentUserArgs<DataChangeAvatar>
>("user/fetchUploadAvatar", async (obj, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${baseUrl}/users?user_uid=eq.${obj.user_uid}`,
      {
        method: "PATCH",
        headers: fetchHeaders,
        body: JSON.stringify(obj.data),
      }
    );

    if (!response.ok) throw new Error("Ошибка с обновлением аватарки!");

    const data = await response.json();

    return data[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const fetchDeleteAvatar = createAsyncThunk<
  UserData,
  CurrentUserArgs<DataChangeAvatar>
>("user/fetchDeleteAvatar", async (obj, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${baseUrl}/users?user_uid=eq.${obj.user_uid}`,
      {
        method: "PATCH",
        headers: fetchHeaders,
        body: JSON.stringify(obj.data),
      }
    );

    if (!response.ok) throw new Error("Ошибка с обновлением аватарки!");

    const data = await response.json();

    return data[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const currentUserSlice = createSlice({
  name: "user",
  initialState: {
    user_uid: "",
    name: "",
    bio: "",
    // created_at: "",
    hasVisited: false,
    // user_avatar: "",
  },
  reducers: {
    setHasVisited: (state, action) => {
      state.hasVisited = action.payload;
    },

    resetDataUser: (state) => {
      state.user_uid = "";
      state.name = "";
      // state.bio = "";
      // state.created_at = "";
      state.hasVisited = false;
      // state.user_avatar = {};
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchGetDataUser.fulfilled, (state, action) => {
        const { user_uid, name, bio, created_at, avatar_url, avatar_path } =
          action.payload;

        state.user_uid = user_uid;
        state.name = name;
        bio ? (state.bio = bio) : (state.bio = "");
        // avatar_url && avatar_path
        //   ? (state.user_avatar = { avatar_url, avatar_path })
        //   : (state.user_avatar = {});
        // state.created_at = created_at;
      })
      .addCase(fetchGetDataUser.rejected, (state, action) => {
        console.log("ОШИБКА: ", action.payload);
      })
      .addCase(fetchPostDataUsers.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchPostDataUsers.rejected, (state, action) => {})
      .addCase(fetchPatchDataUser.fulfilled, (state, action) => {
        const { name, bio } = action.payload;

        state.name = name;
        state.bio = bio;
      })
      .addCase(fetchUploadAvatar.fulfilled, (state, action) => {
        const { avatar_path, avatar_url } = action.payload;
      })
      .addCase(fetchDeleteAvatar.fulfilled, (state, action) => {
        const { avatar_path, avatar_url } = action.payload;
      });
  },
});
export const { setHasVisited, resetDataUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
