import { Button } from "@nextui-org/button";
import { SidebarLeftIcon } from "../icons";
import * as React from "react";

export default function CloseOpenSidebarBtn({ toggleSidebar }) {
  return (
    <Button
      isIconOnly
      variant="light"
      aria-label="Send message"
      className="p-0"
      size="sm"
      onClick={toggleSidebar}
    >
      <SidebarLeftIcon height="24" />
    </Button>
  );
}
