// ChatRenderer.tsx
import React from "react";
import { ChatBubbleBot, ChatBubbleUser } from "@/components/Chat/ChatBubbles";
import StarterEmoji from "@/components/Chat/StarterEmoji";
import StarterText from "@/components/Chat/StarterText";
import { MessageType } from "@/types/ConvoTypes";

interface ChatRendererProps {
  convoMessages: MessageType[];
}

const ChatRenderer: React.FC<ChatRendererProps> = ({ convoMessages }) => {
  if (convoMessages.length === 0) {
    return (
      <div className="starter_container">
        <StarterEmoji />
        <StarterText />
      </div>
    );
  }

  return (
    <>
      {convoMessages.map((message, index) =>
        message.type === "bot" ? (
          <ChatBubbleBot
            key={index}
            text={message.response}
            loading={message.loading}
            index={index}
            isImage={message.isImage}
            image={message.imageUrl}
            disclaimer={message.disclaimer}
            userinputType={message.userinputType}
            date={message.date}
          />
        ) : (
          <ChatBubbleUser
            key={index}
            text={message.response}
            subtype={message.subtype || null}
            file={message.file || null}
            filename={message.filename}
            date={message.date}
          />
        )
      )}
    </>
  );
};

export default ChatRenderer;
