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
      route: "/try/memories",
      icon: <StickyNote01Icon width={27} height={27} />,
      label: "Memories",
    },
    {
      route: "/try/goals",
      icon: <Route02Icon width={27} height={27} />,
      label: "Goals",
    },
  ];

  return (
    <div className="bg-[#141414] rounded-2xl p-2 gap-2 flex flex-wrap items-center">
      {buttonData.map(({ route, icon, label }) => (
        <Tooltip key={route} showArrow={true} content={label}>
          <Button
            className="w-fit"
            isIconOnly
            size="lg"
            color={location.pathname === route ? "primary" : "default"}
            onClick={() => navigate(route)}
          >
            {React.cloneElement(icon, {
              color: "white",
            })}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}
