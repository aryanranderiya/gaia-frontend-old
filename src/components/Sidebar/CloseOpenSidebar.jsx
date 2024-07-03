import { Button } from "@nextui-org/button";
import { SidebarLeftIcon, Menu02Icon } from "../icons";
import * as React from "react";
import useMediaQuery from "../../hooks/MediaQuery";

export default function CloseOpenSidebarBtn({ toggleSidebar }) {
  const isMobileScreen = useMediaQuery("(max-width: 600px)");

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
