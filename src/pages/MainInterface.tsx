import NotLoggedIn from "@/components/NotLoggedInDialog";
import CloseOpenSidebarBtn from "@/components/Sidebar/CloseOpenSidebar";
import SuspenseLoader from "@/components/SuspenseLoader";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

// Providers
import { ConversationListProvider } from "@/contexts/ConversationList";
import { ConvoProvider } from "@/contexts/CurrentConvoMessages";
import { LoadingProvider } from "@/contexts/LoadingContext";

// Lazy loaded components
const Sidebar = React.lazy(() => import("../layouts/Sidebar"));
const Search = React.lazy(() => import("@/components/Search/Search"));
const MainChat = React.lazy(() => import("./MainChat"));
const Explore = React.lazy(() => import("./Explore"));
const Calendar = React.lazy(() => import("@/components/Calendar/Calendar"));
const Pins = React.lazy(() => import("./Pins"));
const Notes = React.lazy(() => import("./Notes"));
const Goals = React.lazy(() => import("./Goals"));
const GoalPage = React.lazy(() => import("./GoalPage"));
const NotesAdd = React.lazy(() => import("./NotePage"));

export default function MainInterface() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    if (location.pathname === "/try/") navigate("/try/chat");
  }, [location, navigate]);

  function toggleSidebar(): void {
    if (sidebarRef.current && contentContainerRef.current) {
      setSidebarVisible((prev) => !prev);
    }
  }

  const routes = [
    {
      path: "chat/:convoIdParam",
      element: <MainChat />,
    },
    {
      path: "chat",
      element: <MainChat />,
    },
    {
      path: "explore",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <Explore />
        </Suspense>
      ),
    },
    {
      path: "calendar",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <Calendar />
        </Suspense>
      ),
    },
    {
      path: "pins",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <Pins />
        </Suspense>
      ),
    },
    {
      path: "notes",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <Notes />
        </Suspense>
      ),
    },
    {
      path: "notes/add",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <NotesAdd />
        </Suspense>
      ),
    },
    {
      path: "notes/:id",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <NotesAdd />
        </Suspense>
      ),
    },
    {
      path: "goals",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <Goals />
        </Suspense>
      ),
    },
    {
      path: "goals/:goalId",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <GoalPage />
        </Suspense>
      ),
    },
    {
      path: "search",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <Search />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
          <Navigate to="/404" />
        </Suspense>
      ),
    },
  ];

  return (
    <ConversationListProvider>
      <ConvoProvider>
        <LoadingProvider>
          <TooltipProvider>
            <div className="main_container dark">
              <Suspense fallback={<SuspenseLoader />}>
                <NotLoggedIn />
              </Suspense>

              <Suspense fallback={<SuspenseLoader />}>
                <Sidebar
                  sidebarref={sidebarRef}
                  toggleSidebar={toggleSidebar}
                  isSidebarVisible={isSidebarVisible}
                />
              </Suspense>

              <div
                ref={contentContainerRef}
                // onClick={hideSidebar}
                // onClick={() => setSidebarVisible(false)}
                className="main_chat transition-all"
              >
                <div
                  className={`chat_sidebar_toggle_btn bg-black rounded-xl transition-opacity ${
                    isSidebarVisible ? "sm:opacity-0" : "sm:opacity-100"
                  }`}
                >
                  <CloseOpenSidebarBtn toggleSidebar={toggleSidebar} />
                </div>

                <Routes>
                  {routes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Routes>
              </div>
            </div>
          </TooltipProvider>
        </LoadingProvider>
      </ConvoProvider>
    </ConversationListProvider>
  );
}
