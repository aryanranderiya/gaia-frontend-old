// ChatRenderer.tsx
import ChatBubbleBot from "@/components/Chat/ChatBubbles/ChatBubbleBot";
import ChatBubbleUser from "@/components/Chat/ChatBubbles/ChatBubbleUser";
import StarterText from "@/components/Chat/StarterText";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { ArrowUpRight } from "lucide-react";
import { Suspense, useState } from "react";
import {
  BlushBrush02Icon,
  Calendar01Icon,
  DocumentAttachmentIcon,
  FlowchartIcon,
  GlobalSearchIcon,
  Mic01Icon,
  Route02Icon,
  StickyNote01Icon,
} from "../icons";
import SuspenseLoader from "../SuspenseLoader";
import { ScrollArea } from "../ui/scroll-area";
import { ChatBubble_Actions_Image } from "./ChatBubbles/ChatBubble_Actions";
import StarterEmoji from "./StarterEmoji";

const badges = [
  {
    variant: "secondary",
    bgClass: "bg-purple-500 hover:bg-purple-500",
    textClass: "text-purple-500",
    icon: (
      <FlowchartIcon
        width={17}
        className="text-purple-500 group-hover:text-white transition-colors"
      />
    ),
    text: "Generate Flowcharts",
  },
  {
    variant: "secondary",
    bgClass: "bg-emerald-500 hover:bg-emerald-500",
    textClass: "text-emerald-500",
    icon: (
      <BlushBrush02Icon
        width={17}
        className="text-emerald-500 group-hover:text-white transition-colors"
      />
    ),
    text: "Generate Image",
  },
  {
    variant: "secondary",
    bgClass: "bg-orange-500 hover:bg-orange-500",
    textClass: "text-orange-500",
    icon: (
      <Mic01Icon
        width={17}
        className="text-orange-500 group-hover:text-white transition-colors"
      />
    ),
    text: "Voice Conversation",
  },
  {
    variant: "secondary",
    bgClass: "bg-blue-500 hover:bg-blue-500",
    textClass: "text-blue-500",
    icon: (
      <GlobalSearchIcon
        width={17}
        className="text-blue-500 group-hover:text-white transition-colors"
      />
    ),
    text: "Internet Search",
  },
  {
    variant: "secondary",
    bgClass: "bg-lime-500 hover:bg-lime-500",
    textClass: "text-lime-500",
    icon: (
      <ArrowUpRight
        width={17}
        className="text-lime-500 group-hover:text-white transition-colors"
      />
    ),
    text: "Fetch Webpage",
  },
  {
    variant: "secondary",
    bgClass: "bg-red-500 hover:bg-red-500",
    textClass: "text-red-500",
    icon: (
      <Calendar01Icon
        width={17}
        className="text-red-500 group-hover:text-white transition-colors"
      />
    ),
    text: "Manage Calendar",
  },
  {
    variant: "secondary",
    bgClass: "bg-cyan-500 hover:bg-cyan-500",
    textClass: "text-cyan-500",
    icon: (
      <StickyNote01Icon
        width={17}
        className="text-cyan-500 group-hover:text-white transition-colors"
      />
    ),
    text: "Store Memories",
  },
  {
    variant: "secondary",
    bgClass: "bg-pink-500 hover:bg-pink-500",
    textClass: "text-pink-500",
    icon: (
      <Route02Icon
        width={17}
        className="text-pink-500 group-hover:text-white transition-colors"
      />
    ),
    text: "Manage Goals",
  },
  {
    variant: "secondary",
    bgClass: "bg-yellow-500 hover:bg-yellow-500",
    textClass: "text-yellow-500",
    icon: (
      <DocumentAttachmentIcon
        width={17}
        className="text-yellow-500 group-hover:text-white transition-colors"
      />
    ),
    text: "Chat with Documents",
  },
];

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
          <div className="text-foreground-500 text-xs -mt-1 mb-1">
            I can do the following for you:
          </div>
          <div className="flex gap-2 flex-wrap max-w-[650px] justify-center">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant={badge.variant as "secondary" | "default" | "outline"}
                className={`${badge.bgClass} cursor-pointer bg-opacity-20 hover:bg-opacity-80 text-sm ${badge.textClass} font-medium hover:text-white group`}
              >
                <div className="flex items-center gap-1">
                  {badge.icon}
                  {badge.text}
                </div>
              </Badge>
            ))}
          </div>
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
            <div className="pingspinner relative bottom-9" />
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
              />
            </Suspense>
          </div>
        ) : (
          <Suspense fallback={<div>Loading...</div>} key={index}>
            <ChatBubbleUser
              key={index}
              text={message.response}
              subtype={message.subtype || null}
              file={message.file || null}
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
