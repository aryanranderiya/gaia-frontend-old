import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  CalendarIcon,
  PinIcon,
  Route02Icon,
  StickyNote01Icon
} from "../Misc/icons";
import SearchCommand from "../Search/SearchCommand";

export default function SidebarTopButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  const buttonData = [
    {
      icon: <SearchIcon height={26} width={26} />,
      label: "Search",
    },

    {
      route: "/calendar",
      icon: <CalendarIcon height={27} width={27} />,
      label: "Calendar",
    },
    {
      route: "/goals",
      icon: <Route02Icon height={27} width={27} />,
      label: "Goals",
    },
    // {
    //   route: "/mail",
    //   icon: <Mail01Icon height={27} width={27} />,
    //   label: "Mail",
    // },
    {
      route: "/notes",
      icon: <StickyNote01Icon height={27} width={27} />,
      label: "Notes",
    },
    // {
    //   route: "/explore",
    //   icon: <DiscoverCircleIcon height={27} width={27} />,
    //   label: "Explore",
    // },
    {
      route: "/pins",
      icon: <PinIcon height={27} width={27} />,
      label: "Pins",
    },
  ];

  return (
    <>
      <SearchCommand
        openSearchDialog={openSearchDialog}
        setOpenSearchDialog={setOpenSearchDialog}
      />

      <div className="bg-[#141414] rounded-2xl p-2 gap-1 grid grid-cols-3 items-start grid-rows-2">
        {buttonData.map(({ route, icon, label }, index) => (
          <Tooltip key={index} content={label} showArrow={true}>
            <Button
              className="w-full"
              isIconOnly
              // size="lg"
              // variant="flat"
              color={location.pathname === route ? "primary" : "default"}
              variant={location.pathname === route ? "solid" : "flat"}
              onPress={() =>
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
