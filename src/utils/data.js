export const getUserLikedPostId = (object) => {
  const arr = [];
  for (const key in object) {
    if (object[key].likedByCurrentUser) arr.push(Number(key));
  }
  return arr;
};
