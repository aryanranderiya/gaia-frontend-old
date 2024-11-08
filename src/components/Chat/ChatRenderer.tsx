// ChatRenderer.tsx
import { ChatBubbleBot, ChatBubbleUser } from "@/components/Chat/ChatBubbles";
import StarterEmoji from "@/components/Chat/StarterEmoji";
import StarterText from "@/components/Chat/StarterText";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { useEffect } from "react";

export default function ChatRenderer() {
  const { convoMessages } = useConvo();

  if (convoMessages.length === 0) {
    return (
      <div className="starter_container">
        <StarterEmoji />
        <StarterText />
      </div>
    );
  }

  useEffect(() => {
    console.log(convoMessages);
  }, [convoMessages]);

  return (
    <>
      {convoMessages.map((message, index) =>
        message.type === "bot" ? (
          <div className="relative flex items-end gap-3" key={index}>
            <div className="pingspinner relative bottom-9" />

            <ChatBubbleBot
              text={message.response}
              loading={message.loading}
              index={index}
              isImage={message.isImage}
              imagePrompt={message.imagePrompt}
              image={message.imageUrl}
              disclaimer={message.disclaimer}
              userinputType={message.userinputType}
              date={message.date}
            />
          </div>
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
}
