import type { UserData } from "../../types/models/data.js";

export interface ChatPreview {
  chat_id: string;
  user_id: string; // собеседник
  last_message: string;
  last_message_at: string;
  unread_count: number;
  user_info: UserData;
}

export interface MessageChat {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

type ChatError = "NOT_FOUND" | "FORBIDDEN";

export const ChatError = {
  NOT_FOUND: "CHAT_NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
} as const;
