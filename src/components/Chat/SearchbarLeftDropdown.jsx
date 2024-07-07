import React from "react";
import FileUpload from "../Documents/FileUpload";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  AttachmentIcon,
  ImageAdd02Icon,
  DocumentAttachmentIcon,
  BlushBrush02Icon,
  Calendar01Icon,
} from "../icons";
import GenerateImage from "./GenerateImage";

export default function SearchbarLeftDropdown({
  loading,
  setConversationHistory,
}) {
  const dropdownRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const [openImageDialog, setOpenImageDialog] = React.useState(false);

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
          <div
            className={`${loading ? "cursor-wait" : "cursor-pointer"} z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium bg-transparent text-small gap-2 rounded-full px-0 transition-transform-colors-opacity motion-reduce:transition-none border-default text-default-foreground hover:!bg-default min-w-10 w-10 h-10`}
          >
            <AttachmentIcon />
          </div>
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
            key="pdf"
            className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
          >
            <DocumentAttachmentIcon
              color="#00bbff"
              onClick={chooseFile}
              children
            />
          </DropdownItem>

          <DropdownItem
            key="image"
            className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
            onPress={() => setOpenImageDialog(true)}
          >
            <ImageAdd02Icon color="#00bbff" />
          </DropdownItem>

          <DropdownItem
            key="calendar"
            className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
          >
            <Calendar01Icon color="#00bbff" />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <FileUpload
        fileInputRef={fileInputRef}
        setConversationHistory={setConversationHistory}
      />

      <GenerateImage
        setOpenImageDialog={setOpenImageDialog}
        openImageDialog={openImageDialog}
        setConversationHistory={setConversationHistory}
      />
    </div>
  );
}
