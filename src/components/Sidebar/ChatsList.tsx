import { apiauth } from "@/apiaxios";
import { Chatting01Icon } from "@/components/icons";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Button } from "@nextui-org/button";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PencilEdit02Icon } from "../icons";

interface ChatTabProps {
  name: string;
  id: string;
}

export const ChatTab: FC<ChatTabProps> = ({ name, id }) => {
  const navigate = useNavigate();
  const [currentConvoId, setCurrentConvoId] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    setCurrentConvoId(pathParts[pathParts.length - 1]);
  }, [location.pathname]);

  return (
    <div>
      <Button
        variant="light"
        color={currentConvoId === id ? "primary" : "default"}
        className="w-full flex justify-start chattab_btn"
        size="sm"
        onClick={() => navigate(`/try/chat/${id}`)}
        startContent={
          <Chatting01Icon
            width="19"
            color={currentConvoId === id ? "#00bbff" : "#9b9b9b"}
          />
        }
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
        <PencilEdit02Icon width="21" />
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
