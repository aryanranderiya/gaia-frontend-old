// ChatRenderer.tsx
import StarterText from "@/components/Chat/StarterText";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import React, { Suspense, useState } from "react";
import SuspenseLoader from "../SuspenseLoader";
import { ScrollArea } from "../ui/scroll-area";
import { ChatBubble_Actions_Image } from "./ChatBubbles/ChatBubble_Actions";
import StarterEmoji from "./StarterEmoji";

const ChatBubbleBot = React.lazy(
  () => import("@/components/Chat/ChatBubbles/ChatBubbleBot")
);
const ChatBubbleUser = React.lazy(
  () => import("@/components/Chat/ChatBubbles/ChatBubbleUser")
);

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
      <div className="flex items-center justify-center flex-1">
        <div className="flex items-center justify-center flex-col gap-2">
          <StarterEmoji />
          {/* <img
            src={"/gaialogo.png"}
            width={200}
            height={200}
            className="animate-bounce2"
          /> */}
          <StarterText />
        </div>
      </div>
    );
  }

  return (
    <>
      <Dialog onOpenChange={setOpenImage} open={openImage}>
        <DialogContent className="!rounded-3xl bg-zinc-800 border-none text-white flex items-center flex-col min-w-fit py-3 px-5">
          <img
            src={imageData?.src}
            width={"auto"}
            height={"auto"}
            className="rounded-3xl my-2 size-[65vh] min-w-[65vh] min-h-[65vh] aspect-square"
          />

          <div className="flex max-w-[65vh] min-w-[65vh] justify-evenly flex-col gap-1">
            {imageData?.prompt && (
              <div className="w-full bg-black/30 p-3 rounded-xl">
                <ScrollArea className="max-h-[50px]">
                  <div className="font-medium">Your Prompt:</div>

                  <div className="text-foreground-300 text-sm">
                    {imageData.prompt}
                  </div>
                </ScrollArea>
              </div>
            )}
            {imageData?.improvedPrompt && (
              <div className="w-full bg-black/30 p-3 rounded-xl">
                <ScrollArea className="h-[70px]">
                  <div className="font-medium">Improved Prompt:</div>

                  <div className="text-foreground-300 text-sm">
                    {imageData.improvedPrompt}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>

          <ChatBubble_Actions_Image
            src={imageData?.src}
            imagePrompt={imageData?.prompt}
            fullWidth
            setOpenImage={setOpenImage}
          />
        </DialogContent>
      </Dialog>

      {/* {openImage && (
        <SidebarProvider>
          <Sidebar side="right" variant="inset" className="z-10">
            <SidebarHeader />
            <SidebarContent>
              <SidebarGroup />
              <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
          </Sidebar>
        </SidebarProvider>
      )} */}

      {convoMessages?.map((message, index) =>
        message.type === "bot" ? (
          <div className="relative flex items-end gap-3" key={index}>
            <div
              className={`pingspinner relative ${
                message.loading ? "bottom-3" : "bottom-9"
              }`}
            />
            {/* <img
              src={"/gaialogo.png"}
              width={40}
              height={40}
              className={`${
                message.loading ? "animate-spin" : ""
              } relative bottom-9`}
            /> */}
            <Suspense fallback={<SuspenseLoader />}>
              <ChatBubbleBot
                text={message.response}
                loading={message.loading}
                isImage={message.isImage}
                imagePrompt={message.imagePrompt}
                improvedImagePrompt={message.improvedImagePrompt}
                searchWeb={message.searchWeb}
                imageSrc={message.imageUrl}
                disclaimer={message.disclaimer}
                userinputType={message.userinputType}
                date={message.date}
                pageFetchURL={message.pageFetchURL}
                setOpenImage={setOpenImage}
                setImageData={setImageData}
                filename={message.filename}
              />
            </Suspense>
          </div>
        ) : (
          <Suspense fallback={<div>Loading...</div>} key={index}>
            <ChatBubbleUser
              key={index}
              text={message.response}
              subtype={message.subtype || null}
              filename={message.filename}
              searchWeb={message.searchWeb}
              date={message.date}
              pageFetchURL={message.pageFetchURL}
            />
          </Suspense>
        )
      )}
    </>
  );
}
