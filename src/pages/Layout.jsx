import { Outlet } from "react-router-dom";
import Aside from "../features/Aside/Aside";

export default function Layout() {
  return (
    <main
      className="mx-auto max-w-[1000px] w-full
            flex flex-1  gap-x-10 
           pt-10"
    >
      <section className="flex-1">
        <Outlet />
      </section>
      <Aside />
    </main>
  );
}
