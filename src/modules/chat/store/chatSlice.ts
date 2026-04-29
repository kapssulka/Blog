import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ChatPreview, MessageChat } from "../types.js";
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
  { data: MessageChat[]; chatId: string },
  { chatId: string; user_uid: string }
>("chat/getMessages", async ({ chatId, user_uid }, { rejectWithValue }) => {
  const { data, error } = await supabase.rpc("get_chat_messages", {
    p_chat_id: chatId,
    p_user_id: user_uid,
  });

  if (error) {
    return rejectWithValue(error.message);
  }

  return {
    data: data ?? [],
    chatId,
  };
});

// Добавление нового сообщения
type NewMessageType = Omit<MessageChat, "id" | "created_at">;

export const addMessage = createAsyncThunk<MessageChat, NewMessageType>(
  "chat/addMessage",
  async (newMessage, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([newMessage])
        .select()
        .single();

      if (error) {
        return rejectWithValue(error.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  },
);

export interface chatSliceState {
  chats: {
    byId: Record<string, ChatPreview>;
    allIds: string[];
  };
  currentChatId: string | null;
  messages: Record<string, MessageChat[]>; // id чата: [сообщения]
  loading: boolean;
}

const initialState: chatSliceState = {
  chats: {
    byId: {},
    allIds: [],
  },
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
        const byId: Record<string, ChatPreview> = {};
        const allIds: string[] = [];

        action.payload.forEach((chat) => {
          byId[chat.chat_id] = chat;
          allIds.push(chat.chat_id);
        });

        state.chats = {
          byId,
          allIds,
        };
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        const { chatId, data } = action.payload;
        state.messages[chatId] = data;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        const message = action.payload;

        const chatId = message.chat_id;

        state.messages[chatId] ??= [];
        state.messages[chatId].push(message);
      });
  },
});

export default chatSlice.reducer;
