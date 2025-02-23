import React, { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import NotLoggedIn from "@/components/Misc/NotLoggedInDialog";
import SuspenseLoader from "@/components/Misc/SuspenseLoader";
import CloseOpenSidebarBtn from "@/components/Sidebar/CloseOpenSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import {
  BubbleConversationChatIcon,
  PencilSquareIcon,
} from "@/components/Misc/icons";
import { Button } from "@/components/ui/button";
import { useConversationList } from "@/contexts/ConversationList";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { LoadingProvider } from "@/contexts/LoadingContext";
import useMediaQuery from "@/hooks/mediaQuery";
import Sidebar from "@/layouts/Sidebar";
import ChatOptionsDropdown from "@/components/Sidebar/ChatOptionsDropdown";

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

  useEffect(() => {
    if (location.pathname === "/try/") navigate("/try/chat");
  }, [location, navigate]);

  function toggleSidebar(): void {
    if (sidebarRef.current && contentContainerRef.current) {
      setSidebarVisible((prev) => !prev);
    }
  }

  return (
    <LoadingProvider>
      <TooltipProvider>
        <div className="main_container dark">
          <Suspense fallback={<SuspenseLoader />}>
            <NotLoggedIn />
          </Suspense>
          <Suspense fallback={<SuspenseLoader />}>
            {/* Sidebar layout */}
            <Sidebar
              isSidebarVisible={isSidebarVisible}
              sidebarref={sidebarRef}
              toggleSidebar={toggleSidebar}
            />
          </Suspense>
          <div ref={contentContainerRef} className="main_chat transition-all">
            <div
              className={`sm:left-4 sm:px-0 pb-3 top-0 rounded-xl transition-opacity flex w-full justify-between z-10`}
            >
              <CloseOpenSidebarBtn
                toggleSidebar={toggleSidebar}
                isSidebarVisible={isSidebarVisible}
              />

              <div>
                {convoIdParam ? (
                  <ChatOptionsDropdown
                    logo2={true}
                    buttonHovered={true}
                    chatId={convoIdParam}
                    btnChildren={
                      <div className="!text-sm max-w-[250px] truncate flex items-center gap-2">
                        <BubbleConversationChatIcon width={18} height={18} />

                        {conversations.find(
                          (convo) => convo.conversation_id == convoIdParam
                        )?.description || "New Chat"}
                      </div>
                    }
                    chatName={
                      conversations.find(
                        (convo) => convo.conversation_id == convoIdParam
                      )?.description || "New Chat"
                    }
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
                  navigate("/try/chat");
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
