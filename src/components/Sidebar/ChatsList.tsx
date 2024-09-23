import { apiauth } from "@/apiaxios";
import {
  Chatting01Icon,
  PencilEdit02Icon,
  PlusSignIcon,
} from "@/components/icons";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Button } from "@nextui-org/button";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Trash } from "lucide-react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

interface ChatTabProps {
  name: string;
  id: string;
}

function ChatOptionsDropdown({ buttonHovered }: { buttonHovered: boolean }) {
  const [dangerStateHovered, setDangerStateHovered] = useState(false);

  return (
    <Dropdown
      className="dark text-foreground w-fit min-w-fit"
      size="sm"
      backdrop="opaque"
    >
      <DropdownTrigger>
        <Button
          variant="light"
          isIconOnly
          className="ml-auto"
          size="sm"
          radius="full"
        >
          <DotsVerticalIcon
            width={20}
            className={buttonHovered ? "opacity-100" : "opacity-0"}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit" className="w-fit">
          <div className="flex flex-row gap-2 justify-between items-center">
            <PencilEdit02Icon width={16} color="white" />
            Rename
          </div>
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onMouseOver={() => setDangerStateHovered(true)}
          onMouseOut={() => setDangerStateHovered(false)}
        >
          <div className="flex flex-row gap-2 items-center justify-between">
            <Trash width={16} color={dangerStateHovered ? "white" : "red"} />
            Delete
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export const ChatTab: FC<ChatTabProps> = ({ name, id }) => {
  const navigate = useNavigate();
  const [currentConvoId, setCurrentConvoId] = useState<string | null>(null);
  const location = useLocation();
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    setCurrentConvoId(pathParts[pathParts.length - 1]);
  }, [location.pathname]);

  return (
    <div>
      <Button
        variant="light"
        color={currentConvoId === id ? "primary" : "default"}
        className="w-full flex justify-start pr-0"
        size="sm"
        onClick={() => {
          setButtonHovered(false);
          navigate(`/try/chat/${id}`);
        }}
        startContent={
          <Chatting01Icon
            width="19"
            color={currentConvoId === id ? "#00bbff" : "#9b9b9b"}
          />
        }
        onMouseOver={() => setButtonHovered(true)}
        onMouseOut={() => setButtonHovered(false)}
        endContent={<ChatOptionsDropdown buttonHovered={buttonHovered} />}
      >
        <span>{name}</span>
      </Button>
    </div>
  );
};

export default function ChatsList() {
  const [conversationIDs, setConversationIDs] = useState([]);
  const navigate = useNavigate();
  const { resetMessages } = useConvo();

  const createNewChat = (): void => {
    navigate(`/try/chat/`);
    resetMessages();
  };

  async function fetchAllConversations() {
    try {
      const response = await apiauth.get("/conversations/");
      setConversationIDs(response?.data?.conversations);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchAllConversations();
  }, []);

  return (
    <div className="sidebar_inner ">
      <Button
        variant="flat"
        className="w-full flex justify-between"
        onPress={createNewChat}
      >
        Create new chat
        <PlusSignIcon width="21" color="foreground" />
      </Button>

      <div className="chats_list max-h-[40vh]">
        {conversationIDs.map(
          (conversation: { conversation_id: string; description: string }) => (
            <ChatTab
              key={conversation.conversation_id}
              id={conversation.conversation_id}
              name={conversation.description || "New Chat"}
            />
          )
        )}
      </div>
    </div>
  );
}
