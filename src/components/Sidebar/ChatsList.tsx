import { Chatting01Icon } from "@/components/icons";
import { useConvoHistory } from "@/contexts/ConversationHistory";
import { Button } from "@nextui-org/button";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilEdit02Icon } from "../icons";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { apiauth } from "@/apiaxios";

interface ChatTabProps {
  name: string;
  id: string;
}

export const ChatTab: FC<ChatTabProps> = ({ name, id }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="light"
        className="w-full flex justify-start chattab_btn"
        size="sm"
        onClick={() => navigate(`/try/chat/${id}`)}
        startContent={<Chatting01Icon width="19" />}
      >
        <span>{name}</span>
      </Button>
    </div>
  );
};

export default function ChatsList() {
  const { convoHistory } = useConvoHistory();
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
      console.log(response?.data?.conversations);
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
