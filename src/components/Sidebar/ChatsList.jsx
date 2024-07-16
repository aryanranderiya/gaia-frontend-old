import React from "react";
import { PencilEdit02Icon } from "../icons";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { useConvoHistory } from "@/contexts/ConversationHistory";
import { Chatting01Icon } from "@/components/icons";

export function ChatTab({ name, id }) {
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
}

export default function ChatsList() {
  const { conversationHistory, setConversationHistory } = useConvoHistory();

  const navigate = useNavigate();

  const createNewChat = () => {
    // const convoID = crypto.randomUUID();
    // setChatsList((oldlist) => [...oldlist, { id: convoID, name: "New Chat" }]);
    // navigate(`/try/chat/${convoID}`);
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

      {/* <ScrollArea className="max-h-[50vh]"> */}
      <div className="chats_list max-h-[40vh]">
        {Object.keys(conversationHistory).map((key) => (
          <ChatTab
            key={key}
            name={conversationHistory[key].description}
            id={key}
          />
        ))}
      </div>
      {/* </ScrollArea> */}
    </div>
  );
}
