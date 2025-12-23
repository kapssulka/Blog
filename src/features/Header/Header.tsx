import { Link } from "react-router-dom";
import LogoutButton from "../../components/Logout/LogoutButton.js";
import BurgerMenu from "../burgerMenu/BurgerMenu.js";
import { ROUTES } from "../../constants/routes.js";

export default function Header() {
  return (
    <header
      className="relative z-40 flex items-center justify-end
             bg-bg-secondary 
             shadow-[0_4px_16px_rgba(0,0,0,0.3)]
             h-[100px] rounded-b-2xl 
             px-10 py-3
             backdrop-blur-sm"
    >
      {/* Для PC */}
      <nav className="hidden items-center gap-7 md:flex">
        {/* Кнопки / ссылки */}

        <div className="">
          <Link to={ROUTES.ABOUT_PROJECT}>О проекте</Link>
        </div>
        <LogoutButton />
      </nav>
      {/* Для Мобилок */}
      <BurgerMenu />
    </header>
  );
}
