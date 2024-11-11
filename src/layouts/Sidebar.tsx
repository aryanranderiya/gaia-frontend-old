import ComingSoonModal from "@/components/ComingSoon/ComingSoonModal";
import Hr from "@/components/HorizontalRuler";
import { GlobalIcon } from "@/components/icons";
import ChatsList from "@/components/Sidebar/ChatsList";
import CloseOpenSidebarBtn from "@/components/Sidebar/CloseOpenSidebar";
import UserContainer from "@/components/Sidebar/UserContainer";
import { Tooltip } from "@nextui-org/tooltip";
import { LegacyRef, useState } from "react";

export default function Sidebar({
  sidebarref,
  toggleSidebar,
}: {
  sidebarref: LegacyRef<HTMLDivElement>;
  toggleSidebar: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

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

          {/* <div className="px-1">
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

          {/* <SidebarTopButtons /> */}
          <Hr />
          <ChatsList />
        </div>
        <UserContainer />
      </div>

      <ComingSoonModal isOpen={open} setOpen={setOpen} />
    </>
  );
}
