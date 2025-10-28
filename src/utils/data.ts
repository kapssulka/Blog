import type { LikesObject } from "../redux/slices/postLikesSlice.js";

export const getUserLikedPostId = (
  object: Record<number, LikesObject>
): number[] => {
  const arr = [];
  console.log(object);

  for (const key in object) {
    if (object[key]?.likedByCurrentUser) arr.push(Number(key));
  }
  console.log(arr);

  return arr;
};
