import { Suspense, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import {
  BubbleConversationChatIcon,
  PencilSquareIcon,
} from "@/components/Misc/icons";
import NotLoggedIn from "@/components/Misc/NotLoggedInDialog";
import SuspenseLoader from "@/components/Misc/SuspenseLoader";
import ChatOptionsDropdown from "@/components/Sidebar/ChatOptionsDropdown";
import CloseOpenSidebarBtn from "@/components/Sidebar/CloseOpenSidebar";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useConversationList } from "@/contexts/ConversationList";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { LoadingProvider } from "@/contexts/LoadingContext";
import useMediaQuery from "@/hooks/mediaQuery";
import Sidebar from "@/components/Sidebar/Sidebar";
import SidebarLayout from "@/layouts/SidebarLayout";
import EmailSidebar from "@/components/Sidebar/MailSidebar";

export default function MainInterface() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const { conversations } = useConversationList();
  const { convoIdParam } = useParams();
  const isMobileScreen: boolean = useMediaQuery("(max-width: 600px)");
  const { resetMessages } = useConvo();

  function toggleSidebar(): void {
    if (sidebarRef.current && contentContainerRef.current)
      setSidebarVisible((prev) => !prev);
  }

  return (
    <LoadingProvider>
      <TooltipProvider>
        <div className="main_container dark">
          <Suspense fallback={<SuspenseLoader />}>
            <NotLoggedIn />
          </Suspense>
          {/* Sidebar Layout */}
          <Suspense fallback={<SuspenseLoader />}>
            <SidebarLayout
              isSidebarVisible={isSidebarVisible}
              sidebarref={sidebarRef}
              toggleSidebar={toggleSidebar}
            >
              {location.pathname == "/mail" ? <EmailSidebar /> : <Sidebar />}
            </SidebarLayout>
          </Suspense>

          <div
            ref={contentContainerRef}
            className="main_chat sm:p-[1rem] p-2 transition-all"
          >
            <div
              className={`sm:left-4 sm:px-0 pb-3 top-0 rounded-xl transition-opacity flex w-full justify-between z-10`}
            >
              <CloseOpenSidebarBtn
                isSidebarVisible={isSidebarVisible}
                toggleSidebar={toggleSidebar}
              />

              <div>
                {convoIdParam ? (
                  <ChatOptionsDropdown
                    btnChildren={
                      <div className="!text-sm max-w-[250px] truncate flex items-center gap-2">
                        <BubbleConversationChatIcon height={18} width={18} />

                        {conversations.find(
                          (convo) => convo.conversation_id == convoIdParam
                        )?.description || "New Chat"}
                      </div>
                    }
                    buttonHovered={true}
                    chatId={convoIdParam}
                    chatName={
                      conversations.find(
                        (convo) => convo.conversation_id == convoIdParam
                      )?.description || "New Chat"
                    }
                    logo2={true}
                    starred={
                      conversations.find(
                        (convo) => convo.conversation_id == convoIdParam
                      )?.starred || false
                    }
                  />
                ) : (
                  <></>
                )}
              </div>

              <Button
                aria-label="Create new chat"
                className={`rounded-lg hover:bg-[#00bbff] group`}
                size="icon"
                variant={isMobileScreen ? "default" : "ghost"}
                onClick={() => {
                  navigate("/c");
                  resetMessages();
                }}
              >
                <PencilSquareIcon className="group-hover:text-white transition-all" />
              </Button>
            </div>

            {/* This Outlet will render the nested routes (MainRoutes) */}
            <Outlet />
          </div>
        </div>
      </TooltipProvider>
    </LoadingProvider>
  );
}
