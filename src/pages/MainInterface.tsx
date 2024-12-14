import Calendar from "@/components/Calendar/Calendar";
import { ComprehensiveMessageHistory } from "@/components/comprehensive-message-history";
import CloseOpenSidebarBtn from "@/components/Sidebar/CloseOpenSidebar";
import WebsiteName from "@/components/TopWebsiteName";
import { ConversationHistoryProvider } from "@/contexts/ConversationHistory";
import { ConvoProvider } from "@/contexts/CurrentConvoMessages";
import { useEffect, useRef, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useMediaQuery from "../hooks/MediaQuery";
import Sidebar from "../layouts/Sidebar";
import Explore from "./Explore";
import GoalPage from "./GoalPage";
import Goals from "./Goals";
import MainChat from "./MainChat";
import Notes from "./Notes";
import Pins from "./Pins";
import { ReactFlowProvider } from "@xyflow/react";

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
            <WebsiteName />

            <Routes>
              <Route path="chat/:convoIdParam" element={<MainChat />} />
              <Route path="chat" element={<MainChat />} />
              <Route path="explore" element={<Explore />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="search" element={<ComprehensiveMessageHistory />} />
              <Route path="pins" element={<Pins />} />
              <Route path="notes" element={<Notes />} />
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
          </div>
        </div>
      </ConvoProvider>
    </ConversationHistoryProvider>
  );
}
