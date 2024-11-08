import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce"; // Import debounce function
import ChatRenderer from "@/components/Chat/ChatRenderer";
import MainSearchbar from "@/components/Chat/MainSearchbar";
import { ScrollArea } from "@/components/Shadcn/ScrollArea";

const MainChat = React.memo(function MainChat() {
  const convoRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = debounce((event: React.UIEvent) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.target as HTMLElement;
    const threshold = 1;
    console.log(scrollHeight - scrollTop);

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

  return (
    <>
      <ScrollArea onScrollCapture={handleScroll}>
        <div className="conversation_history" ref={convoRef}>
          <ChatRenderer />
        </div>
      </ScrollArea>
      <MainSearchbar scrollToBottom={scrollToBottom} isAtBottom={isAtBottom} />
    </>
  );
});

export default MainChat;
