import { ROUTES } from "../../constants/routes.js";
import { useAppSelector } from "../../hooks/reduxHooks.js";
import {
  FiHome,
  FiHeart,
  FiPlusSquare,
  FiBookmark,
  FiUser,
} from "react-icons/fi";
import Item from "./Item.js";

export default function BottomNavigation() {
  const { user_uid } = useAppSelector((state) => state.user);

  const size = 24;

  const links = [
    { text: "Главная", path: ROUTES.HOME, icon: <FiHome size={size} /> },
    { text: "Лайки", path: ROUTES.LIKED, icon: <FiHeart size={size} /> },
    {
      text: "Добавить",
      path: ROUTES.NEW_POST,
      icon: <FiPlusSquare size={size} />,
    },
    {
      text: "Закладки",
      path: ROUTES.BOOKMARKS,
      icon: <FiBookmark size={size} />,
    },
    {
      text: "Профиль",
      path: `/profile/${user_uid}`,
      icon: <FiUser size={size} />,
    },
  ];

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        h-20
        bg-zinc-900/95 backdrop-blur
        border-t border-white/10
        grid grid-cols-5 gap-x-3
        px-4 py-4

        md:hidden
      "
    >
      {links.map((item, index) => {
        return (
          <Item key={index} to={item.path} text={item.text} icon={item.icon} />
        );
      })}
    </nav>
  );
}
