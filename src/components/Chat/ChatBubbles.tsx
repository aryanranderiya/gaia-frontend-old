import {
  ChatBubbleBotProps,
  ChatBubbleUserProps,
} from "@/types/ChatBubbleTypes";
import { Chip } from "@nextui-org/chip";
import { useEffect, useRef, useState } from "react";
import { PdfContainer } from "../Documents/PdfComponent";
import { Alert01Icon } from "../icons";
import { parseDate } from "./fetchDate";
import { MarkdownRenderer } from "./MarkdownRenderer";
import {
  ChatBubble_Actions,
  ChatBubble_Actions_Image,
} from "./ChatBubble_Actions";
import { Skeleton } from "@nextui-org/skeleton";

export function ChatBubbleUser({
  text,
  subtype = null,
  file = null,
  filename,
  date,
}: ChatBubbleUserProps) {
  return (
    (!!text || !!file) && (
      <div className="chat_bubble_container user">
        <div className="chat_bubble user">
          {!!text && (
            <div className="flex select-text text-wrap max-w-[30vw]">
              {text}
            </div>
          )}

          {subtype === "image" && typeof file === "string" && (
            <div className="flex flex-col items-center gap-2 max-w-[250px] whitespace-nowrap text-ellipsis overflow-hidden">
              <img
                src={file} // Ensured this is a string by checking the type
                width={"250px"}
                height={"250px"}
                content-type="image/png"
                className="rounded-2xl mt-1"
              />
              {filename && (
                <Chip
                  color="default"
                  size="sm"
                  className="text-white bg-opacity-70 max-w-[250px]"
                >
                  {filename}
                </Chip>
              )}
            </div>
          )}

          {subtype === "pdf" && file instanceof File && (
            <PdfContainer file={file} chat_bubble={true} />
          )}
        </div>
        <div className="flex justify-end">
          {date && (
            <span className="text-xs text-white text-opacity-45 flex flex-col select-text pt-[2px]">
              {parseDate(date)}
            </span>
          )}
        </div>
      </div>
    )
  );
}

export function ChatBubbleBot({
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
              <MarkdownRenderer content={text.toString()} />
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
