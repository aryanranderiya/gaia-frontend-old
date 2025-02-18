import { useConversationList } from "@/contexts/ConversationList";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { useUser } from "@/contexts/UserContext";
import { ApiService } from "@/utils/chatUtils";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Eraser } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logout02Icon, Settings01Icon, ThreeDotsMenu } from "../../icons";
import SettingsModal from "./SettingsModal";

// Only allow these values in our modal state.
export type ModalAction = "clear_chats" | "logout";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  color?: "danger";
  action?: () => void;
}

export default function SettingsMenu() {
  const { logout } = useUser();
  const navigate = useNavigate();
  const { fetchConversations } = useConversationList();
  const { setConvoMessages } = useConvo();
  const [openSettings, setOpenSettings] = useState(false);

  // modalAction is either "clear_chats", "logout", or null (closed)
  const [modalAction, setModalAction] = useState<ModalAction | null>(null);

  // Confirm logout action.
  const handleConfirmLogout = () => {
    logout();
    setModalAction(null);
  };

  // Confirm clear chats action.
  const handleConfirmClearChats = async () => {
    navigate("/try/chat");
    await ApiService.deleteAllConversations();
    await fetchConversations();
    setConvoMessages([]);
    setModalAction(null);
  };

  const items: MenuItem[] = [
    {
      key: "clear",
      label: (
        <div className="flex items-center gap-4">
          <Eraser width={20} />
          Delete all Chats
        </div>
      ),
      action: () => setModalAction("clear_chats"),
    },
    {
      key: "settings",
      label: (
        <div className="flex items-center gap-4">
          <Settings01Icon width={20} color="text-foreground" />
          Settings
        </div>
      ),
      action: () => setOpenSettings(true),
    },
    {
      key: "logout",
      label: (
        <div className="flex items-center gap-4">
          <Logout02Icon width={20} color={undefined} />
          Logout
        </div>
      ),
      action: () => setModalAction("logout"),
      color: "danger",
    },
  ];

  return (
    <>
      <SettingsModal
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
        setModalAction={setModalAction}
      />

      <Modal
        isOpen={modalAction !== null}
        onOpenChange={() => setModalAction(null)}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex justify-center">
              {modalAction === "logout"
                ? "Are you sure you want to logout?"
                : "Are you sure you want to delete all chats?"}
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2 mb-4">
              <Button
                radius="full"
                color="danger"
                onPress={() => {
                  if (modalAction === "logout") {
                    handleConfirmLogout();
                  } else if (modalAction === "clear_chats") {
                    handleConfirmClearChats();
                  }
                }}
              >
                {modalAction === "logout" ? "Logout" : "Delete all chats"}
              </Button>
              <Button
                variant="bordered"
                radius="full"
                onPress={() => setModalAction(null)}
              >
                Cancel
              </Button>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>

      <Dropdown className="dark text-foreground">
        <DropdownTrigger>
          <Button isIconOnly variant="light" aria-label="Three Dots Menu">
            <ThreeDotsMenu />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          {items.map((item) => (
            <DropdownItem
              key={item.key}
              color={item.color === "danger" ? "danger" : "default"}
              className={item.color === "danger" ? "text-danger" : ""}
              textValue={item.key}
              onPress={item.action}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
