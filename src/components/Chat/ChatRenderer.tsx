// ChatRenderer.tsx
import { Suspense } from "react";
import StarterText from "@/components/Chat/StarterText";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import SuspenseLoader from "../SuspenseLoader";
import ChatBubbleBot from "@/components/Chat/ChatBubbles/ChatBubbleBot";
import ChatBubbleUser from "@/components/Chat/ChatBubbles/ChatBubbleUser";

export default function ChatRenderer() {
  const { convoMessages } = useConvo();

  if (!!convoMessages && convoMessages?.length === 0) {
    return (
      <div className="starter_container">
        {/* <StarterEmoji /> */}
        <StarterText />
      </div>
    );
  }

  return (
    <>
      {convoMessages?.map((message, index) =>
        message.type === "bot" ? (
          <div className="relative flex items-end gap-3" key={index}>
            <div className="pingspinner relative bottom-9" />

            <Suspense fallback={<SuspenseLoader />}>
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
            </Suspense>
          </div>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <ChatBubbleUser
              key={index}
              text={message.response}
              subtype={message.subtype || null}
              file={message.file || null}
              filename={message.filename}
              date={message.date}
            />
          </Suspense>
        )
      )}
    </>
  );
}
