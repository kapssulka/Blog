import { TbLogout } from "react-icons/tb";
export default function Logout() {
  return (
    <div className="flex items-center gap-x-1 cursor-pointer">
      <button className="text-white font-bold text-[18px] hover:underline cursor-pointer">
        Выйти
      </button>
      <TbLogout color="#fff" size={30} />
    </div>
  );
}
