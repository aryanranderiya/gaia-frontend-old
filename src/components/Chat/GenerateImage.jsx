import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ImageAdd02Icon } from "../icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Textarea } from "@nextui-org/input";
import * as React from "react";

export default function GenerateImage({ openImageDialog, setOpenImageDialog }) {
  const [textContent, setTextContent] = React.useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      // setSearchbarText((text) => text + "\n");
      // } else if (event.key === "Enter") handleFormSubmit(event);
    }
  };
  return (
    // <Dialog onOpenChange={setOpenImageDialog} open={openImageDialog}>
    //   <DialogContent className="sm:max-w-[425px]">
    //     <DialogHeader>
    //       <DialogTitle>Edit profile</DialogTitle>
    //       <DialogDescription>
    //         Make changes to your profile here. Click save when you're done.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <div className="grid gap-4 py-4"></div>
    //     <DialogFooter>
    //       <Button type="submit">Save changes</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>

    <Modal
      isOpen={openImageDialog}
      onOpenChange={setOpenImageDialog}
      backdrop="opaque"
      classNames={{ base: "w-fit p-4 dark text-white" }}
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center">
          Generate Images
        </ModalHeader>
        <ModalBody className="flex justify-center items-center lottie_container">
          <Textarea
            label="What do you want to do with this file?"
            placeholder="e.g - Summarise this pdf"
            startContent={<NoteDoneIcon />}
            maxRows={3}
            minRows={1}
            isRequired
            variant="shadow"
            color="primary"
            value={textContent}
            onValueChange={(e) => setTextContent(e)}
            errorMessage="This is a required input field."
            isInvalid={textContent.trim() === ""}
            spellCheck={false}
            onKeyDown={handleKeyDown}
          />
        </ModalBody>
        <ModalFooter className="flex w-full justify-center">
          {/* <Button
                color="danger"
                onPress={onClose}
                isIconOnly
                variant="flat"
              >
                <Cancel01Icon color="red" />
              </Button>
              <Button
                color="success"
                onPress={() => {
                  onClose();
                  console.log(transcript);
                }}
                isIconOnly
                variant="flat"
              >
                <Tick02Icon color="green" />
              </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
