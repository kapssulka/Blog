export const ROUTES = {
  HOME: "/",
  MESSAGE: {
    INDEX: "/message",
    CHAT_WITH_USER: (id) => `/message/${id}`,
  },
  PROFILE: "/profile",
  NEW_POST: "/new_post",
  BOOKMARKS: "/bookmarks",
  LIKED: "/liked",
  NOT_FOUND: "*",
  REGISTER: "/register",
  LOGIN: "/login",
};
