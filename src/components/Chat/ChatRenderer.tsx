// ChatRenderer.tsx
import ChatBubbleBot from "@/components/Chat/ChatBubbles/ChatBubbleBot";
import ChatBubbleUser from "@/components/Chat/ChatBubbles/ChatBubbleUser";
import StarterText from "@/components/Chat/StarterText";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { Suspense, useState } from "react";
import SuspenseLoader from "../SuspenseLoader";
import { ScrollArea } from "../ui/scroll-area";
import { ChatBubble_Actions_Image } from "./ChatBubbles/ChatBubble_Actions";
import { Chip } from "@nextui-org/chip";
import { Badge } from "@/components/ui/badge";
import {
  BlushBrush02Icon,
  Calendar01Icon,
  FlowchartIcon,
  GlobalSearchIcon,
  Mic01Icon,
  Route02Icon,
  StickyNote01Icon,
} from "../icons";
import { ArrowUpRight } from "lucide-react";

const badges = [
  {
    variant: "secondary",
    bgColor: "purple",
    textColor: "purple",
    icon: <FlowchartIcon width={17} className="text-white/60" />,
    text: "Generate Flowcharts",
  },
  {
    variant: "secondary",
    bgColor: "emerald",
    textColor: "emerald",
    icon: <BlushBrush02Icon width={17} className="text-white/60" />,
    text: "Generate Image",
  },
  {
    variant: "secondary",
    bgColor: "orange",
    textColor: "orange",
    icon: <Mic01Icon width={17} className="text-white/60" />,
    text: "Voice Conversation",
  },
  {
    variant: "secondary",
    bgColor: "blue",
    textColor: "blue",
    icon: <GlobalSearchIcon width={17} className="text-white/60" />,
    text: "Internet Search",
  },
  {
    variant: "secondary",
    bgColor: "primary",
    textColor: "blue",
    icon: <ArrowUpRight width={17} className="text-white/60" />,
    text: "Fetch Webpage",
  },
  {
    variant: "secondary",
    bgColor: "red",
    textColor: "red",
    icon: <Calendar01Icon width={17} className="text-white/60" />,
    text: "Manage Calendar",
  },
  {
    variant: "secondary",
    bgColor: "cyan",
    textColor: "cyan",
    icon: <StickyNote01Icon width={17} className="text-white/60" />,
    text: "Store Memories",
  },
  {
    variant: "secondary",
    bgColor: "pink",
    textColor: "pink",
    icon: <Route02Icon width={17} className="text-white/60" />,
    text: "Manage Goals",
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
          {/* <StarterEmoji /> */}
          <StarterText />
          <div className="flex gap-2 flex-wrap max-w-[600px] justify-center">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant={badge.variant as "secondary" | "default" | "outline"}
                className={`bg-${badge.bgColor}-500 cursor-pointer bg-opacity-30 bg hover:bg-${badge.bgColor}-500 hover:bg-opacity-80 text-sm text-${badge.bgColor}-500 font-medium hover:text-white`}
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

            <Suspense fallback={<SuspenseLoader />}>
              <ChatBubbleBot
                text={message.response}
                loading={message.loading}
                index={index}
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
