import { useConvo } from "@/contexts/CurrentConvoMessages";
import { MessageType } from "@/types/ConvoTypes";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api, { apiauth } from "@/utils/apiaxios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { PdfContainer } from "./PdfComponent";
import fetchDate from "@/utils/fetchDate";
import { useNavigate, useParams } from "react-router-dom";
import { useConversationList } from "@/contexts/ConversationList";
import { ApiService } from "@/utils/chatUtils";

interface FileUploadProps {
  isImage: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function FileUpload({
  isImage,
  fileInputRef,
}: FileUploadProps): JSX.Element {
  const { setConvoMessages } = useConvo();
  const { convoIdParam } = useParams<{ convoIdParam: string }>();
  const { fetchConversations } = useConversationList();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [textContent, setTextContent] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(textContent.trim() !== "");
  }, [textContent]);

  const closeModal = (): void => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setTextContent("");
    setFile(null);
    setOpen(false);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setFileLoading(true);
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setOpen(true);

    if (isImage && selectedFile.size > 2000000) {
      try {
        const compressedFile = await imageCompression(selectedFile, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        setFile(compressedFile);
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    } else {
      setFile(selectedFile);
    }
    setFileLoading(false);
  };

  const updateConversationState = async (
    conversationId: string,
    newMessages: MessageType[],
    description?: string,
    replaceLastMessage: boolean = false
  ) => {
    try {
      setConvoMessages((prev) => {
        const baseMessages = replaceLastMessage ? prev.slice(0, -1) : prev;
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
        `File Upload: ${initialMessages[0]?.response || ""}`
      );
      navigate(`/try/chat/${convoID}`);
      return convoID;
    } catch (error) {
      console.error("Failed to create conversation:", error);
      throw new Error("Failed to create new conversation");
    }
  };

  const uploadFile = async (conversationId: string): Promise<string> => {
    if (!file) throw new Error("No file selected");
    const formData = new FormData();
    formData.append("message", textContent);
    formData.append("file", file);
    formData.append("conversation_id", conversationId);

    try {
      const response = await apiauth.post(
        isImage ? "/image" : "/document/query",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response);

      return response.data.response.response;
    } catch (error) {
      console.error("File upload failed:", error);
      throw new Error("Failed to upload file");
    }
  };

  const handleSubmit = async () => {
    if (!isValid || loading || !file) return;
    setLoading(true);

    try {
      const userMessage: MessageType = {
        type: "user",
        response: textContent,
        file: URL.createObjectURL(file),
        filename: file.name,
        date: fetchDate(),
      };

      const botLoadingMessage: MessageType = {
        type: "bot",
        response: "Processing your file...",
        date: fetchDate(),
        loading: true,
      };

      const initialMessages: MessageType[] = [userMessage, botLoadingMessage];
      const conversationId =
        convoIdParam || (await createNewConversation(initialMessages));

      setConvoMessages((prev) => [...prev, ...initialMessages]);
      closeModal();

      const botResponse = await uploadFile(conversationId);

      const finalBotMessage: MessageType = {
        type: "bot",
        response: botResponse,
        date: fetchDate(),
      };

      setConvoMessages((prev) => [...prev.slice(0, -1), finalBotMessage]);

      await updateConversationState(
        conversationId,
        [userMessage, finalBotMessage],
        undefined,
        true
      );
    } catch (error) {
      toast.error("Uh oh! Something went wrong.", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: "text-sm",
          description: "text-sm",
        },
        duration: 3000,
        description:
          "There was a problem with uploading your file. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        id="fileInput"
        accept={isImage ? "image/png,image/jpeg" : "application/pdf"}
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 text-white w-[400px] md:rounded-2xl rounded-2xl border-none">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
          </DialogHeader>
          <div>
            {fileLoading ? (
              <div className="h-[250px] w-[350px] bg-black bg-opacity-40 rounded-3xl flex justify-center items-center">
                <Spinner size="lg" color="primary" />
              </div>
            ) : isImage && file ? (
              <img
                src={URL.createObjectURL(file)}
                className="rounded-3xl my-2 object-cover h-[250px] w-[350px]"
                alt="Uploaded file preview"
              />
            ) : (
              <PdfContainer file={file} />
            )}

            <Textarea
              className="dark mt-4"
              label={`What do you want to do with this ${
                isImage ? "image" : "file"
              }?`}
              placeholder={`e.g., ${
                isImage ? "What is in this image?" : "Summarize this document"
              }`}
              startContent={null}
              maxRows={3}
              minRows={2}
              labelPlacement="outside"
              isRequired
              variant="faded"
              color="primary"
              value={textContent}
              isInvalid={!isValid}
              size="lg"
              onKeyDown={(event) => {
                if (event.key === "Enter" && textContent.trim() !== "") {
                  event.preventDefault();
                  handleSubmit();
                }
              }}
              onValueChange={(value: string) => setTextContent(value)}
            />
          </div>
          <DialogFooter className="flex flex-row !justify-between w-full">
            <Button color="danger" variant="flat" onClick={closeModal}>
              Cancel
            </Button>

            <Button
              color="primary"
              onClick={handleSubmit}
              isLoading={loading}
              disabled={!isValid || loading}
            >
              {loading ? "Uploading" : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
