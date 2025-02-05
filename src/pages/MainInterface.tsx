import CloseOpenSidebarBtn from "@/components/Sidebar/CloseOpenSidebar";
import SuspenseLoader from "@/components/SuspenseLoader";
// import WebsiteName from "@/components/TopWebsiteName";
import { ConversationListProvider } from "@/contexts/ConversationList";
import { ConvoProvider } from "@/contexts/CurrentConvoMessages";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useMediaQuery from "../hooks/MediaQuery";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load the components
const Sidebar = lazy(() => import("../layouts/Sidebar"));
const Search = lazy(() => import("@/components/Search/Search"));
const MainChat = lazy(() => import("./MainChat"));
const Explore = lazy(() => import("./Explore"));
const Calendar = lazy(() => import("@/components/Calendar/Calendar"));
const Pins = lazy(() => import("./Pins"));
const Notes = lazy(() => import("./Notes"));
const Goals = lazy(() => import("./Goals"));
const GoalPage = lazy(() => import("./GoalPage"));
const NotesAdd = lazy(() => import("./NotePage"));
const NotLoggedIn = lazy(() => import("@/components/NotLoggedInDialog"));

export default function MainInterface() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const isMobileScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (location.pathname === "/try/") navigate("/try/chat");
  }, [location, navigate]);

  function toggleSidebar(): void {
    if (sidebarRef.current && contentContainerRef.current) {
      if (isSidebarVisible) {
        sidebarRef.current.classList.add("hide");
        contentContainerRef.current.classList.remove("hide");

        setTimeout(() => {
          if (sidebarRef?.current) {
            sidebarRef?.current.classList.add("!hidden");
            sidebarRef?.current.classList.remove("flex");
          }
        }, 300);
        setSidebarVisible(false);
      } else {
        contentContainerRef.current.classList.add("hide");
        sidebarRef.current.classList.remove("hide");
        sidebarRef?.current.classList.remove("!hidden");
        sidebarRef?.current.classList.add("flex");

        setSidebarVisible(true);
      }
    }
  }

  const hideSidebar = () => {
    if (
      !(
        sidebarRef.current &&
        contentContainerRef.current &&
        isSidebarVisible &&
        isMobileScreen
      )
    )
      return;

    sidebarRef.current.classList.add("hide");
    contentContainerRef.current.classList.remove("hide");
    setSidebarVisible(false);
  };

  useEffect(() => {
    if (isMobileScreen && isSidebarVisible) toggleSidebar();
  }, [isMobileScreen, isSidebarVisible]);

  return (
    <ConversationListProvider>
      <ConvoProvider>
        <LoadingProvider>
          <TooltipProvider>
            <div className="main_container dark">
              {/* <Suspense fallback={<SuspenseLoader fullHeight={true} />}> */}
              <Toaster richColors />

              <Suspense fallback={<SuspenseLoader />}>
                <NotLoggedIn />
              </Suspense>

              <Sidebar sidebarref={sidebarRef} toggleSidebar={toggleSidebar} />
              {/* </Suspense> */}
              <div
                ref={contentContainerRef}
                onClick={hideSidebar}
                className="main_chat"
              >
                <div
                  className={`chat_sidebar_toggle_btn bg-black rounded-xl transition-opacity ${
                    isSidebarVisible ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <CloseOpenSidebarBtn toggleSidebar={toggleSidebar} />
                </div>

                <Routes>
                  <Route path="chat/:convoIdParam" element={<MainChat />} />
                  <Route path="chat" element={<MainChat />} />

                  <Route
                    path="explore"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <Explore />
                      </Suspense>
                    }
                  />
                  <Route
                    path="calendar"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <Calendar />
                      </Suspense>
                    }
                  />
                  <Route
                    path="pins"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <Pins />
                      </Suspense>
                    }
                  />
                  <Route
                    path="notes"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <Notes />
                      </Suspense>
                    }
                  />
                  <Route
                    path="notes/add"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <NotesAdd />
                      </Suspense>
                    }
                  />
                  <Route
                    path="notes/:id"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <NotesAdd />
                      </Suspense>
                    }
                  />
                  <Route
                    path="goals"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <Goals />
                      </Suspense>
                    }
                  />
                  <Route
                    path="goals/:goalId"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <GoalPage />
                      </Suspense>
                    }
                  />

                  <Route
                    path="search"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <Search />
                      </Suspense>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                        <Navigate to="/404" />
                      </Suspense>
                    }
                  />
                </Routes>
              </div>
            </div>
          </TooltipProvider>
        </LoadingProvider>
      </ConvoProvider>
    </ConversationListProvider>
  );
}
