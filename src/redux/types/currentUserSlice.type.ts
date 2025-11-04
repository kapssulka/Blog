export interface DataChangeBio {
  name?: string;
  bio?: string;
}
export interface DataChangeAvatar {
  avatar_path: string | null;
  avatar_url: string | null;
}
export interface CurrentUserArgs<T> {
  data: T;
  user_uid: string;
}
