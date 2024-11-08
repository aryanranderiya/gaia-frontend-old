// MainChat.tsx
import ChatRenderer from "@/components/Chat/ChatRenderer";
import MainSearchbar from "@/components/Chat/MainSearchbar";
import { ScrollArea } from "@/components/Shadcn/ScrollArea";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { useConversation } from "@/hooks/useConversation";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function MainChat() {
  const { convoIdParam } = useParams<{ convoIdParam: string }>();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const convoRef = useRef<HTMLDivElement>(null);
  const [searchbarText, setSearchbarText] = useState<string>("");

  const { loading, updateConversation } = useConversation(convoIdParam ?? null);
  const { convoMessages } = useConvo();

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!searchbarText) return;
    updateConversation(searchbarText);
    setSearchbarText("");
    focusInput();
  };

  const scrollToBottom = () => {
    convoRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  // useEffect(() => {
  // }, [convoMessages]);

  return (
    <>
      <ScrollArea>
        <div className="conversation_history" ref={convoRef}>
          <ChatRenderer convoMessages={convoMessages} />
        </div>
      </ScrollArea>

      <MainSearchbar
        loading={loading}
        inputRef={inputRef}
        handleFormSubmit={handleFormSubmit}
        searchbarText={searchbarText}
        setSearchbarText={setSearchbarText}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
}
