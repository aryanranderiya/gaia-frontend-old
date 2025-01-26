import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  DiscoverCircleIcon,
  Route02Icon,
  StickyNote01Icon,
  // PinIcon,
} from "../icons";
// import { SearchIcon } from "lucide-react";

export default function SidebarTopButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const buttonData = [
    {
      route: "/try/explore",
      icon: <DiscoverCircleIcon width={27} height={27} />,
      label: "Explore",
    },
    // {
    //   route: "/try/search",
    //   icon: <SearchIcon width={27} height={27} />,
    //   label: "Search",
    // },
    // {
    //   route: "/try/pins",
    //   icon: <PinIcon width={27} height={27} />,
    //   label: "Pins",
    // },
    {
      route: "/try/calendar",
      icon: <CalendarIcon width={27} height={27} />,
      label: "Calendar",
    },
    {
      route: "/try/notes",
      icon: <StickyNote01Icon width={27} height={27} />,
      label: "Notes",
    },
    {
      route: "/try/goals",
      icon: <Route02Icon width={27} height={27} />,
      label: "Goals",
    },
  ];

  return (
    <div className="bg-[#141414] rounded-2xl p-2 gap-1 flex flex-wrap items-center justify-between">
      {buttonData.map(({ route, icon, label }) => (
        <Tooltip key={route} showArrow={true} content={label}>
          <Button
            className="w-fit"
            isIconOnly
            size="lg"
            // variant="flat"
            variant={location.pathname === route ? "solid" : "flat"}
            color={location.pathname === route ? "primary" : "default"}
            onClick={() => navigate(route)}
          >
            {React.cloneElement(icon, {
              color: location.pathname === route ? "#000000AA" : "#FFFFFFAA",
            })}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
