import { Tooltip } from "@nextui-org/tooltip";
import { GlobalIcon } from "../components/icons";

export default function SiteName() {
  return (
    <Tooltip
      content="general artificial intelligence assistant"
      placement="right"
      offset={-120}
    >
      <div className="flex gap-2 items-center w-full p-2">
        <GlobalIcon color="white" width="19" />
        <span>gaia</span>
      </div>
    </Tooltip>
  );
}
