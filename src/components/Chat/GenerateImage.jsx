import { Button } from "@nextui-org/button";
import { BrushIcon, Cancel01Icon, Tick02Icon } from "../icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Textarea } from "@nextui-org/input";
import * as React from "react";
import { toast } from "sonner";
import api from "../../apiaxios";

export default function GenerateImage({
  openImageDialog,
  setOpenImageDialog,
  setConversationHistory,
}) {
  const [imagePrompt, setImagePrompt] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setIsValid(true);
  }, [openImageDialog]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setImagePrompt((text) => text + "\n");
    } else if (event.key === "Enter") handleButtonClick();
  };

  const handleInputChange = (value) => {
    setImagePrompt(value);
    setIsValid(true);
  };

  const handleButtonClick = () => {
    setIsValid(imagePrompt.trim() !== "");
    if (imagePrompt.trim() !== "") {
      SubmitForm();
    }
  };

  const SubmitForm = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        "/image",
        {
          message: imagePrompt,
        },
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const arrayBuffer = response.data;
      const blob = new Blob([arrayBuffer], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);

      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", response: "Generate Image: \n" + imagePrompt },
        {
          type: "bot",
          response: `${imagePrompt}`,
          imageUrl: imageUrl,
          isImage: true,
        },
      ]);

      setImagePrompt("");
      setOpenImageDialog(false);
    } catch (error) {
      console.error(error);
      toast.error("Uh oh! Something went wrong.", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: " text-sm",
          description: "text-sm",
        },
        duration: 3000,
        description:
          "There was a problem with generating images. Please try again later.\n",
      });
    }

    setLoading(false);
  };

  return (
    <Modal
      isOpen={openImageDialog}
      onOpenChange={setOpenImageDialog}
      backdrop="opaque"
      classNames={{ base: "w-full p-4 dark text-white" }}
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center">
          Generate Image
        </ModalHeader>
        <ModalBody className="flex justify-center items-center lottie_container">
          <Textarea
            label="Describe the image you want to generate"
            labelPlacement="outside"
            placeholder="e.g - Futuristic city skyline with towering skyscrapers and flying vehicles."
            startContent={<BrushIcon />}
            maxRows={5}
            isDisabled={loading}
            minRows={1}
            isRequired
            variant="faded"
            size="lg"
            color="primary"
            value={imagePrompt}
            onValueChange={handleInputChange}
            errorMessage="This is a required input field."
            isInvalid={!isValid}
            spellCheck={false}
            onKeyDown={handleKeyDown}
          />
        </ModalBody>
        <ModalFooter className="flex w-full justify-center">
          <Button
            color="danger"
            onPress={() => setOpenImageDialog(false)}
            radius="full"
            variant="light"
            size="md"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            size="md"
            onPress={handleButtonClick}
            radius="full"
            isLoading={loading}
          >
            {loading ? "Generating" : "Generate"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
