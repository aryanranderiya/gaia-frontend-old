// ChatRenderer.tsx
import ChatBubbleBot from "@/components/Chat/ChatBubbles/ChatBubbleBot";
import ChatBubbleUser from "@/components/Chat/ChatBubbles/ChatBubbleUser";
import StarterText from "@/components/Chat/StarterText";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Suspense, useState } from "react";
import SuspenseLoader from "../SuspenseLoader";
import { ChatBubble_Actions_Image } from "./ChatBubbles/ChatBubble_Actions";

export default function ChatRenderer() {
  const { convoMessages } = useConvo();
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [imageData, setImageData] = useState({
    src: "",
    prompt: "",
    improvedPrompt: "",
  });

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
      <Dialog onOpenChange={setOpenImage} open={openImage}>
        <DialogContent className="!rounded-3xl bg-zinc-800 border-none text-white flex items-center flex-col min-w-fit">
          <img
            src={imageData?.src}
            width={"auto"}
            height={"auto"}
            className="rounded-3xl my-2 size-[80vh] min-w-[70vh] min-h-[70vh] aspect-square"
          />
          <ChatBubble_Actions_Image
            src={imageData?.src}
            imagePrompt={imageData?.prompt}
            fullWidth
            setOpenImage={setOpenImage}
          />
        </DialogContent>
      </Dialog>

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
                imageSrc={message.imageUrl}
                disclaimer={message.disclaimer}
                userinputType={message.userinputType}
                date={message.date}
                setOpenImage={setOpenImage}
                setImageData={setImageData}
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
