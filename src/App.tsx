// App.jsx
import LoginModal from "@/components/Login/LoginModal";
import SuspenseLoader from "@/components/Misc/SuspenseLoader";
import useAxiosInterceptor from "@/hooks/useAxiosInterceptor";
import useFetchUser from "@/hooks/useFetchUser";
import { mainRoutes } from "@/routes/mainRoutes";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const MainInterface = lazy(() => import("./pages/MainInterface"));
const LandingLayout = lazy(() => import("./layouts/LandingLayout"));

export default function App() {
  const location = useLocation();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useAxiosInterceptor(setLoginModalOpen);
  useFetchUser();

  useEffect(() => {
    const img = new Image();
    img.src = "/landing/hero_image_nosearchbar.webp";
  }, []);

  useEffect(() => {
    const { pathname } = location;
    let title;

    if (/^\/c\/[^/]+$/.test(pathname)) {
      const titleElement = document.querySelector("title");
      if (titleElement && titleElement.id !== "chat_title")
        titleElement.remove();
      return;
    }
    let titleElement = document.querySelector("title");
    if (!titleElement) {
      titleElement = document.createElement("title");
      document.head.appendChild(titleElement);
    }
    switch (pathname) {
      case "/c":
        title = "GAIA - New Chat";
        break;
      case "/search":
        title = "GAIA - Search";
        break;
      case "/goals":
        title = "GAIA - Goals";
        break;
      case "/notes":
        title = "GAIA - Notes";
        break;
      case "/pins":
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

  // useEffect(() => {
  //   if (!user && !publicPages.includes(location.pathname)) {
  //     setLoginModalOpen(true);
  //   } else setLoginModalOpen(false);
  // }, [user, location.pathname]);

  return (
    <>
      <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
      <Toaster closeButton richColors position="top-right" theme="dark" />
      <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
        <Routes>
          <Route element={<MainInterface />}>
            {mainRoutes.map(({ path, element }) => (
              <Route key={path} element={element} path={path} />
            ))}
          </Route>
          <Route
            element={
              <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
                <LandingLayout setLoginModalOpen={setLoginModalOpen} />
              </Suspense>
            }
            path="/*"
          />
        </Routes>
      </Suspense>
    </>
  );
}
