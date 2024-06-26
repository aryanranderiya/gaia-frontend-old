import { Button, ButtonGroup } from "@nextui-org/button";
import {
  DiscoverCircleIcon,
  PinIcon,
  CalendarIcon,
  SearchIcon,
} from "../components/icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Button variant="flat" className="w-full flex justify-between">
        Coming Soon
        <SearchIcon />
      </Button>

      <div className="sidebar_inner">
        <Button variant="flat" className="w-full flex justify-between">
          Search
          <SearchIcon />
        </Button>

        <Button variant="flat" className="w-full flex justify-between">
          Explore
          <DiscoverCircleIcon />
        </Button>

        <Button variant="flat" className="w-full flex justify-between">
          Your Pins
          <PinIcon />
        </Button>

        <Button variant="flat" className="w-full flex justify-between">
          Your Calendar
          <CalendarIcon />
        </Button>
      </div>
    </div>
  );
}
