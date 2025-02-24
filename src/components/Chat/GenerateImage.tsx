import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import ObjectID from "bson-objectid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import fetchDate from "../../utils/fetchDate";
import { BrushIcon } from "../Misc/icons";

import { useConversationList } from "@/contexts/ConversationList";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { MessageType } from "@/types/convoTypes";
import api from "@/utils/apiaxios";
import { ApiService } from "@/utils/chatUtils";

interface GenerateImageProps {
  openImageDialog: boolean;
  setOpenImageDialog: (open: boolean) => void;
}

export default function GenerateImage({
  openImageDialog,
  setOpenImageDialog,
}: GenerateImageProps) {
  const { setConvoMessages } = useConvo();
  const { convoIdParam } = useParams<{ convoIdParam: string }>();
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { fetchConversations } = useConversationList();

  useEffect(() => {
    setIsValid(imagePrompt.trim() !== "");
  }, [imagePrompt]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setImagePrompt((text) => `${text}\n`);
    } else if (event.key === "Enter" && !loading && isValid) {
      handleSubmit();
    }
  };

  const handleInputChange = (value: string) => {
    setImagePrompt(value);
    setIsValid(value.trim() !== "");
  };

  // Update conversation by replacing the last message if needed
  const updateConversationState = async (
    conversationId: string,
    newMessages: MessageType[],
    description?: string,
    replaceLastMessage: boolean = false
  ) => {
    try {
      setConvoMessages((prev) => {
        const baseMessages = replaceLastMessage ? prev.slice(0, -1) : prev;
        // Here, we also update the conversation in the database.
        ApiService.updateConversation(conversationId, newMessages);
        return [...baseMessages, ...newMessages];
      });

      ApiService.updateConversationDescription(
        conversationId,
        description || "New Chat",
        fetchConversations
      );
    } catch (error) {
      console.error("Failed to update conversation:", error);
      throw new Error("Failed to update conversation state");
    }
  };

  const createNewConversation = async (
    initialMessages: MessageType[]
  ): Promise<string> => {
    try {
      const convoID = crypto.randomUUID();
      await ApiService.createConversation(convoID);
      await updateConversationState(
        convoID,
        initialMessages,
        `Generate Image: ${initialMessages[0]?.imagePrompt || ""}`
      );
      navigate(`/c/${convoID}`);
      return convoID;
    } catch (error) {
      console.error("Failed to create conversation:", error);
      throw new Error("Failed to create new conversation");
    }
  };

  const generateImage = async (prompt: string): Promise<[string, string]> => {
    try {
      console.log("Starting image generation");
      const response = await api.post(
        "/image/generate",
        { message: prompt },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Image generation response:", response.data);
      return [response.data.url, response.data.improved_prompt];
    } catch (error) {
      console.error("Image generation failed:", error);
      throw new Error("Failed to generate image");
    }
  };

  const handleSubmit = async () => {
    if (!isValid || loading) return;
    setLoading(true);

    try {
      const bot_message_id = String(ObjectID());
      const user_message_id = String(ObjectID());

      const userMessage: MessageType = {
        type: "user",
        response: `Generate Image: \n${imagePrompt}`,
        date: fetchDate(),
        message_id: user_message_id,
      };

      // Bot loading message with loading: true
      const botLoadingMessage: MessageType = {
        type: "bot",
        response: "Generating Image...",
        date: fetchDate(),
        loading: true,
        imagePrompt,
        isImage: true,
        message_id: bot_message_id,
      };

      let conversationId = convoIdParam;
      if (!conversationId) {
        // If no conversation exists, create a new one with the initial messages.
        conversationId = await createNewConversation([
          userMessage,
          botLoadingMessage,
        ]);
      } else {
        // Append messages to the existing conversation.
        setConvoMessages((prev) => [...prev, userMessage, botLoadingMessage]);
      }

      setOpenImageDialog(false);

      // Generate the image
      const [imageUrl, improved_prompt] = await generateImage(imagePrompt);

      // Final bot message (replace the loading message)
      const finalBotMessage: MessageType = {
        type: "bot",
        response: "Here is your generated image",
        date: fetchDate(),
        imageUrl,
        imagePrompt,
        improvedImagePrompt: improved_prompt,
        isImage: true,
        loading: false,
        message_id: bot_message_id,
      };

      // Replace the last message (loading bot message) with the final message
      await updateConversationState(
        conversationId,
        [finalBotMessage],
        undefined,
        true
      );

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
      hideCloseButton
      backdrop="opaque"
      classNames={{ base: "w-full p-4 dark text-white" }}
      isOpen={openImageDialog}
      onOpenChange={setOpenImageDialog}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center">
          Generate Image
        </ModalHeader>
        <ModalBody className="flex justify-center items-center lottie_container">
          <Textarea
            isRequired
            color="primary"
            isDisabled={loading}
            label="Describe the image you want to generate"
            labelPlacement="outside"
            maxRows={5}
            minRows={2}
            placeholder="e.g - Futuristic city skyline"
            size="lg"
            startContent={<BrushIcon />}
            value={imagePrompt}
            variant="faded"
            onValueChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </ModalBody>
        <ModalFooter className="flex w-full justify-center">
          <Button
            color="danger"
            radius="full"
            size="md"
            variant="light"
            onPress={() => setOpenImageDialog(false)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={!isValid}
            isLoading={loading}
            radius="full"
            size="md"
            onPress={handleSubmit}
          >
            {loading ? "Generating" : "Generate"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
