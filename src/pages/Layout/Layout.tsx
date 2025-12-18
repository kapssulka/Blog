import { Outlet, useLocation } from "react-router-dom";
import Aside from "../../features/Aside/Aside.js";
import Header from "../../features/Header/Header.js";
import MainWrapper from "../../components/layout/MainWrapper.js";
import { AnimatePresence, motion } from "motion/react";
import BottomNavigation from "../../features/BottomNavigation/BottomNavigation.js";
import ScrollToTop from "./ScrollToTop.js";

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <Header />

      <MainWrapper isTwoColums>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
          >
            <Outlet />
            <ScrollToTop />
          </motion.div>
        </AnimatePresence>
        {/* for PC */}
        <Aside />
        {/* for Modile */}
        <BottomNavigation />
      </MainWrapper>
    </>
  );
}
