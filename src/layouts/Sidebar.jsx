import * as React from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { StarsIcon, GlobalIcon } from "../components/icons";
import Hr from "../components/HorizontalRuler";
import ChatsList from "../components/Sidebar/ChatsList";
import UserContainer from "../components/Sidebar/UserContainer";
import SidebarTopButtons from "../components/Sidebar/SidebarTopButtons";
import CloseOpenSidebarBtn from "../components/Sidebar/CloseOpenSidebar";

export default function Sidebar({ sidebarref, toggleSidebar }) {
  return (
    <>
      <div className="sidebar" ref={sidebarref}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <CloseOpenSidebarBtn toggleSidebar={toggleSidebar} />

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
          </div>

          <div className="px-1">
            <Button
              variant="shadow"
              color="primary"
              className="w-full flex justify-between my-4"
            >
              Coming Soon?
              <StarsIcon />
            </Button>
          </div>

          <SidebarTopButtons />
          <Hr />
          <ChatsList />
        </div>
        <UserContainer />
      </div>
    </>
  );
}
