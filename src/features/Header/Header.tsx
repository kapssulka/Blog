import { Link } from "react-router-dom";
import LogoutButton from "../../components/Logout/LogoutButton.js";
import BurgerMenu from "../burgerMenu/BurgerMenu.js";
import { ROUTES } from "../../constants/routes.js";
import NavItem from "../../components/UI/NavItem.js";
import Logo from "../../components/Logo.js";

export default function Header() {
  return (
    <header className="relative z-40">
      {/* Для PC */}

      <div className="flex gap-7 px-10 rounded-b-2xl items-center w-full mx-auto max-w-[1020px] h-[100px] justify-between py-3 bg-bg-secondary">
        {/* Лого */}
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {/* Навигация */}
          <nav className="hidden items-center gap-6 md:flex">
            <NavItem to={ROUTES.ABOUT_PROJECT}>О проекте</NavItem>
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-4">
            <LogoutButton />
          </div>
        </div>

        {/* Для Мобилок */}
        <BurgerMenu />
      </div>
    </header>
  );
}
