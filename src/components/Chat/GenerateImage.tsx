import { Button } from "@nextui-org/button";
import { BrushIcon } from "../icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Textarea } from "@nextui-org/input";
import { toast } from "sonner";
import api from "../../apiaxios";
import fetchDate from "./fetchDate";
import { useConvoHistory } from "@/contexts/ConversationHistory";
import { useEffect, useState } from "react";
import { ConversationHistoryType, MessageType } from "@/types/ConvoTypes";
import { useNavigate, useParams } from "react-router-dom";

interface GenerateImageProps {
  openImageDialog: boolean;
  setOpenImageDialog: (open: boolean) => void;
}

export default function GenerateImage({
  openImageDialog,
  setOpenImageDialog,
}: GenerateImageProps) {
  const { convoHistory, setConvoHistory } = useConvoHistory();
  const { convoIdParam } = useParams<{ convoIdParam: string }>();
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [botResponse, setBotResponse] = useState<string | null>(null);
  const [currentConvoId, setCurrentConvoId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentConvoId(convoIdParam ?? null);
  }, [convoIdParam]);

  useEffect(() => {
    setIsValid(imagePrompt.trim() !== "");
  }, [imagePrompt]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setImagePrompt((text) => text + "\n");
    } else if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  const handleInputChange = (value: string) => {
    setImagePrompt(value);
    setIsValid(value.trim() !== "");
  };

  const handleButtonClick = () => {
    if (isValid) SubmitForm();
  };

  useEffect(() => {
    if (botResponse) updateWithResponse();
  }, [botResponse]);

  function updateWithResponse() {
    if (Object.keys(convoHistory).length > 0 && botResponse && currentConvoId) {
      const updatedHistory = { ...convoHistory };
      const currentConvo = updatedHistory[currentConvoId];

      if (currentConvo) {
        const lastItem =
          currentConvo.messages[currentConvo.messages.length - 1];

        if (lastItem.type === "bot") {
          lastItem.imageUrl = botResponse;
          lastItem.loading = false;
          lastItem.isImage = true;
          lastItem.date = fetchDate();
          setConvoHistory(updatedHistory);
        }
      }
    }
  }

  const SubmitForm = async () => {
    setLoading(true);

    let convoID = currentConvoId || convoIdParam;

    // Generate a new conversation ID if none exists
    if (!convoID) {
      convoID = crypto.randomUUID();
      navigate(`/try/chat/${convoID}`);
      setCurrentConvoId(convoID);
    }

    const newMessage: MessageType = {
      type: "user",
      response: "Generate Image: \n" + imagePrompt,
      date: fetchDate(),
    };

    const loadingMessage: MessageType = {
      type: "bot",
      loading: true,
      response: imagePrompt,
      date: "",
    };

    // Update conversation history
    setConvoHistory((prevHistory: ConversationHistoryType) => ({
      ...prevHistory,
      [convoID]: {
        ...(prevHistory[convoID] || { messages: [] }), // Initialize messages array if not present
        messages: [
          ...(prevHistory[convoID]?.messages || []),
          newMessage,
          loadingMessage,
        ],
      },
    }));

    setOpenImageDialog(false);

    try {
      const response = await api.post(
        "/image/generate",
        { message: imagePrompt },
        {
          responseType: "arraybuffer",
          headers: { "Content-Type": "application/json" },
        }
      );

      const arrayBuffer = response.data;
      const blob = new Blob([arrayBuffer], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setBotResponse(imageUrl);
      setImagePrompt("");
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
