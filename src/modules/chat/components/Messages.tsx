import { Outlet, useLocation } from "react-router-dom";
import Header from "../../../features/Header/Header.js";
import MainWrapper from "../../../components/layout/MainWrapper.js";
import PageTransition from "../../../animations/PageTransition.js";
import ScrollToTop from "../../../pages/Layout/ScrollToTop.js";
import Aside from "../../../features/Aside/Aside.js";
import BottomNavigation from "../../../features/BottomNavigation/BottomNavigation.js";

export default function Messages() {
  const location = useLocation();

  const isChat =
    location.pathname.startsWith("/messages/") &&
    location.pathname !== "/messages";

  return (
    <div
      className="
      h-screen overflow-hidden 
      flex flex-col
  "
    >
      <Header />
      <main
        className={`
        flex-1 min-h-0
        mx-auto max-w-[730px] lg:max-w-[1040px] w-full
        pt-5 px-3 lg:pb-10 lg:pt-10 
        lg:grid lg:grid-cols-[minmax(0,730px)_250px] gap-x-[20px]
        ${isChat ? "pb-5" : "pb-28"}
          `}
      >
        <div
          className="
        min-h-0
        flex flex-col gap-y-5 
        bg-bg-secondary h-full rounded-2xl p-5"
        >
          <PageTransition className="min-h-0 flex flex-col flex-1">
            <Outlet />
          </PageTransition>
        </div>
        <ScrollToTop />
        {/* for PC */}
        <Aside />
        {/* for Modile */}
        {!isChat && <BottomNavigation />}
      </main>
    </div>
  );
}
// export default function Messages() {
//   return (
//     <>
//       <Header />

//       <MainWrapper isTwoColums>
//         <PageTransition>
//           <div className="flex flex-col gap-y-5 bg-bg-secondary h-full rounded-2xl p-5">
//             <Outlet />
//           </div>
//           <ScrollToTop />
//         </PageTransition>
//         {/* for PC */}
//         <Aside />
//         {/* for Modile */}
//         <BottomNavigation />
//       </MainWrapper>
//     </>
//   );
// }
