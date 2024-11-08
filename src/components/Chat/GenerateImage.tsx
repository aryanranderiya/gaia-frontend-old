import { useConvo } from "@/contexts/CurrentConvoMessages";
import { MessageType } from "@/types/ConvoTypes";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import api from "../../apiaxios";
import { BrushIcon } from "../icons";
import fetchDate from "./fetchDate";
import { useConversation } from "@/hooks/useConversation";

interface GenerateImageProps {
  openImageDialog: boolean;
  setOpenImageDialog: (open: boolean) => void;
}

export default function GenerateImage({
  openImageDialog,
  setOpenImageDialog,
}: GenerateImageProps) {
  const { convoIdParam } = useParams<{ convoIdParam: string }>();
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Use the conversation hook
  const { updateConversation } = useConversation(convoIdParam);

  useEffect(() => {
    setIsValid(imagePrompt.trim() !== "");
  }, [imagePrompt]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setImagePrompt((text) => text + "\n");
    } else if (event.key === "Enter" && !loading && isValid) {
      handleSubmit();
    }
  };

  const handleInputChange = (value: string) => {
    setImagePrompt(value);
    setIsValid(value.trim() !== "");
  };

  const generateImage = async (prompt: string): Promise<string> => {
    try {
      const response = await api.post(
        "/image/generate",
        { message: prompt },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.url;
    } catch (error) {
      console.error("Image generation failed:", error);
      throw new Error("Failed to generate image");
    }
  };

  const handleSubmit = async () => {
    if (!isValid || loading) return;
    setLoading(true);

    try {
      // First, add the user's prompt and loading message
      await updateConversation(`Generate Image: \n${imagePrompt}`);
      setOpenImageDialog(false);

      // Generate the image
      const imageUrl = await generateImage(imagePrompt);

      // Update the conversation with the final image
      const finalMessage: MessageType = {
        type: "bot",
        response: "Here is your generated image",
        date: fetchDate(),
        imageUrl,
        imagePrompt,
        isImage: true,
      };

      await updateConversation(finalMessage);
      setImagePrompt("");
    } catch (error) {
      toast.error("Uh oh! Something went wrong.", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: "text-sm",
          description: "text-sm",
        },
        duration: 3000,
        description:
          "There was a problem with generating images. Please try again later.\n",
      });
    } finally {
      setLoading(false);
    }
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
            onPress={handleSubmit}
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
