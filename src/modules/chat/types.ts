import type { UserData } from "../../types/models/data.js";

export interface ChatPreview {
  chatId: string;
  userId: string; // собеседник
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  userInfo: UserData;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}
