import { Button } from "@nextui-org/button";
import { SidebarLeftIcon, Menu02Icon } from "../icons";
import useMediaQuery from "@/hooks/MediaQuery";
import { FC } from "react";

interface CloseOpenSidebarBtnProps {
  toggleSidebar: () => void;
}

const CloseOpenSidebarBtn: FC<CloseOpenSidebarBtnProps> = ({
  toggleSidebar,
}) => {
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
};

export default CloseOpenSidebarBtn;
