import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { GlobalIcon, SidebarLeftIcon } from "../components/icons";

export default function SiteName() {
  return (
    <div className="flex items-center justify-between">
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

      <Button
        isIconOnly
        variant="light"
        aria-label="Send message"
        className="p-0"
        size="sm"
      >
        <SidebarLeftIcon height="24" />
      </Button>
    </div>
  );
}
