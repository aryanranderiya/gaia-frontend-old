import { Note } from "@/pages/Notes";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Dispatch, SetStateAction, useState } from "react";

export default function AddNoteDialog({
  openDialog,
  setOpenDialog,
  addNote,
}: {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  addNote: (note: Omit<Note, "id">) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddNote = () => {
    if (!(title && description)) {
      return;
    }
    addNote({ title, description });
    setTitle("");
    setDescription("");
    setOpenDialog(false);
  };

  return (
    <Modal
      isOpen={openDialog}
      onOpenChange={setOpenDialog}
      className="dark text-foreground"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add Note</ModalHeader>
        <ModalBody>
          <Input
            label="Enter Title"
            variant="faded"
            placeholder="Personal Preferences"
            value={title}
            maxLength={100} // Enforce 100-character limit
            onChange={(e: { target: { value: string } }) =>
              setTitle(e.target.value)
            }
          />
          <div className="text-xs text-gray-500 relative left-2 -top-1">
            {title.length}/100 characters
          </div>
          <Textarea
            label="Enter Description"
            variant="faded"
            placeholder="Store key information about your preferences, interests, and important details that will help the AI assistant tailor responses and suggestions to better suit your needs."
            value={description}
            maxLength={1000} // Enforce 1000-character limit
            onChange={(e: { target: { value: string } }) =>
              setDescription(e.target.value)
            }
          />
          <div className="text-xs text-gray-500 relative left-2 -top-1">
            {description.length}/1000 characters
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button color="primary" onPress={handleAddNote}>
            Add Note
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
