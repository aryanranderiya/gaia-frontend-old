import {
  DiscoverCircleIcon,
  PinIcon,
  CalendarIcon,
  GlobalSearchIcon,
} from "../icons";
import { Button } from "@nextui-org/button";

export default function SidebarTopButtons() {
  return (
    <div className="sidebar_inner">
      <Button className="w-full flex justify-between">
        Search
        <GlobalSearchIcon />
      </Button>

      <Button className="w-full flex justify-between">
        Explore
        <DiscoverCircleIcon />
      </Button>

      <Button className="w-full flex justify-between">
        Your Pins
        <PinIcon />
      </Button>

      <Button className="w-full flex justify-between">
        Your Calendar
        <CalendarIcon />
      </Button>

      <div>
        {/* <Button isIconOnly aria-label="Like">
          <ThreeDotsMenu />
        </Button> */}
      </div>
    </div>
  );
}
