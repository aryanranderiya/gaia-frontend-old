import { PlusSignIcon } from "@/components/icons";
import { useConversationList } from "@/contexts/ConversationList";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Button } from "@nextui-org/button";
import { isToday, isYesterday, subDays } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChatTab } from "./ChatTab";

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

// Assign a priority value to each time frame
const timeFramePriority = (timeFrame: string): number => {
  switch (timeFrame) {
    case "Today":
      return 0;
    case "Yesterday":
      return 1;
    case "Previous 7 days":
      return 2;
    case "Previous 30 days":
      return 3;
    case "All time":
      return 4;
    default:
      return 5; // Catch-all for unexpected cases
  }
};

export default function ChatsList() {
  const navigate = useNavigate();
  const { resetMessages } = useConvo();
  const { conversations, fetchConversations } = useConversationList();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true);
      try {
        await fetchConversations();
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const createNewChat = (): void => {
    navigate(`/try/chat/`);
    resetMessages();
  };

  const groupedConversations = conversations.reduce((acc, conversation) => {
    const timeFrame = getTimeFrame(conversation.createdAt);
    if (!acc[timeFrame]) {
      acc[timeFrame] = [];
    }
    acc[timeFrame].push(conversation);
    return acc;
  }, {} as Record<string, any[]>);

  // Sort the time frames based on the priority values
  const sortedTimeFrames = Object.entries(groupedConversations).sort(
    ([timeFrameA], [timeFrameB]) =>
      timeFramePriority(timeFrameA) - timeFramePriority(timeFrameB)
  );

  const starredConversations = conversations.filter(
    (conversation) => conversation.starred
  );

  return (
    <div className="pt-0 p-4">
      <Button
        className="w-full flex justify-between mt-2 font-medium"
        onPress={createNewChat}
        size="md"
        color="primary"
        // variant="flat"
        variant={location.pathname === "/try/chat" ? "flat" : "solid"}
        // color={location.pathname === "/try/chat" ? "primary" : "default"}
      >
        Create new chat
        <PlusSignIcon width="21" color="foreground" />
      </Button>

      <div className="flex flex-col gap-1 max-h-[80vh] relative">
        {isLoading ? (
          <div className="flex items-center justify-center p-10">
            {/* <Spinner /> */}
            <Loader className="animate-spin text-[#00bbff]" />
          </div>
        ) : (
          <>
            {/* <div className="bg-zinc-700 rounded-lg min-h-4"> */}
            <div className="bg-zinc-900 min-h-[75px] pt-3 pb-1 mt-4 flex items-start justify-start rounded-lg flex-col overflow-hidden w-full">
              <div className="font-medium text-xs flex items-center gap-1 px-3 pb-1">
                Starred Chats
              </div>
              <div className="flex w-full px-1 flex-col">
                {starredConversations.length > 0 ? (
                  starredConversations.map(
                    (conversation: {
                      conversation_id: string;
                      description: string;
                      starred?: boolean;
                    }) => (
                      <ChatTab
                        key={conversation.conversation_id}
                        id={conversation.conversation_id}
                        name={conversation.description || "New Chat"}
                        starred={conversation.starred || false}
                      />
                    )
                  )
                ) : (
                  <div className="text-xs text-center text-foreground-500 pt-2 pb-3">
                    No Starred Chats yet.
                  </div>
                )}
              </div>
            </div>

            {sortedTimeFrames.map(([timeFrame, conversationsGroup]) => (
              <div key={timeFrame}>
                <div className="font-medium px-2 text-xs pt-5 sticky top-0 bg-black z-[1]">
                  {timeFrame}
                </div>
                {conversationsGroup
                  .sort(
                    (a: { createdAt: string }, b: { createdAt: string }) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map(
                    (conversation: {
                      conversation_id: string;
                      starred: boolean;
                      description: string;
                    }) => (
                      <ChatTab
                        key={conversation.conversation_id}
                        id={conversation.conversation_id}
                        name={conversation.description || "New Chat"}
                        starred={conversation.starred}
                      />
                    )
                  )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
