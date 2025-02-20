import { Button } from "@heroui/button";

import { Menu02Icon, SidebarLeftIcon } from "../icons";

import useMediaQuery from "@/hooks/MediaQuery";

export interface CloseOpenSidebarBtnProps {
  toggleSidebar: () => void;
}

function CloseOpenSidebarBtn({ toggleSidebar }: CloseOpenSidebarBtnProps) {
  const isMobileScreen: boolean = useMediaQuery("(max-width: 600px)");

  return (
    <Button
      isIconOnly
      aria-label="Send message"
      className="p-0"
      size="md"
      variant="light"
      onPress={toggleSidebar}
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
