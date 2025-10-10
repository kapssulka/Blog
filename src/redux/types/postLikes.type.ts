export interface LikeArgs {
  post_id: number;
  user_uid: string;
}
export interface LikeResponse {
  post_id: number;
  likedByCurrentUser: boolean;
}
