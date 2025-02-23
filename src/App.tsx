import { GoogleOAuthProvider } from "@react-oauth/google";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import SuspenseLoader from "./components/Misc/SuspenseLoader";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import UIProviderLayout from "./layouts/UIProviderLayout";

const MainInterface = lazy(() => import("./pages/MainInterface"));
const LandingLayout = lazy(() => import("./layouts/LandingLayout"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    let title;

    if (/^\/try\/chat\/[^/]+$/.test(pathname)) {
      const titleElement = document.querySelector("title");

      if (titleElement && titleElement?.id != "chat_title") {
        titleElement.remove();
      }

      return;
    }

    let titleElement = document.querySelector("title");

    if (!titleElement) {
      titleElement = document.createElement("title");
      document.head.appendChild(titleElement);
    }

    switch (pathname) {
      case "/try/chat":
        title = "GAIA - New Chat";
        break;
      case "/try/search":
        title = "GAIA - Search";
        break;
      case "/try/goals":
        title = "GAIA - Goals";
        break;
      case "/try/notes":
        title = "GAIA - Notes";
        break;
      case "/try/pins":
        title = "GAIA - Pins";
        break;
      case "/terms":
        title = "GAIA - Terms of Service";
        break;
      case "/privacy":
        title = "GAIA - Privacy Policy";
        break;
      case "/login":
        title = "GAIA - Login";
        break;
      case "/get-started":
      case "/signup":
        title = "GAIA - Get Started";
        break;
      default:
        title = "GAIA - Your Personal Assistant";
    }

    titleElement.textContent = title;
  }, [location]);

  window.document.documentElement.classList.add("dark");

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <UIProviderLayout>
          <Toaster richColors theme="dark" />

          <Routes>
            <Route
              element={
                <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
                  <MainInterface />
                </Suspense>
              }
              path="/try/*"
            />
            <Route
              element={
                <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
                  <LandingLayout />
                </Suspense>
              }
              path="/*"
            />
          </Routes>
        </UIProviderLayout>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
