import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "../../supabase/supabase";

// GET SINGLE
export const checkLike = createAsyncThunk(
  "postLikes/checkLike",
  async (likeObj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/post_likes?id=eq.${likeObj.id}&user_uid=eq.${likeObj.user_uid}`,
        {
          headers: fetchHeaders,
        }
      );

      if (!response.ok) throw new Error("Ошибка с ПОЛУЧЕНИЕМ лайков");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// DELETE SINGLE
export const deleteLike = createAsyncThunk(
  "postLikes/deleteLike",
  async (likeObj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/post_likes?id=eq.${likeObj.id}&user_uid=eq.${likeObj.user_uid}`,
        {
          method: "DELETE",
          headers: fetchHeaders,
        }
      );

      if (!response.ok) throw new Error("Ошибка с УДАЛЕНИЕМ лайков");

      return { id: likeObj.id, likedByCurrentUser: false };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ADD LIKE
export const addLike = createAsyncThunk(
  "postLikes/addLike",
  async (likeObj, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/post_likes`, {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(likeObj),
      });

      if (!response.ok) throw new Error("Ошибка с ДОБАВЛЕНИЕМ лайков");

      return { id: likeObj.id, likedByCurrentUser: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET ALL
export const getLikes = createAsyncThunk(
  "postLikes/getLikes",
  async (userUid, { rejectWithValue, getState }) => {
    try {
      const url = userUid
        ? `${baseUrl}/post_likes?user_uid=eq.${userUid}`
        : `${baseUrl}/post_likes`;
      const response = await fetch(url, {
        headers: fetchHeaders,
      });

      if (!response.ok) throw new Error("Ошибка при получении лайков");

      const data = await response.json();

      const state = getState();
      const currentUser = state.user.userUid;

      const postsLikes = data.reduce((acc, item) => {
        const { user_uid, id } = item;

        if (!acc[id]) {
          acc[item.id] = {
            likesCount: 0,
            likedByCurrentUser: false,
          };
        }
        acc[id].likesCount += 1;

        if (user_uid === currentUser) {
          acc[id].likedByCurrentUser = true;
        }

        return acc;
      }, {});

      return postsLikes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postLikesSlice = createSlice({
  name: "postLikes",
  initialState: {
    likes: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLikes.fulfilled, (state, action) => {
        state.likes = { ...state.likes, ...action.payload };
      })
      .addCase(addLike.fulfilled, (state, action) => {
        const current = state.likes[action.payload.id];

        let likesCount = current ? current.likesCount + 1 : 1;

        state.likes[action.payload.id] = {
          likedByCurrentUser: true,
          likesCount,
        };
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        const current = state.likes[action.payload.id];

        if (current.likesCount === 1) {
          delete state.likes[action.payload.id];
        } else {
          let likesCount = current.likesCount - 1;
          state.likes[action.payload.id] = {
            likedByCurrentUser: false,
            likesCount,
          };
        }
      });
  },
});

export default postLikesSlice.reducer;
