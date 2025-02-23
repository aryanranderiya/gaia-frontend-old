import { GoogleOAuthProvider } from "@react-oauth/google";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import SuspenseLoader from "./components/Misc/SuspenseLoader";
import { ConversationListProvider } from "./contexts/ConversationList";
import { ConvoProvider } from "./contexts/CurrentConvoMessages";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import UIProviderLayout from "./layouts/UIProviderLayout";

import { mainRoutes } from "@/routes/mainRoutes";

// Lazy-loaded layouts/components
const MainInterface = lazy(() => import("./pages/MainInterface"));
const LandingLayout = lazy(() => import("./layouts/LandingLayout"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    let title;

    if (/^\/try\/chat\/[^/]+$/.test(pathname)) {
      const titleElement = document.querySelector("title");

      if (titleElement && titleElement.id !== "chat_title") {
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
          <ConvoProvider>
            <ConversationListProvider>
              <Toaster richColors theme="dark" />
              <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
                <Routes>
                  <Route element={<MainInterface />} path="/try">
                    {mainRoutes.map(({ path, element }) => (
                      <Route key={path} element={element} path={path} />
                    ))}
                  </Route>

                  <Route
                    element={
                      <Suspense
                        fallback={<SuspenseLoader fullHeight fullWidth />}
                      >
                        <LandingLayout />
                      </Suspense>
                    }
                    path="/*"
                  />
                </Routes>
              </Suspense>
            </ConversationListProvider>
          </ConvoProvider>
        </UIProviderLayout>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
