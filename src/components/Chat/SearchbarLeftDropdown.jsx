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
  ImageUploadIcon,
  FileUploadIcon,
  PlusSignIcon,
  AiImageIcon,
  Calendar01Icon,
} from "../icons";
import GenerateImage from "./GenerateImage";
import ImageUpload from "../Documents/ImageUpload";

export default function SearchbarLeftDropdown({
  loading,
  setConversationHistory,
  conversationHistory,
}) {
  const fileInputRef = React.useRef(null);
  const imageInputRef = React.useRef(null);
  const [openImageDialog, setOpenImageDialog] = React.useState(false);

  const chooseFile = () => {
    fileInputRef.current.click();
  };

  const chooseImage = () => {
    imageInputRef.current.click();
  };

  return (
    <>
      <Dropdown
        className={`dark text-foreground w-full ${loading ? "cursor-wait" : "cursor-pointer"}`}
        placement="top"
        offset={0}
        closeOnSelect={true}
        showArrow
        classNames={{
          base: "dark",
        }}
        backdrop="opaque"
        isDismissable={true}
        isDisabled={loading}
        shouldCloseOnInteractOutside={true}
      >
        <DropdownTrigger>
          <div
            className={`${loading ? "cursor-wait" : "cursor-pointer"} z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium bg-transparent text-small gap-2 rounded-full px-0 transition-transform-colors-opacity motion-reduce:transition-none border-default text-default-foreground hover:!bg-default min-w-10 w-10 h-10 mr-2`}
          >
            <PlusSignIcon />
          </div>
        </DropdownTrigger>

        <DropdownMenu
          variant="faded"
          aria-label="Static Actions"
          itemClasses={{
            content: "w-full",
          }}
        >
          <DropdownItem
            key="image"
            className="w-full transition-all"
            onPress={chooseImage}
          >
            <div className="flex justify-between items-center">
              Upload Image
              <ImageUploadIcon color="#00bbff" />
            </div>
          </DropdownItem>

          <DropdownItem
            key="pdf"
            className="w-full darktransition-all"
            onPress={chooseFile}
          >
            <div className="flex justify-between items-center">
              Upload Document
              <FileUploadIcon color="#00bbff" />
            </div>
          </DropdownItem>

          <DropdownItem
            key="generate_image"
            className="w-full transition-all"
            onPress={() => setOpenImageDialog(true)}
          >
            <div className="flex justify-between items-center">
              Generate Image
              <AiImageIcon color="#00bbff" />
            </div>
          </DropdownItem>

          {/* <DropdownItem
            key="calendar"
            className="w-fit rounded-full dark hover:bg-zinc-800 transition-all"
          >
            <Calendar01Icon color="#00bbff" />
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>

      <ImageUpload
        imageInputRef={imageInputRef}
        setConversationHistory={setConversationHistory}
        conversationHistory={conversationHistory}
      />

      <FileUpload
        fileInputRef={fileInputRef}
        setConversationHistory={setConversationHistory}
        conversationHistory={conversationHistory}
      />

      <GenerateImage
        setOpenImageDialog={setOpenImageDialog}
        openImageDialog={openImageDialog}
        setConversationHistory={setConversationHistory}
      />
    </>
  );
}
