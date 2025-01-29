import NotLoggedIn from "@/components/NotLoggedInDialog";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SuspenseLoader from "./components/SuspenseLoader";
import { UserProvider } from "./contexts/UserContext";
import Landing from "./layouts/LandingLayout";
const MainInterface = lazy(() => import("./pages/MainInterface"));

function App() {
  const location = useLocation();
  // const [onboardingOpen, setOnboardingOpen] = useState(true);

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
        title = "Login to GAIA";
        break;
      case "/signup":
        title = "Signup for GAIA";
        break;
      default:
        title = "GAIA";
    }

    titleElement.textContent = title;
  }, [location]);

  window.document.documentElement.classList.add("dark");

  return (
    <UserProvider>
      <NotLoggedIn />
      <Routes>
        <Route
          path="/try/*"
          element={
            <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
              <MainInterface />
            </Suspense>
          }
        />
        <Route path="/*" element={<Landing />} />
        {/* <Route path="/record" element={<Record />} /> */}
      </Routes>
    </UserProvider>
  );
}

export default App;
