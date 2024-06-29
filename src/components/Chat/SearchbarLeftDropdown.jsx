import React from "react";
import MicrophoneBtn from "../Audio/MicrophoneBtn";
import FileUpload from "../Documents/FileUpload";
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
  Pdf02Icon,
  BlushBrush02Icon,
  CalendarAdd01Icon,
} from "../icons";

export default function SearchbarLeftDropdown({
  loading,
  setConversationHistory,
}) {
  const dropdownRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  const chooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex gap-1 mr-2 flex-row flex-nowrap">
      <Dropdown
        className="dark rounded-full"
        placement="top"
        offset={0}
        closeOnSelect={true}
        showArrow
        classNames={{
          base: "dark",
        }}
        backdrop="opaque"
        isDismissable={true}
        ref={dropdownRef}
        shouldCloseOnInteractOutside={true}
      >
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
          >
            <BlushBrush02Icon color="#00bbff" />
          </DropdownItem>

          <DropdownItem
            key="pdf"
            className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
            isReadOnly
          >
            <Image02Icon color="#00bbff" onClick={chooseFile} />
          </DropdownItem>

          <DropdownItem
            key="image"
            className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
          >
            <Pdf02Icon color="#00bbff" onClick={chooseFile} />
          </DropdownItem>

          <DropdownItem
            key="calendar"
            className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
          >
            <CalendarAdd01Icon color="#00bbff" />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <MicrophoneBtn />
      <FileUpload
        fileInputRef={fileInputRef}
        setConversationHistory={setConversationHistory}
      />
    </div>
  );
}
