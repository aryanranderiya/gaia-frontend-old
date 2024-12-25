import ChatRenderer from "@/components/Chat/ChatRenderer";
import MainSearchbar from "@/components/Chat/MainSearchbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import debounce from "lodash.debounce"; // Import debounce function
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const MainChat = React.memo(function MainChat() {
  const convoRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const location = useLocation();

  const handleScroll = debounce((event: React.UIEvent) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.target as HTMLElement;
    const threshold = 1;

    setIsAtBottom(scrollHeight - scrollTop <= clientHeight + threshold);
  }, 100);

  const scrollToBottom = () => {
    if (convoRef.current) {
      convoRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    return () => {
      handleScroll.cancel();
    };
  }, [handleScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [location.pathname]);

  return (
    <>
      <ScrollArea onScrollCapture={handleScroll}>
        <div className="conversation_history" ref={convoRef}>
          <ChatRenderer />
        </div>
      </ScrollArea>
      <MainSearchbar
        scrollToBottom={scrollToBottom}
        isAtBottom={isAtBottom}
        isOverflowing={false}
      />
    </>
  );
});

export default MainChat;
