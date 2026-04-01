import { Outlet } from "react-router-dom";
import Aside from "../../features/Aside/Aside.js";
import Header from "../../features/Header/Header.js";
import MainWrapper from "../../components/layout/MainWrapper.js";
import BottomNavigation from "../../features/BottomNavigation/BottomNavigation.js";
import ScrollToTop from "./ScrollToTop.js";
import PageTransition from "../../animations/PageTransition.js";

export default function Layout() {
  return (
    <>
      <Header />

      <MainWrapper isTwoColums>
        <PageTransition>
          <Outlet />
          <ScrollToTop />
        </PageTransition>
        {/* for PC */}
        <Aside />
        {/* for Modile */}
        <BottomNavigation />
      </MainWrapper>
    </>
  );
}
