import { apiauth } from "@/utils/apiaxios";
import { PencilEdit02Icon } from "@/components/icons";
import { useConversationList } from "@/contexts/ConversationList";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Trash } from "lucide-react";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatOptionsDropdown({
  buttonHovered,
  chatId,
  chatName,
}: {
  buttonHovered: boolean;
  chatId: string;
  chatName: string;
}) {
  const { fetchConversations } = useConversationList();
  const [dangerStateHovered, setDangerStateHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"edit" | "delete" | null>(
    null
  );
  const [newName, setNewName] = useState(chatName);
  const navigate = useNavigate();
  const { resetMessages } = useConvo();

  const handleEdit = async () => {
    if (!newName) return;
    try {
      await apiauth.put(`/conversations/${chatId}/description`, {
        description: newName,
      });
      setIsOpen(false);
      fetchConversations();
    } catch (error) {
      console.error("Failed to update chat name", error);
    }
  };

  const handleDelete = async () => {
    try {
      navigate("/try/chat");
      resetMessages();
      await apiauth.delete(`/conversations/${chatId}`);
      setIsOpen(false);
      fetchConversations();
    } catch (error) {
      console.error("Failed to delete chat", error);
    }
  };

  const openModal = (action: "edit" | "delete") => {
    setModalAction(action);
    setIsOpen(true);
  };

  return (
    <>
      <Dropdown className="dark text-foreground w-fit min-w-fit" size="sm">
        <DropdownTrigger>
          <Button
            variant="light"
            isIconOnly
            className="ml-auto min-w-[20px]"
            size="sm"
            radius="full"
          >
            <DotsVerticalIcon
              width={20}
              className={
                buttonHovered
                  ? "opacity-100"
                  : "opacity-0" + "min-w-[20px] w-[20px]"
              }
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="edit"
            textValue="Rename"
            className="w-fit"
            onPress={() => openModal("edit")}
          >
            <div className="flex flex-row gap-2 justify-between items-center">
              <PencilEdit02Icon width={16} color="white" />
              Rename
            </div>
          </DropdownItem>
          <DropdownItem
            key="delete"
            textValue="Delete"
            className="text-danger"
            color="danger"
            onMouseOver={() => setDangerStateHovered(true)}
            onMouseOut={() => setDangerStateHovered(false)}
            onPress={() => openModal("delete")}
          >
            <div className="flex flex-row gap-2 items-center justify-between">
              <Trash width={16} color={dangerStateHovered ? "white" : "red"} />
              Delete
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="dark text-foreground"
      >
        <ModalContent>
          {modalAction === "edit" ? (
            <>
              <ModalHeader className="pb-0">Rename Conversation</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  value={newName}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setNewName(e.target.value)}
                  placeholder="Enter new chat name"
                  variant="faded"
                  labelPlacement="outside"
                  size="lg"
                  label={
                    <div className="space-x-1 text-xs">
                      <span>Previous Name</span>
                      <b>{chatName}</b>
                    </div>
                  }
                  onKeyDown={(e: { key: string }) => {
                    if (e.key == "Enter") handleEdit();
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleEdit}>
                  Save
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalHeader className="pb-0">
                Are you sure you want to delete this chat?
              </ModalHeader>
              <ModalBody className="py-0">
                <p className="text-danger">This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button color="danger" variant="flat" onPress={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
