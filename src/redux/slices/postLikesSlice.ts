import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, fetchHeaders } from "../../supabase/supabase.js";
import type { PostInteractionData } from "../../types/models/data.js";
import type { LikeArgs, LikeResponse } from "../types/postLikes.type.js";
import type { RootState } from "../store.js";

// GET SINGLE
export const checkLike = createAsyncThunk<
  //! импорт и может это массив всётаки?
  PostInteractionData[],
  LikeArgs
>("postLikes/checkLike", async (likeObj, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${baseUrl}/post_likes?post_id=eq.${likeObj.post_id}&user_uid=eq.${likeObj.user_uid}`,
      {
        headers: fetchHeaders,
      }
    );

    if (!response.ok) throw new Error("Ошибка с ПОЛУЧЕНИЕМ лайков");

    const data = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ошибка с проверкой на лайк");
  }
});

// DELETE SINGLE
export const deleteLike = createAsyncThunk<LikeResponse, LikeArgs>(
  "postLikes/deleteLike",
  async (likeObj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/post_likes?post_id=eq.${likeObj.post_id}&user_uid=eq.${likeObj.user_uid}`,
        {
          method: "DELETE",
          headers: fetchHeaders,
        }
      );

      if (!response.ok) throw new Error("Ошибка с удалением лайка");

      return { post_id: likeObj.post_id, likedByCurrentUser: false };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка с проверкой на лайк");
    }
  }
);

export const deleteAllLike = createAsyncThunk<PostInteractionData, number>(
  "postLikes/deleteAllLike",
  async (post_id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/post_likes?post_id=eq.${post_id}`,
        {
          method: "DELETE",
          headers: fetchHeaders,
        }
      );

      if (!response.ok) throw new Error("Ошибка с удалением лайков");

      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка с удалением всех лайков");
    }
  }
);

// ADD LIKE
export const addLike = createAsyncThunk<LikeResponse, LikeArgs>(
  "postLikes/addLike",
  async (likeObj, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/post_likes`, {
        method: "POST",
        headers: fetchHeaders,
        body: JSON.stringify(likeObj),
      });

      if (!response.ok) throw new Error("Ошибка с ДОБАВЛЕНИЕМ лайков");

      return { post_id: likeObj.post_id, likedByCurrentUser: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка с добавлением лайка");
    }
  }
);

// GET ALL
export const getLikes = createAsyncThunk<
  Record<number, LikesObject>,
  string | undefined,
  { state: RootState }
>("postLikes/getLikes", async (user_uid, { rejectWithValue, getState }) => {
  try {
    const url = user_uid
      ? `${baseUrl}/post_likes?user_uid=eq.${user_uid}`
      : `${baseUrl}/post_likes`;
    const response = await fetch(url, {
      headers: fetchHeaders,
    });

    if (!response.ok) throw new Error("Ошибка при получении лайков");

    const data: PostInteractionData[] = await response.json();

    const state = getState();
    const currentUser = state.user.user_uid;
    const postsLikes = data.reduce<Record<number, LikesObject>>((acc, item) => {
      const { user_uid, post_id } = item;

      if (!acc[post_id]) {
        acc[post_id] = {
          likesCount: 0,
          likedByCurrentUser: false,
        };
      }
      acc[post_id].likesCount += 1;

      if (user_uid === currentUser) {
        acc[post_id].likedByCurrentUser = true;
      }

      return acc;
    }, {});

    return postsLikes;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("Ошибка с получением всех лайков");
  }
});

export interface LikesObject {
  likesCount: number;
  likedByCurrentUser: boolean;
}

export interface LikesState {
  likes: Record<number, LikesObject>;
}

const initialState: LikesState = {
  likes: {},
};

export const postLikesSlice = createSlice({
  name: "postLikes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikes.fulfilled, (state, action) => {
        state.likes = { ...state.likes, ...action.payload };
      })
      .addCase(addLike.fulfilled, (state, action) => {
        const current = state.likes[action.payload.post_id];

        let likesCount = current ? current.likesCount + 1 : 1;
        state.likes[action.payload.post_id] = {
          likedByCurrentUser: true,
          likesCount,
        };
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        const current: LikesObject = state.likes[action.payload.post_id]!;

        if (current.likesCount === 1) {
          delete state.likes[action.payload.post_id];
        } else {
          let likesCount = current.likesCount - 1;
          state.likes[action.payload.post_id] = {
            likedByCurrentUser: false,
            likesCount,
          };
        }
      });
  },
});

export default postLikesSlice.reducer;
