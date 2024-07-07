import * as React from "react";
import { NoteDoneIcon, Cancel01Icon, SentIcon } from "../icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { PdfContainer } from "./PdfComponent";
import { toast } from "sonner";
import api from "../../apiaxios";
export default function FileUpload({ setConversationHistory, fileInputRef }) {
  const [file, setFile] = React.useState(null);
  const [textContent, setTextContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModal = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsModalOpen(false);
    setTextContent("");
    setFile(null);
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) setIsModalOpen(true);
    setFile(selectedFile);
  };

  const submitPdf = async () => {
    setLoading(true);
    setIsValid(textContent.trim() === "");
    if (textContent.trim() === "") return;

    const formData = new FormData();
    formData.append("message", textContent);
    formData.append("file", file);

    try {
      const response = await api.post("/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", response: textContent, subtype: "pdf", file: file },
        { type: "bot", response: response.data.response },
      ]);

      closeModal();
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
    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setTextContent((text) => text + "\n");
    } else if (event.key === "Enter" && textContent.trim() !== "") {
      submitPdf();
    }
  };

  return (
    <form>
      <input
        type="file"
        id="fileInput"
        accept="application/pdf"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      <Modal
        className="dark text-foreground w-[400px]"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Your File Upload
          </ModalHeader>
          <ModalBody>
            <PdfContainer file={file} />
            <Textarea
              label="What do you want to do with this file?"
              placeholder="e.g - Summarise this pdf"
              startContent={<NoteDoneIcon />}
              maxRows={3}
              minRows={2}
              labelPlacement="outside"
              isRequired
              variant="shadow"
              color="primary"
              value={textContent}
              onValueChange={(e) => {
                setTextContent(e);
                setIsValid(textContent.trim() === "");
              }}
              errorMessage="This is a required input field."
              isInvalid={isValid}
              spellCheck={false}
              size="large"
              onKeyDown={handleKeyDown}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={closeModal}>
              Cancel
            </Button>

            <Button
              color="primary"
              onClick={submitPdf}
              endContent={<SentIcon color="black" width="20" />}
              isLoading={loading}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}
