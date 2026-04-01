import { Link } from "react-router-dom";
import LogoutButton from "../../components/Logout/LogoutButton.js";
import BurgerMenu from "../burgerMenu/BurgerMenu.js";
import { ROUTES } from "../../constants/routes.js";
import NavItem from "../../components/UI/NavItem.js";
import Logo from "../../components/Logo.js";

export default function Header() {
  return (
    <header className="relative z-40 h-[100px]">
      {/* Для PC */}
      <div className="bg-bg-secondary px-10 py-3 h-full">
        <div className="flex gap-7 rounded-b-2xl items-center w-full mx-auto h-full max-w-[1020px] justify-between">
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
      </div>
    </header>
  );
}
