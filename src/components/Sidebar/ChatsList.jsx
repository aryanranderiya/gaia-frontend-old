import { ScrollArea } from "../Shadcn/ScrollArea";
import { PencilEdit02Icon } from "../icons";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

export function ChatTab() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="light"
        className="w-full flex justify-start"
        size="md"
        onClick={() => navigate("/")}
      >
        Chat 1
      </Button>
    </div>
  );
}

export default function ChatsList() {
  return (
    <div className="sidebar_inner">
      <Button variant="ghost" className="w-full flex justify-between">
        Create new chat
        <PencilEdit02Icon width="21" />
      </Button>

      <ScrollArea>
        <div className="chats_list">
          <ChatTab />
        </div>
      </ScrollArea>
    </div>
  );
}
