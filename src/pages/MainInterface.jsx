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
import { apiauth } from "../apiaxios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/Shadcn/Dialog";
import { Button } from "@nextui-org/button";

export default function MainInterface() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = React.useRef(null);
  const contentContainerRef = React.useRef(null);
  const [isSidebarVisible, setSidebarVisible] = React.useState(true);
  const [open, setOpen] = React.useState(false);
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

    apiauth
      .post("http://127.0.0.1:8000/refreshToken")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        const status = error?.response?.status;
        if (status === 401 || status > 400) setOpen(true);
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(e) => {
          if (!e) navigate("/login");
        }}
        className="rounded-full"
      >
        <DialogContent className="bg-zinc-900 text-white border-none flex flex-col gap-3 md:rounded-2xl rounded-2xl max-w-[350px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl  select-text">
              Log in
            </DialogTitle>
            <DialogDescription className="text-center select-text text-sm">
              You have been Signed out.
              <br />
              Please login again to use GAIA!
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center mt-2 gap-2">
            <Button
              size="md"
              variant="flat"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              size="md"
              variant="flat"
              color="primary"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
    </>
  );
}
