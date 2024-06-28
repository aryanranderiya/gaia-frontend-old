import * as React from "react";
import { Route, Routes } from "react-router-dom";
import useMediaQuery from "./hooks/MediaQuery";
import CloseOpenSidebarBtn from "./components/Sidebar/CloseOpenSidebar";
import WebsiteName from "./components/TopWebsiteName";
import Sidebar from "./layouts/Sidebar";
import MainChat from "./pages/MainChat";
import Explore from "./pages/Explore";

function App() {
  const sidebarRef = React.useRef(null);
  const contentContainerRef = React.useRef(null);
  const [isSidebarVisible, setSidebarVisible] = React.useState(true);
  const isMobileScreen = useMediaQuery("(max-width: 600px)");

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
            path="/"
            element={<MainChat toggleSidebar={toggleSidebar} />}
          />

          <Route path="/explore/*" element={<Explore />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
