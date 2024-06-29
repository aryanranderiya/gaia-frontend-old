import * as React from "react";
import {  NoteDoneIcon, Cancel01Icon, SentIcon } from "../icons";
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

export default function FileUpload({ setConversationHistory, fileInputRef }) {
  const [file, setFile] = React.useState(null);
  const [textContent, setTextContent] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModal = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsModalOpen(false);
    setTextContent("");
    setFile(null);
  };

  const handleFileSelect = (event) => {
    console.log("handling file select");
    const selectedFile = event.target.files[0];
    if (selectedFile) setIsModalOpen(true);
    setFile(selectedFile);
  };

  const submitPdf = () => {
    if (textContent.trim() === "") return;
    setConversationHistory((prevHistory) => [
      ...prevHistory,
      { type: "user", response: textContent, subtype: "pdf", file: file },
    ]);
    closeModal();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setTextContent((text) => text + "\n");
    } else if (event.key === "Enter" && textContent.trim() !== "") {
      submitPdf();
    }
  };

  React.useEffect(() => {
    console.log(file);
  }, [file]);
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
              minRows={1}
              isRequired
              value={textContent}
              onValueChange={(e) => setTextContent(e)}
              errorMessage="This is a required input field."
              isInvalid={textContent.trim() === ""}
              spellCheck={false}
              onKeyDown={handleKeyDown}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="ghost"
              onClick={closeModal}
              endContent={<Cancel01Icon width="20" color="danger" />}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              onClick={submitPdf}
              disabled={textContent.trim() === ""}
              endContent={<SentIcon color="black" width="20" />}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}
