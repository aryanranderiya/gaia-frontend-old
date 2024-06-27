import { Route, Routes } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import MainChat from "./layouts/MainChat";
import * as React from "react";
import useMediaQuery from "./hooks/MediaQuery";

function App() {
  const sidebarRef = React.useRef(null);
  const mainChatRef = React.useRef(null);
  const [isSidebarVisible, setSidebarVisible] = React.useState(true);
  const isMobileScreen = useMediaQuery("(max-width: 600px)");

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      if (isSidebarVisible) {
        sidebarRef.current.classList.add("hide");
        mainChatRef.current.classList.remove("hide");
        setSidebarVisible(false);
      } else {
        mainChatRef.current.classList.add("hide");
        sidebarRef.current.classList.remove("hide");
        setSidebarVisible(true);
      }
    }
  };

  const hideSidebar = () => {
    if (sidebarRef.current) {
      if (isSidebarVisible && isMobileScreen) {
        sidebarRef.current.classList.add("hide");
        mainChatRef.current.classList.remove("hide");
        setSidebarVisible(false);
      }
    }
  };

  React.useEffect(() => {
    if (isMobileScreen && isSidebarVisible) toggleSidebar();
  }, []);

  return (
    <div className="sidebar_chat_container">
      <Sidebar sidebarref={sidebarRef} toggleSidebar={toggleSidebar} />
      <MainChat
        toggleSidebar={toggleSidebar}
        hideSidebar={hideSidebar}
        mainChatRef={mainChatRef}
      />
    </div>
  );
}

export default App;
