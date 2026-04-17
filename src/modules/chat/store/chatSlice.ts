import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ChatPreview } from "../types.js";
import type { Message } from "yup";
import { supabase } from "../../../supabase/supabase.js";

// Методы:

//? getOrCreateChat(userA, userB)
// Зачада вернуть id текущего чата (или создать и вернуть если его нет)

//? При входе в чат:
// Сайдбар со всеми чатами: подгрузка под useEffect[]
// Сообщения справа: подгрузка под useEffect[currentChatId] или "Дефолтное сообщение"

//? sendMessage(chatId, senderId, content)
// - просто добавляем сообщение

//? getUserChats(userId)
// - для левого сайдбара (получение всех пользователей с кем есть чат)

//? getMessages(chatId)
// - получение всех сообщений текущего чата

//? markAsRead(chatId, userId)
// - пометить как прочитано (пока не трогаем)

type GetOrCreateChatArgs = {
  user_a: string;
  user_b: string;
};

// Возврат текущего чата
export const getOrCreateChat = createAsyncThunk<string, GetOrCreateChatArgs>(
  "chat/getOrCreateChat",
  async ({ user_a, user_b }, { rejectWithValue }) => {
    const { data, error } = await supabase.rpc("get_chat_between_users", {
      user_a,
      user_b,
    });

    if (error) return rejectWithValue(error.message);

    // 2. если чат есть — возвращаем
    if (data) {
      console.log("Чат есть, вот ID: ", data);

      return data;
    }

    // 3. создаём новый чат
    const { data: newChat, error: chatError } = await supabase
      .from("chats")
      .insert({})
      .select()
      .single();

    if (chatError || !newChat) return rejectWithValue(chatError?.message);
    console.log("Создали новый чат: ", newChat);

    // 4. создаём участников
    const { data: participantsData, error: participantsError } = await supabase
      .from("chat_participants")
      .insert([
        {
          chat_id: newChat.id,
          user_id: user_a,
        },
        {
          chat_id: newChat.id,
          user_id: user_b,
        },
      ])
      .select();

    if (participantsError) return rejectWithValue(participantsError.message);
    console.log("Создали чат между пользователями: ", participantsData);

    // 5. возвращаем новый chat_id
    return newChat.id;
  },
);

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

export interface chatSliceState {
  chats: ChatPreview[];
  currentChatId: string | null;
  messages: Record<string, Message[]>; // id чата: [сообщения]
  participants: Record<string, string[]>; // id чата: [участники]
  loading: boolean;
}

const initialState: chatSliceState = {
  chats: [],
  currentChatId: null,
  messages: {},
  participants: {},
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
      });
  },
});

export default chatSlice.reducer;
