import { isToday, isYesterday, subDays } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";

import { ChatBubbleAddIcon } from "../Misc/icons";

import { ChatTab } from "./ChatTab";

import { useConvo } from "@/contexts/CurrentConvoMessages";
import { useConversationList } from "@/contexts/ConversationList";

const getTimeFrame = (dateString: string): string => {
  const date = new Date(dateString);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  const daysAgo7 = subDays(new Date(), 7);
  const daysAgo30 = subDays(new Date(), 30);

  if (date >= daysAgo7) return "Previous 7 days";
  if (date >= daysAgo30) return "Previous 30 days";

  return "All time";
};

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
      return 5;
  }
};

export default function ChatsList() {
  const { conversations, fetchConversations, paginationMeta } =
    useConversationList();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // We assume the provider auto-fetches the first page.
  // Once paginationMeta is available, we consider the initial load complete.
  useEffect(() => {
    if (paginationMeta) setLoading(false);
  }, [paginationMeta]);

  // Set up an IntersectionObserver to load more pages.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry.isIntersecting &&
          !isFetchingMore &&
          paginationMeta &&
          currentPage < paginationMeta.total_pages
        ) {
          setIsFetchingMore(true);
          // Always use a fixed limit (e.g. 10) and always append new results.
          fetchConversations(currentPage + 1, 20, true)
            .then(() => {
              setCurrentPage((prevPage) => prevPage + 1);
            })
            .catch((error) => {
              console.error("Failed to fetch more conversations", error);
            })
            .finally(() => {
              setIsFetchingMore(false);
            });
        }
      },
      {
        root: null, // viewport as container
        threshold: 1.0,
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [currentPage, isFetchingMore, paginationMeta, fetchConversations]);

  // Group conversations by time frame.
  const groupedConversations = conversations.reduce(
    (acc, conversation) => {
      const timeFrame = getTimeFrame(conversation.createdAt);

      if (!acc[timeFrame]) {
        acc[timeFrame] = [];
      }
      acc[timeFrame].push(conversation);

      return acc;
    },
    {} as Record<string, any[]>,
  );

  // Sort time frames by defined priority.
  const sortedTimeFrames = Object.entries(groupedConversations).sort(
    ([timeFrameA], [timeFrameB]) =>
      timeFramePriority(timeFrameA) - timeFramePriority(timeFrameB),
  );

  const starredConversations = conversations.filter(
    (conversation) => conversation.starred,
  );

  const navigate = useNavigate();
  const { resetMessages } = useConvo();

  const createNewChat = (): void => {
    navigate(`/c`);
    resetMessages();
  };

  return (
    <div className="pt-0 p-4">
      <div className="flex flex-col gap-1 max-h-[80vh] relative">
        {loading ? (
          <div className="flex items-center justify-center p-10">
            <Loader className="animate-spin text-[#00bbff]" />
          </div>
        ) : (
          <>
            <div className="mt-3 w-full">
              <Button
                className="w-full text-primary text-sm justify-start"
                color="primary"
                size="sm"
                variant="flat"
                onPress={createNewChat}
              >
                <ChatBubbleAddIcon color="#00bbff" width={18} />
                Create new chat
              </Button>
            </div>

            {/* Starred Chats Section */}
            <div className="bg-zinc-900 min-h-fit pt-3 pb-1 mt-2 flex items-start justify-start rounded-lg flex-col overflow-hidden w-full">
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
                    ),
                  )
                ) : (
                  <div className="text-xs text-center text-foreground-500 pt-2 pb-3">
                    No Starred Chats yet.
                  </div>
                )}
              </div>
            </div>

            {/* Grouped Conversations by Time Frame */}
            {sortedTimeFrames.map(([timeFrame, conversationsGroup]) => (
              <div key={timeFrame}>
                <div className="font-medium px-2 text-xs pt-5 sticky top-0 bg-black z-[1]">
                  {timeFrame}
                </div>
                {conversationsGroup
                  .sort(
                    (a: { createdAt: string }, b: { createdAt: string }) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
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
                    ),
                  )}
              </div>
            ))}
          </>
        )}

        {/* Sentinel element for the IntersectionObserver */}
        <div
          ref={loadMoreRef}
          className="p-2 h-[250px] flex justify-center items-center"
        >
          {isFetchingMore && <Loader className="animate-spin text-[#00bbff]" />}
        </div>
      </div>
    </div>
  );
}
