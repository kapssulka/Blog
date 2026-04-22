import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ChatPreview } from "../types.js";
import type { Message } from "yup";
import { supabase } from "../../../supabase/supabase.js";

// Методы:

//* Готовые:

//? getOrCreateChat(userA, userB)
// Зачада вернуть id текущего чата (или создать и вернуть если его нет)

//? getUserChats(userId)
// - для левого сайдбара (получение всех пользователей с кем есть чат)

//? getMessages(chatId)
// - получение всех сообщений текущего чата

//? При входе в чат:
// Сайдбар со всеми чатами: подгрузка под useEffect[]
// Сообщения справа: подгрузка под useEffect[currentChatId] или "Дефолтное сообщение"

//! Не готовые:
//? sendMessage(chatId, senderId, content)
// - просто добавляем сообщение

//? markAsRead(chatId, userId)
// - пометить как прочитано (пока не трогаем)

type GetOrCreateChatArgs = {
  user_a: string;
  user_b: string;
};

// Возврат текущего чата
export const getOrCreateChat = createAsyncThunk<
  string,
  GetOrCreateChatArgs,
  { rejectValue: string }
>("chat/getOrCreateChat", async ({ user_a, user_b }, { rejectWithValue }) => {
  const { data, error } = await supabase.rpc("get_or_create_chat", {
    user_a,
    user_b,
  });

  if (error) return rejectWithValue(error.message);

  if (!data) return rejectWithValue("Не удалось получить chatId");

  return data;
});

// Получение всех чатов (уже готовая форма)
export const getUserChats = createAsyncThunk<ChatPreview[], string>(
  "chat/getUserChats",
  async (userUid, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.rpc("get_user_chats", {
        p_user: userUid,
      });

      if (error) throw new Error("Error getting user chats");

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

// Получение всех сообщений текущего чата
export const getMessages = createAsyncThunk<
  { data: Message[]; chatId: string },
  string
>("chat/getMessages", async (chatId, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (error) {
      return rejectWithValue(error.message);
    }

    return {
      data: data ?? [],
      chatId,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error",
    );
  }
});

export interface chatSliceState {
  chats: ChatPreview[];
  currentChatId: string | null;
  messages: Record<string, Message[]>; // id чата: [сообщения]
  loading: boolean;
}

const initialState: chatSliceState = {
  chats: [],
  currentChatId: null,
  messages: {},
  loading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrCreateChat.fulfilled, (state, action) => {
        state.currentChatId = action.payload;
      })
      .addCase(getUserChats.fulfilled, (state, action) => {
        state.chats = action.payload;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        const { chatId, data } = action.payload;
        state.messages[chatId] = data;
      });
  },
});

export default chatSlice.reducer;
