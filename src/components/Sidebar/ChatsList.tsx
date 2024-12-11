import { apiauth } from "@/apiaxios";
import { PlusSignIcon } from "@/components/icons";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatTab } from "./ChatTab";

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
        size="lg"
      >
        Create new chat
        <PlusSignIcon width="21" color="foreground" />
      </Button>

      <div className="overflow-y-auto flex flex-col gap-1 py-1 max-h-[40vh]">
        {!!conversationIDs &&
          conversationIDs.length > 0 &&
          conversationIDs.map(
            (conversation: {
              conversation_id: string;
              description: string;
            }) => (
              <ChatTab
                key={conversation.conversation_id}
                id={conversation.conversation_id}
                name={conversation.description || "New Chat"}
                fetchConversations={fetchAllConversations}
              />
            )
          )}
      </div>
    </div>
  );
}
