import { Outlet } from "react-router-dom";
import Aside from "../features/Aside/Aside";
import Header from "../features/Header/Header";
import MainWrapper from "../components/layout/MainWrapper";

export default function Layout() {
  return (
    <>
      <Header />
      <MainWrapper>
        <section className="flex-1">
          <Outlet />
        </section>
        <Aside />
      </MainWrapper>
    </>
  );
}
