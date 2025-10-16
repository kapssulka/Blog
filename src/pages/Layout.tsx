import { Outlet } from "react-router-dom";
import Aside from "../features/Aside/Aside.js";
import Header from "../features/Header/Header.js";
import MainWrapper from "../components/layout/MainWrapper.js";

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
