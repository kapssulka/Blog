import Logout from "../../components/Logout/Logout";

export default function Header() {
  return (
    <header
      className="flex items-center justify-end
     bg-amber-400 min-h-[100px] rounded-b-2xl 
     px-10 py-3"
    >
      <nav className="flex items-center gap-7">
        {/* NavLink */}
        <a
          href="/profiel"
          className="text-white font-bold text-[18px] hover:underline"
        >
          Мой профиль
        </a>
        <Logout />
      </nav>
    </header>
  );
}
