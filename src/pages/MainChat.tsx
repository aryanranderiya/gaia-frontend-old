// MainChat.tsx
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/Shadcn/ScrollArea";
import MainSearchbar from "@/components/Chat/MainSearchbar";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import ChatRenderer from "@/components/Chat/ChatRenderer";
import { useConversation } from "@/hooks/useConversation";

export default function MainChat() {
  const { convoIdParam } = useParams<{ convoIdParam: string }>();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const convoRef = useRef<HTMLDivElement>(null);
  const [searchbarText, setSearchbarText] = useState<string>("");

  const { loading, data, updateConversation } = useConversation(
    convoIdParam ?? null
  );
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

  useEffect(() => {
    convoRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [convoMessages, data]);

  return (
    <>
      <ScrollArea>
        <div className="conversation_history" ref={convoRef}>
          <ChatRenderer convoMessages={convoMessages} />
          {loading && (
            <ChatRenderer
              convoMessages={[
                {
                  type: "bot",
                  response: data.join(""),
                  loading: true,
                  date: "",
                },
              ]}
            />
          )}
        </div>
      </ScrollArea>

      <MainSearchbar
        loading={loading}
        inputRef={inputRef}
        handleFormSubmit={handleFormSubmit}
        searchbarText={searchbarText}
        setSearchbarText={setSearchbarText}
      />
    </>
  );
}
