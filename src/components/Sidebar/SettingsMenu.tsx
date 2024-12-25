import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Logout02Icon, Settings01Icon, ThreeDotsMenu } from "../icons";
import { useUser } from "@/contexts/UserContext";
import { Eraser } from "lucide-react";
import { ApiService } from "@/utils/chatUtils";
import { useConversationList } from "@/contexts/ConversationList";
import { useNavigate } from "react-router-dom";

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

  const items: MenuItem[] = [
    {
      key: "clear",
      label: (
        <div className="flex items-center gap-4">
          <Eraser width={20} />
          Clear all Chats
        </div>
      ),
      action: async () => {
        navigate("/try/chat");
        await ApiService.deleteAllConversations();
        fetchConversations();
      },
    },

    {
      key: "settings",
      label: (
        <div className="flex items-center gap-4">
          <Settings01Icon width={20} color="text-foreground" />
          Settings
        </div>
      ),
    },

    {
      key: "logout",
      label: (
        <div className="flex items-center gap-4">
          <Logout02Icon width={20} color="#f31260" />
          Logout
        </div>
      ),
      action: logout,
      color: "danger",
    },
  ];

  return (
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
  );
}
