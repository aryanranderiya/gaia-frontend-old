import { PlusSignIcon } from "@/components/icons";
import { useConversationList } from "@/contexts/ConversationList";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatTab } from "./ChatTab";

export default function ChatsList() {
  const navigate = useNavigate();
  const { resetMessages } = useConvo();
  const { conversations, fetchConversations } = useConversationList();

  useEffect(() => {
    fetchConversations();
  }, []);

  const createNewChat = (): void => {
    navigate(`/try/chat/`);
    resetMessages();
  };

  return (
    <div>
      <Button
        variant="flat"
        className="w-full flex justify-between"
        onPress={createNewChat}
        size="lg"
      >
        Create new chat
        <PlusSignIcon width="21" color="foreground" />
      </Button>

      <div className="overflow-y-auto flex flex-col gap-1 py-1 max-h-[40vh] ">
        {/* <ScrollArea className="min-h-[20vh] nax-h-[80vh]"> */}
        {conversations.length > 0 &&
          conversations.map(
            (conversation: {
              conversation_id: string;
              description: string;
            }) => (
              <ChatTab
                key={conversation.conversation_id}
                id={conversation.conversation_id}
                name={conversation.description || "New Chat"}
              />
            )
          )}
        {/* </ScrollArea> */}
      </div>
    </div>
  );
}
