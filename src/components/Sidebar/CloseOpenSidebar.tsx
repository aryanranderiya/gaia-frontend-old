import useMediaQuery from "@/hooks/MediaQuery";
import { Button } from "@heroui/button";
import { Menu02Icon, SidebarLeftIcon } from "../icons";

export interface CloseOpenSidebarBtnProps {
  toggleSidebar: () => void;
}

function CloseOpenSidebarBtn({ toggleSidebar }: CloseOpenSidebarBtnProps) {
  const isMobileScreen: boolean = useMediaQuery("(max-width: 600px)");

  return (
    <Button
      isIconOnly
      variant="light"
      aria-label="Send message"
      className="p-0"
      size="md"
      onClick={toggleSidebar}
    >
      {isMobileScreen ? (
        <Menu02Icon height="24" />
      ) : (
        <SidebarLeftIcon height="24" />
      )}
    </Button>
  );
}

export default CloseOpenSidebarBtn;
