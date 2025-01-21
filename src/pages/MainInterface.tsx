import CloseOpenSidebarBtn from "@/components/Sidebar/CloseOpenSidebar";
import SuspenseLoader from "@/components/SuspenseLoader";
import WebsiteName from "@/components/TopWebsiteName";
import { ConversationHistoryProvider } from "@/contexts/ConversationHistory";
import { ConversationListProvider } from "@/contexts/ConversationList";
import { ConvoProvider } from "@/contexts/CurrentConvoMessages";
import { ReactFlowProvider } from "@xyflow/react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useMediaQuery from "../hooks/MediaQuery";
import Sidebar from "../layouts/Sidebar";
import SearchPage from "./Search";
import NotesAdd from "./NotePage";

// Lazy load the components
const MainChat = lazy(() => import("./MainChat"));
const Explore = lazy(() => import("./Explore"));
const Calendar = lazy(() => import("@/components/Calendar/Calendar"));
const Pins = lazy(() => import("./Pins"));
const Notes = lazy(() => import("./Notes"));
const Goals = lazy(() => import("./Goals"));
const GoalPage = lazy(() => import("./GoalPage"));

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
        setSidebarVisible(false);
      } else {
        contentContainerRef.current.classList.add("hide");
        sidebarRef.current.classList.remove("hide");
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
    <ConversationHistoryProvider>
      <ConversationListProvider>
        <ConvoProvider>
          <div className="main_container dark">
            <Sidebar sidebarref={sidebarRef} toggleSidebar={toggleSidebar} />

            <div
              ref={contentContainerRef}
              onClick={hideSidebar}
              className="main_chat"
            >
              <div className="chat_sidebar_toggle_btn">
                <CloseOpenSidebarBtn toggleSidebar={toggleSidebar} />
              </div>
              {/* <WebsiteName /> */}

              <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
                <Routes>
                  <Route path="chat/:convoIdParam" element={<MainChat />} />
                  <Route path="chat" element={<MainChat />} />
                  <Route path="explore" element={<Explore />} />
                  <Route path="calendar" element={<Calendar />} />
                  <Route path="search" element={<SearchPage />} />
                  <Route path="pins" element={<Pins />} />
                  <Route path="notes" element={<Notes />} />
                  <Route path="notes/add" element={<NotesAdd />} />
                  <Route path="notes/:id" element={<NotesAdd />} />
                  <Route path="goals" element={<Goals />} />
                  <Route
                    path="goals/:goalId"
                    element={
                      <ReactFlowProvider>
                        <GoalPage />
                      </ReactFlowProvider>
                    }
                  />
                  <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </ConvoProvider>
      </ConversationListProvider>
    </ConversationHistoryProvider>
  );
}
