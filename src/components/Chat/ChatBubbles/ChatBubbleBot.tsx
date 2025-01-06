import { ChatBubbleBotProps } from "@/types/ChatBubbleTypes";
import { Chip } from "@nextui-org/chip";
import { Skeleton } from "@nextui-org/skeleton";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { parseDate } from "../../../utils/fetchDate";
import { Alert01Icon } from "../../icons";
import {
  ChatBubble_Actions,
  ChatBubble_Actions_Image,
} from "./ChatBubble_Actions";
import SuspenseLoader from "@/components/SuspenseLoader";
const MarkdownRenderer = lazy(() => import("../MarkdownRenderer"));

export default function ChatBubbleBot({
  index,
  text,
  loading = false,
  isImage = false,
  image = null,
  disclaimer,
  date,
  imagePrompt,
  userinputType,
}: ChatBubbleBotProps) {
  const [component, setComponent] = useState<JSX.Element>(<></>);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isImage) {
      setComponent(
        <>
          <div className="chat_bubble bg-zinc-800 ">
            <div className="text-sm font-medium w-full flex justify-start items-flex-start flex-col gap-2 flex-wrap max-w-[350px] my-1">
              <span>{text}</span>
              <Skeleton
                isLoaded={!loading && !imageLoaded && !!image}
                className="rounded-3xl my-2 max-w-[250px] min-w-[250px] 
                max-h-[250px] min-h-[250px] 
                aspect-square"
              >
                <img
                  src={image as string}
                  width={"250px"}
                  height={"250px"}
                  className="rounded-3xl my-2"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                />
              </Skeleton>

              {imagePrompt && (
                <div className="flex gap-1 justify-start flex-wrap max-w-[250px]">
                  {imagePrompt?.split(",").map((keyword, index) => (
                    <Chip
                      key={index}
                      color="default"
                      size="sm"
                      radius="md"
                      className="text-wrap min-h-fit py-1"
                    >
                      {keyword.trim()}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </div>
          {date && (
            <span className="text-xs text-white text-opacity-40 flex flex-col select-text pt-1">
              {parseDate(date)}
            </span>
          )}
        </>
      );
    } else {
      setComponent(
        <>
          <div className="chat_bubble bg-zinc-800">
            <div className="flex flex-col gap-3">
              {/* TODO: Update this suspense to be a skeleton */}
              <Suspense fallback={<SuspenseLoader />}>
                <MarkdownRenderer content={text.toString()} />
              </Suspense>

              {!!disclaimer && (
                <Chip
                  size="sm"
                  className="text-xs font-medium text-foreground-700"
                  startContent={<Alert01Icon height="17" />}
                >
                  {disclaimer}
                </Chip>
              )}
            </div>
          </div>
          {date && (
            <span className="text-xs text-white text-opacity-40 flex flex-col select-text p-1">
              {parseDate(date)}
            </span>
          )}
        </>
      );
    }
  }, [isImage, text, image, date, userinputType, disclaimer, loading]);

  const actionsRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    if (actionsRef.current) {
      actionsRef.current.style.opacity = "1";
      actionsRef.current.style.visibility = "visible";
    }
  };

  const handleMouseOut = () => {
    if (actionsRef.current) {
      actionsRef.current.style.opacity = "0";
      actionsRef.current.style.visibility = "hidden";
    }
  };

  return (
    (!!text || loading || isImage) && (
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className="chatbubblebot_parent">
          {/* <Avatar src={smiley} className="smiley_avatar" />{" "} */}

          <div className="chat_bubble_container ">{component}</div>
        </div>

        {!loading && (
          <div
            className="transition-all"
            ref={actionsRef}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            {isImage ? (
              <ChatBubble_Actions_Image
                src={image as string}
                imagePrompt={imagePrompt}
              />
            ) : (
              <ChatBubble_Actions loading={loading} text={text} index={index} />
            )}
          </div>
        )}
      </div>
    )
  );
}
