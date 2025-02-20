import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

import { Button } from "../ui/button";

import ChatOptionsDropdown from "./ChatOptionsDropdown";

import { BubbleConversationChatIcon } from "@/components/Misc/icons";

interface ChatTabProps {
  name: string;
  id: string;
  starred: boolean;
}

export const ChatTab: FC<ChatTabProps> = ({ name, id, starred }) => {
  const navigate = useNavigate();
  const [currentConvoId, setCurrentConvoId] = useState<string | null>(null);
  const location = useLocation();
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    const pathParts = location.pathname.split("/");

    setCurrentConvoId(pathParts[pathParts.length - 1]);
  }, [location.pathname]);

  return (
    <div
      className="relative flex"
      onMouseOut={() => setButtonHovered(false)}
      onMouseOver={() => setButtonHovered(true)}
    >
      <Button
        className={`w-full flex justify-start pr-0 pl-2 h-[35px] min-h-[35px] font-normal duration-0 hover:bg-white/10 bg-transparent ${
          currentConvoId === id ? "text-primary" : "text-white"
        }`}
        onClick={() => {
          setButtonHovered(false);
          navigate(`/try/chat/${id}`);
        }}
      >
        <div className="flex items-center gap-2 w-full">
          {starred ? (
            <Star
              className="min-w-[17px] w-[17px]"
              color={currentConvoId === id ? "#00bbff" : "#9b9b9b"}
              width="19"
            />
          ) : (
            <BubbleConversationChatIcon
              className="min-w-[17px] w-[17px]"
              color={currentConvoId === id ? "#00bbff" : "#9b9b9b"}
              width="19"
            />
          )}
          <span className="truncate w-[200px] text-left">
            {name.replace('"', "")}
          </span>
        </div>
      </Button>

      <div className="absolute right-0">
        <ChatOptionsDropdown
          buttonHovered={buttonHovered}
          chatId={id}
          chatName={name}
          starred={starred}
        />
      </div>
    </div>
  );
};
