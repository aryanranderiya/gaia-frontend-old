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
import { Select, SelectItem } from "@nextui-org/select";
import { Dispatch, SetStateAction, useState } from "react";

export default function AddNoteDialog({
  openDialog,
  setOpenDialog,
  categories,
  addNote,
}: {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  categories: string[];
  addNote: (note: Note) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddNote = () => {
    if (!(title && description && selectedCategory)) {
      return;
    }
    addNote({ title, description, category: selectedCategory });
    setTitle("");
    setDescription("");
    setSelectedCategory("");
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
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setTitle(e.target.value)
            }
          />
          <Textarea
            label="Enter Description"
            variant="faded"
            placeholder="Store key information about your preferences, interests, and important details that will help the AI assistant tailor responses and suggestions to better suit your needs."
            value={description}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setDescription(e.target.value)
            }
          />
          <Select
            label="Select a Category"
            variant="faded"
            className="dark"
            value={selectedCategory}
            onSelectionChange={setSelectedCategory}
          >
            {categories.map((category) => (
              <SelectItem key={category}>{category}</SelectItem>
            ))}
          </Select>
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
