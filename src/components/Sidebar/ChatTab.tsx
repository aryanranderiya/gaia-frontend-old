import { Chatting01Icon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatOptionsDropdown from "./ChatOptionsDropdown";

interface ChatTabProps {
  name: string;
  id: string;
  fetchConversations: () => void;
}

export const ChatTab: FC<ChatTabProps> = ({ name, id, fetchConversations }) => {
  const navigate = useNavigate();
  const [currentConvoId, setCurrentConvoId] = useState<string | null>(null);
  const location = useLocation();
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    setCurrentConvoId(pathParts[pathParts.length - 1]);
  }, [location.pathname]);

  return (
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
      endContent={
        <ChatOptionsDropdown
          buttonHovered={buttonHovered}
          chatId={id}
          chatName={name}
          fetchConversations={fetchConversations}
        />
      }
    >
      <span>{name}</span>
    </Button>
  );
};
