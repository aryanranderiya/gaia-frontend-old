import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  DiscoverCircleIcon,
  NotificationIcon,
  PinIcon,
  Route02Icon,
  StickyNote01Icon,
} from "../icons";
import SearchCommand from "../Search/SearchCommand";

export default function SidebarTopButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  const buttonData = [
    {
      route: "/try/explore",
      icon: <DiscoverCircleIcon width={27} height={27} />,
      label: "Explore",
    },
    {
      // route: "/try/search",
      icon: <SearchIcon width={26} height={26} />,
      label: "Search",
    },
    {
      route: "/try/explore",
      icon: <NotificationIcon width={27} height={27} />,
      label: "Notifications",
    },
    {
      route: "/try/pins",
      icon: <PinIcon width={27} height={27} />,
      label: "Pins",
    },
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
    <>
      <SearchCommand
        setOpenSearchDialog={setOpenSearchDialog}
        openSearchDialog={openSearchDialog}
      />

      <div className="bg-[#141414] rounded-2xl p-2 gap-1 grid grid-cols-4 items-start grid-rows-2">
        {buttonData.map(({ route, icon, label }) => (
          <Tooltip key={route} showArrow={true} content={label}>
            <Button
              className="w-full"
              isIconOnly
              size="lg"
              radius="lg"
              // variant="flat"
              variant={location.pathname === route ? "solid" : "flat"}
              color={location.pathname === route ? "primary" : "default"}
              onClick={() =>
                label == "Search"
                  ? setOpenSearchDialog(true)
                  : route
                  ? navigate(route)
                  : undefined
              }
            >
              {React.cloneElement(icon, {
                color: location.pathname === route ? "#000000AA" : "#FFFFFFAA",
              })}
            </Button>
          </Tooltip>
        ))}
      </div>
    </>
  );
}
