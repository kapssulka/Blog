import { Outlet } from "react-router-dom";

export default function Message() {
  return (
    <div className="overflow-hidden bg-zinc-900 h-full max-h-[calc(100vh-140px)] rounded-2xl p-5">
      <Outlet />
    </div>
  );
}
