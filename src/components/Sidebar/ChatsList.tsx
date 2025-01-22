import { PlusSignIcon } from "@/components/icons";
import { useConversationList } from "@/contexts/ConversationList";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatTab } from "./ChatTab";
import { format, isToday, isYesterday, subDays } from "date-fns";

// Function to determine time frame based on createdAt
const getTimeFrame = (dateString: string): string => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  const daysAgo7 = subDays(new Date(), 7);
  const daysAgo30 = subDays(new Date(), 30);

  if (date >= daysAgo7) {
    return "Previous 7 days";
  }

  if (date >= daysAgo30) {
    return "Previous 30 days";
  }

  return "All time";
};

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

  // Group conversations by time frame
  const groupedConversations = conversations.reduce((acc, conversation) => {
    const timeFrame = getTimeFrame(conversation.createdAt);
    if (!acc[timeFrame]) {
      acc[timeFrame] = [];
    }
    acc[timeFrame].push(conversation);
    return acc;
  }, {} as Record<string, any[]>);

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

      <div className="overflow-y-auto flex flex-col gap-1 py-1 max-h-[40vh]">
        {/* Iterate over grouped conversations */}
        {Object.entries(groupedConversations).map(
          ([timeFrame, conversationsGroup]) => (
            <div key={timeFrame}>
              <div className="font-medium px-2 text-xs pt-5">{timeFrame}</div>
              {conversationsGroup
                .sort(
                  (a: { createdAt: string }, b: { createdAt: string }) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map(
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
            </div>
          )
        )}
      </div>
    </div>
  );
}
