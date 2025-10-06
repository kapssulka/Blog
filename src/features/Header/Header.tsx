import Logout from "../../components/Logout/Logout.js";

export default function Header() {
  return (
    <header
      className="flex items-center justify-end
     bg-gradient-to-r from-amber-400 via-amber-500 to-cyan-500 min-h-[100px] rounded-b-2xl 
     px-10 py-3"
    >
      <nav className="flex items-center gap-7">
        <Logout />
      </nav>
    </header>
  );
}
