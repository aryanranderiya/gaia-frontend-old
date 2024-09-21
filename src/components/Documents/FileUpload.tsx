import * as React from "react";
import { NoteDoneIcon, Cancel01Icon, SentIcon } from "../icons";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { PdfContainer } from "./PdfComponent";
import { toast } from "sonner";
import api from "../../apiaxios";
import imageCompression from "browser-image-compression";
import fetchDate from "../Chat/fetchDate";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../Shadcn/Dialog";
import { useConvoHistory } from "@/contexts/ConversationHistory";

interface FileUploadProps {
  isImage: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

interface ConversationItem {
  type: "user" | "bot";
  response: string;
  subtype?: "image" | "pdf";
  file?: string | File;
  date: string;
  filename?: string;
  loading?: boolean;
  disclaimer?: string;
}

export default function FileUpload({
  isImage,
  fileInputRef,
}: FileUploadProps): JSX.Element {
  const {
    convoHistory: conversationHistory,
    setConvoHistory: setConversationHistory,
  } = useConvoHistory();

  const [file, setFile] = React.useState<File | null>(null);
  const [fileLoading, setFileLoading] = React.useState<boolean>(false);
  const [textContent, setTextContent] = React.useState<string>("");
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [botResponse, setBotResponse] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open === false) closeModal();
  }, [open]);

  const closeModal = (): void => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setTextContent("");
    setFile(null);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setFileLoading(true);
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setOpen(true);

    console.log(selectedFile);
    if (isImage && selectedFile.size > 2000000) {
      try {
        const compressedFile = await imageCompression(selectedFile, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        setFile(compressedFile);
        setFileLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setFile(selectedFile);
      setFileLoading(false);
    }
  };

  function updateWithResponse(): void {
    if (conversationHistory.length > 0 && !!botResponse) {
      const updatedHistory = [...conversationHistory];
      const lastItemIndex = updatedHistory.length - 1;
      const lastItem = updatedHistory[lastItemIndex];

      if (lastItem.type === "bot") {
        lastItem.response = botResponse;
        lastItem.loading = false;
        setConversationHistory(updatedHistory);
      }
    }
  }

  React.useEffect(() => {
    updateWithResponse();
  }, [botResponse]);

  const submitForm = async (): Promise<void> => {
    setIsValid(textContent.trim() === "");
    if (textContent.trim() === "") return;

    closeModal();
    setOpen(false);
    setConversationHistory((prevHistory: ConversationItem[]) => [
      ...prevHistory,
      {
        type: "user",
        response: textContent,
        subtype: isImage ? "image" : "pdf",
        file: isImage && file ? URL.createObjectURL(file) : file,
        date: fetchDate(),
        filename: file?.name,
      },
      {
        type: "bot",
        loading: true,
        disclaimer: "GAIA can make mistakes. Check important info.",
        date: fetchDate(),
        response: "",
      },
    ]);

    if (!file) return;

    const formData = new FormData();
    formData.append("message", textContent);
    formData.append("file", file);

    try {
      const response = await api.post<{ response: string }>(
        isImage ? "/image" : "/document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setBotResponse(response.data.response);
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
          "There was a problem with uploading documents. Please try again later.\n",
      });
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setTextContent((text) => text + "\n");
    } else if (event.key === "Enter" && textContent.trim() !== "") {
      event.preventDefault();
      submitForm();
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
            <DialogTitle> Your File Upload</DialogTitle>
          </DialogHeader>
          <div>
            {fileLoading ? (
              <div className="h-[250px] w-[350px] bg-black bg-opacity-40 rounded-3xl flex justify-center items-center">
                <Spinner size="lg" color="primary" />
              </div>
            ) : isImage && !!file ? (
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
              label={`What do you want to do with this ${isImage ? "image" : "file"}?`}
              placeholder={`e.g - ${isImage ? "What is in this image?" : "Summarise this document"}`}
              startContent={<NoteDoneIcon />}
              maxRows={3}
              minRows={2}
              labelPlacement="outside"
              isRequired
              variant="shadow"
              color="primary"
              value={textContent}
              errorMessage="This is a required input field."
              isInvalid={isValid}
              spellCheck={false}
              size="large"
              onKeyDown={handleKeyDown}
              onValueChange={(value: string) => {
                setTextContent(value);
                setIsValid(value.trim() === "");
              }}
            />
          </div>
          <DialogFooter className="flex flex-row !justify-between w-full">
            <Button
              color="danger"
              variant="flat"
              onClick={() => setOpen(false)}
              startContent={<Cancel01Icon color="danger" width="20" />}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              onClick={submitForm}
              endContent={<SentIcon color="black" width="20" />}
              disabled={isValid}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
