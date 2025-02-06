import ComingSoonModal from "@/components/ComingSoon/ComingSoonModal";
// import Hr from "@/components/HorizontalRuler";
import { GlobalIcon } from "@/components/icons";
import ChatsList from "@/components/Sidebar/ChatsList";
import CloseOpenSidebarBtn from "@/components/Sidebar/CloseOpenSidebar";
import SidebarTopButtons from "@/components/Sidebar/SidebarTopButtons";
import UserContainer from "@/components/Sidebar/UserContainer";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { SquarePen } from "lucide-react";
import { LegacyRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({
  sidebarref,
  toggleSidebar,
  className = "",
  isSidebarVisible,
}: {
  sidebarref: LegacyRef<HTMLDivElement>;
  toggleSidebar: () => void;
  className?: string;
  isSidebarVisible: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetMessages } = useConvo();
  const [open, setOpen] = useState<boolean>(false);

  const createNewChat = (): void => {
    navigate(`/try/chat/`);
    resetMessages();
  };

  return (
    <>
      <div
        className={`sidebar flex ${className} ${
          isSidebarVisible
            ? "min-w-[280px] max-w-[280px]"
            : "min-w-0 max-w-0 w-0"
        } transition-all duration-200`}
        ref={sidebarref}
      >
        <div className="overflow-y-auto min-w-[280px]">
          <div className="p-4 pb-0 ">
            <div className="flex items-center justify-between mb-1">
              <Tooltip
                content="general artificial intelligence assistant"
                placement="bottom"
                offset={+0}
              >
                <div className="flex gap-2 items-center p-2">
                  <GlobalIcon color="white" width="22" />
                  <span>gaia</span>
                </div>
              </Tooltip>

              {/* */}
              <div className="flex items-center gap-1">
                <Button onPress={createNewChat} isIconOnly variant="light">
                  <SquarePen
                    width="23"
                    color={
                      location.pathname == "/try/chat" ? "#00bbff" : "#9b9b9b"
                    }
                  />
                </Button>

                <CloseOpenSidebarBtn toggleSidebar={toggleSidebar} />
              </div>
            </div>
            {/* 
            <div className="px-1">
              <Button
                variant="shadow"
                color="primary"
                className="w-full flex justify-between my-4 font-medium text-zinc-900"
                onPress={() => setOpen(true)}
              >
                Coming Soon!
                <StarsIcon color="zinc-900" fill="zinc-900" />
              </Button>
            </div> */}

            <SidebarTopButtons />
            {/* <Hr /> */}
          </div>

          <ChatsList />
        </div>
        <UserContainer />
      </div>

      <ComingSoonModal isOpen={open} setOpen={setOpen} />
    </>
  );
}
