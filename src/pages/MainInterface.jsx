import * as React from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import useMediaQuery from "../hooks/MediaQuery";
import CloseOpenSidebarBtn from "../components/Sidebar/CloseOpenSidebar";
import WebsiteName from "../components/TopWebsiteName";
import Sidebar from "../layouts/Sidebar";
import MainChat from "./MainChat";
import Explore from "./Explore";

export default function MainInterface() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = React.useRef(null);
  const contentContainerRef = React.useRef(null);
  const [isSidebarVisible, setSidebarVisible] = React.useState(true);
  const isMobileScreen = useMediaQuery("(max-width: 600px)");

  React.useEffect(() => {
    if (location.pathname === "/try/") navigate("/try/chat");
  }, [location]);

  const toggleSidebar = () => {
    if (sidebarRef.current) {
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
  };

  const hideSidebar = () => {
    if (sidebarRef.current) {
      if (isSidebarVisible && isMobileScreen) {
        sidebarRef.current.classList.add("hide");
        contentContainerRef.current.classList.remove("hide");
        setSidebarVisible(false);
      }
    }
  };

  React.useEffect(() => {
    if (isMobileScreen && isSidebarVisible) toggleSidebar();
  }, []);

  return (
    <div className="main_container">
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
          <Route
            path="chat"
            element={<MainChat toggleSidebar={toggleSidebar} />}
          />

          <Route path="explore" element={<Explore />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </div>
  );
}
