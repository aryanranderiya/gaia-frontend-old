import { Chatting01Icon } from "@/components/icons";
import { useConvoHistory } from "@/contexts/ConversationHistory";
import { Button } from "@nextui-org/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PencilEdit02Icon } from "../icons";

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
  const { convoHistory: conversationHistory } = useConvoHistory();
  const navigate = useNavigate();

  const createNewChat = (): void => {
    navigate(`/try/chat/`);
  };

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
        {Object.keys(conversationHistory).map((key: string) => (
          <ChatTab
            key={key}
            name={conversationHistory[key].description}
            id={key}
          />
        ))}
      </div>
    </div>
  );
}
