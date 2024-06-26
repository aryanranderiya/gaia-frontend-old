import {
  DiscoverCircleIcon,
  PinIcon,
  CalendarIcon,
  StarsIcon,
  ThreeDotsMenu,
} from "../icons";
import { Button } from "@nextui-org/button";

export default function SidebarTopButtons() {
  return (
    <div className="sidebar_inner">
      <Button
        variant="shadow"
        color="primary"
        className="w-full flex justify-between"
      >
        Coming Soon
        <StarsIcon />
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
        <Button isIconOnly aria-label="Like">
          <ThreeDotsMenu />
        </Button>
      </div>
    </div>
  );
}
