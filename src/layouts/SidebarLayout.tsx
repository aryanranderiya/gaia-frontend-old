import { LegacyRef, ReactNode } from "react";

// import Hr from "@/components/HorizontalRuler";
import { PencilSquareIcon } from "@/components/Misc/icons";
import CloseOpenSidebarBtn from "@/components/Sidebar/CloseOpenSidebar";
import SidebarTopButtons from "@/components/Sidebar/SidebarTopButtons";
import UserContainer from "@/components/Sidebar/UserContainer";
import { Button } from "@/components/ui/button";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import useMediaQuery from "@/hooks/mediaQuery";
import { useNavigate } from "react-router-dom";

export default function SidebarLayout({
  children,
  sidebarref,
  toggleSidebar,
  className = "",
  isSidebarVisible,
}: {
  children: ReactNode;
  sidebarref: LegacyRef<HTMLDivElement>;
  toggleSidebar: () => void;
  className?: string;
  isSidebarVisible: boolean;
}) {
  const isMobileScreen: boolean = useMediaQuery("(max-width: 600px)");
  const { resetMessages } = useConvo();
  const navigate = useNavigate();

  return (
    <div
      ref={sidebarref}
      className={`sidebar flex ${className} ${
        isSidebarVisible
          ? "sm:min-w-[250px] sm:max-w-[250px] sm:translate-x-0 translate-x-[-350px]"
          : "sm:min-w-0 sm:max-w-0 sm:w-0 translate-x-0"
      } transition-all duration-100`}
    >
      <div className="overflow-y-auto min-w-[250px]">
        <div className="p-4 pb-0 ">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-2xl">gaia</span>

            <div className="flex items-center gap-1">
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
              <CloseOpenSidebarBtn toggleSidebar={toggleSidebar} />
            </div>
          </div>

          <SidebarTopButtons />
        </div>

        <div className="pt-0 p-4 flex flex-col gap-1 max-h-[80vh] relative">
          {children}
        </div>
      </div>
      <UserContainer />
    </div>
  );
}
