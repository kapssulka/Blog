import Logout from "../../components/Logout/Logout.js";

export default function Header() {
  return (
    <header
      className="flex items-center justify-end
             bg-bg-secondary 
             shadow-[0_4px_16px_rgba(0,0,0,0.3)]
             min-h-[100px] rounded-b-2xl 
             px-10 py-3
             backdrop-blur-sm"
    >
      <nav className="flex items-center gap-7">
        {/* Кнопки / ссылки */}
        <Logout />
      </nav>
    </header>
  );
}
