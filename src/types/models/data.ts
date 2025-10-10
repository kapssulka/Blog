// ---- POSTS ----

export interface PostData {
  post_id: number;
  user_uid: string;
  created_at: string;
  text: string;
  author: UserData;
  images: ImageData[];
}

// ---- USERS ----

export interface UserData {
  id: number;
  bio: string;
  name: string;
  user_uid: string;
  avatar_url: string;
  created_at: string;
  avatar_path: string;
}

// ---- POST IMAGES ----

export interface ImageData {
  id: number;
  post_id: number;
  url: string;
  position: number;
  is_main: boolean;
  path: string;
}

// ---- LIKES ----

export interface PostInteractionData {
  post_id: number;
  user_uid: string;
  created_at: string;
}
