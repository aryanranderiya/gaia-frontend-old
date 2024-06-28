import {
  DiscoverCircleIcon,
  PinIcon,
  CalendarIcon,
  GlobalSearchIcon,
} from "../icons";
import { Button } from "@nextui-org/button";
import { Link, useNavigate } from "react-router-dom";

export default function SidebarTopButtons() {
  const navigate = useNavigate();

  return (
    <div className="sidebar_inner">
      {/* <Button className="w-full flex justify-between">
        Search
        <GlobalSearchIcon />
      </Button> */}

      <Button
        className="w-full flex justify-between"
        onClick={() => navigate("/explore")}
      >
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
