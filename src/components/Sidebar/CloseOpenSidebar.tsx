import { Menu02Icon, SidebarLeftIcon } from "../Misc/icons";

import useMediaQuery from "@/hooks/mediaQuery";
import { Button } from "../ui/button";

export interface CloseOpenSidebarBtnProps {
  isSidebarVisible?: boolean;
  toggleSidebar: () => void;
}

function CloseOpenSidebarBtn({
  toggleSidebar,
  isSidebarVisible = false,
}: CloseOpenSidebarBtnProps) {
  const isMobileScreen: boolean = useMediaQuery("(max-width: 600px)");

  return (
    <Button
      aria-label="Open Menu"
      className={`rounded-lg group hover:bg-primary ${
        isSidebarVisible ? "sm:opacity-0" : "sm:opacity-100"
      }`}
      size="icon"
      variant={isMobileScreen ? "default" : "ghost"}
      onClick={toggleSidebar}
    >
      {isMobileScreen ? (
        <Menu02Icon
          height="24"
          className="group-hover:text-white transition-all"
        />
      ) : (
        <SidebarLeftIcon
          height="24"
          className="group-hover:text-white transition-all"
        />
      )}
    </Button>
  );
}

export default CloseOpenSidebarBtn;
