import {
  DiscoverCircleIcon,
  PinIcon,
  CalendarIcon,
  StickyNote01Icon,
  Route02Icon,
} from "../icons";
import { Button } from "@nextui-org/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "@nextui-org/tooltip";

export default function SidebarTopButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-[#141414] rounded-md p-2 gap-2 flex flex-wrap items-center">
      {/* <Button className="w-full flex justify-between">
        Search
        <GlobalSearchIcon />
      </Button> */}
      <Tooltip showArrow={true} content="Explore">
        <Button
          onClick={() => navigate("/try/explore")}
          className="w-fit"
          isIconOnly
          size="lg"
        >
          <DiscoverCircleIcon
            width={27}
            height={27}
            color={location.pathname === "/try/explore" ? "#00bbff" : "white"}
          />
        </Button>
      </Tooltip>
      <Tooltip showArrow={true} content="Pins">
        <Button
          className="w-fit"
          isIconOnly
          size="lg"
          onClick={() => navigate("/try/pins")}
        >
          <PinIcon
            width={27}
            height={27}
            color={location.pathname === "/try/pins" ? "#00bbff" : "white"}
          />
        </Button>
      </Tooltip>
      <Tooltip showArrow={true} content="Calendar">
        <Button
          size="lg"
          className="w-fit"
          isIconOnly
          onClick={() => navigate("/try/calendar")}
        >
          <CalendarIcon
            width={27}
            height={27}
            color={location.pathname === "/try/calendar" ? "#00bbff" : "white"}
          />
        </Button>
      </Tooltip>

      <Tooltip showArrow={true} content="Notes">
        <Button
          size="lg"
          className="w-fit"
          isIconOnly
          onClick={() => navigate("/try/notes")}
        >
          <StickyNote01Icon
            width={27}
            height={27}
            color={location.pathname === "/try/notes" ? "#00bbff" : "white"}
          />
        </Button>
      </Tooltip>

      <Tooltip showArrow={true} content="Roadmaps">
        <Button
          size="lg"
          className="w-fit"
          isIconOnly
          onClick={() => navigate("/try/notes")}
        >
          <Route02Icon
            width={27}
            height={27}
            color={location.pathname === "/try/roadmaps" ? "#00bbff" : "white"}
          />
        </Button>
      </Tooltip>

      <div>
        {/* <Button isIconOnly aria-label="Like">
          <ThreeDotsMenu />
        </Button> */}
      </div>
    </div>
  );
}
