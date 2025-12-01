import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./swiper-custom.css";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import AppInitializer from "./app/AppInitializer.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppInitializer />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
