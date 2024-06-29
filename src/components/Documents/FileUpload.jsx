import * as React from "react";
import { Pdf02Icon, NoteDoneIcon } from "../icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Document, Page, pdfjs } from "react-pdf";
import { Spinner } from "@nextui-org/spinner";

export default function FileUpload() {
  const fileInputRef = React.useRef(null);
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState(null);

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const chooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setFileName(file.name);
      onOpen();
    }
  };

  return (
    <>
      <input
        type="file"
        id="fileInput"
        accept="application/pdf"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      <Pdf02Icon color="#00bbff" onClick={chooseFile} />

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="dark text-foreground w-[400px]"
        onClose={() => setFileName("")}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Your File Upload
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full rounded-xl bg-zinc-700 flex-col p-3 items-center">
                  {!!file && (
                    <div className="pdf_container">
                      <Document
                        file={file}
                        onLoadSuccess={() => console.log("loaded")}
                      >
                        <Page
                          pageNumber={1}
                          width={350}
                          loading={<Spinner color="primary" />}
                        />
                      </Document>
                    </div>
                  )}

                  <div className="h-[50px] flex w-full items-center gap-2 pt-2">
                    <Pdf02Icon color="zinc-600" width="25" height="25" />
                    <div className="flex flex-col">
                      <span className="font-[500] text-small w-[270px] text-ellipsis whitespace-nowrap overflow-hidden">
                        {fileName}
                      </span>
                      <span className="text-xs">application/pdf</span>
                    </div>
                  </div>
                </div>
                <Textarea
                  label="What do you want to do with this file?"
                  placeholder="e.g - Summarise this pdf"
                  startContent={<NoteDoneIcon />}
                  maxRows={3}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
