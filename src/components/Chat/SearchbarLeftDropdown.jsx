import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  AttachmentIcon,
  Image02Icon,
  BlushBrush02Icon,
  CalendarAdd01Icon,
} from "../icons";
import React from "react";
import MicrophoneBtn from "../Audio/MicrophoneBtn";
import FileUpload from "../Documents/FileUpload";

export default function SearchbarLeftDropdown({ loading }) {
  return (
    <div className="flex gap-1 mr-2 flex-row flex-nowrap">
      <Tooltip content="Attach documents" placement="left" disabled={loading}>
        <Dropdown className="bg-zinc-700">
          <DropdownTrigger>
            <Button
              disabled={loading}
              isIconOnly
              radius="full"
              aria-label="Attach files"
              className={`${loading && "cursor-wait"}`}
            >
              <AttachmentIcon />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            variant="faded"
            aria-label="Static Actions"
            classNames={{
              base: "flex flex-row w-fit",
              list: "w-fit flex-row",
              content: "w-fit min-w-[100px]",
            }}
          >
            <DropdownItem
              key="brush"
              className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
              isReadOnly
            >
              <BlushBrush02Icon color="#00bbff" />
            </DropdownItem>

            <DropdownItem
              key="pdf"
              className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
              isReadOnly
            >
              <FileUpload />
            </DropdownItem>

            <DropdownItem
              key="image"
              className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
              isReadOnly
            >
              <Image02Icon color="#00bbff" />
            </DropdownItem>

            <DropdownItem
              key="calendar"
              className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
              isReadOnly
            >
              <CalendarAdd01Icon color="#00bbff" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Tooltip>

      <MicrophoneBtn />
    </div>
  );
}
