import { Outlet } from "react-router-dom";
import Aside from "../features/Aside/Aside";
import Header from "../features/Header/Header";
import MainWrapper from "../components/layout/MainWrapper";

export default function Layout() {
  return (
    <>
      <Header />

      <MainWrapper isTwoColums>
        <Outlet />
        <Aside />
      </MainWrapper>
    </>
  );
}
