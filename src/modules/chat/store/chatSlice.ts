import { createSlice } from "@reduxjs/toolkit";
import type { ChatPreview } from "../types.js";
import type { Message } from "yup";

// Методы:

//? getOrCreateChat(userA, userB)
// - ищем чат между A и B
// - если есть → возвращаем
// - если нет → создаём

//? sendMessage(chatId, senderId, content)
// - просто добавляем сообщение

//? getUserChats(userId)
// - для левого сайдбара (получение всех пользователей с кем есть чат)

//? getMessages(chatId)
// - получение всех сообщений текущего чата

//? markAsRead(chatId, userId)
// - пометить как прочитано (пока не трогаем)

export interface chatSliceState {
  chats: ChatPreview[];
  currentChatId: string | null;
  messages: Record<string, Message[]>; // id чата: [сообщения]
  participants: Record<string, string[]>; // id чата: [участники]
  loading: boolean;
}

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    currentChatId: null,
    messages: {},
    participants: {},
    loading: false,
  },
  reducers: {},
});

export default chatSlice.reducer;
