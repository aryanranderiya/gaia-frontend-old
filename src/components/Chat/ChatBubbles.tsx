import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import Markdown from "markdown-to-jsx";
import { useEffect, useRef, useState } from "react";
import { PdfContainer } from "../Documents/PdfComponent";
import smiley from "../Smileys/2.webp";
import { Alert01Icon } from "../icons";
import {
  ChatBubble_Actions,
  ChatBubble_Actions_Image,
} from "./ChatBubble_Actions";
import { parseDate } from "./fetchDate";
import { DateType } from "@/contexts/ConversationHistory";

// Define interfaces for component props
interface ChatBubbleUserProps {
  text?: string;
  subtype?: "image" | "pdf" | null;
  file?: File | null | string;
  filename?: string;
  date: string | DateType;
}

interface ChatBubbleBotProps {
  index: number;
  text: string;
  loading?: boolean;
  isImage?: boolean;
  image?: string | null;
  disclaimer?: string;
  date: string | DateType;
  userinputType?: string;
}

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
          <span className="text-xs text-white text-opacity-45 flex flex-col select-text pt-[2px]">
            {parseDate(date)}
          </span>
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
  userinputType,
}: ChatBubbleBotProps) {
  const [component, setComponent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if (loading) return;
    if (isImage)
      setComponent(
        <>
          <div className="chat_bubble bg-zinc-800">
            <div className="text-sm font-medium w-full flex justify-start items-flex-start flex-col gap-2 flex-wrap max-w-[350px] my-1">
              <span>Here is your generated image:</span>

              <img
                src={image as string}
                width={"250px"}
                height={"250px"}
                content-type="image/png"
                className="rounded-3xl my-2"
              />

              <div className="flex gap-1 justify-start flex-wrap max-w-[250px]">
                {text.split(",").map((keyword, index) => (
                  <Chip key={index} color="default" size="sm">
                    {keyword.trim()}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
          <span className="text-xs text-white text-opacity-40 flex flex-col select-text pt-1">
            {parseDate(date)}
          </span>
        </>
      );
    else if (userinputType === "generate_image")
      setComponent(<div className="chat_bubble bg-zinc-800"></div>); //!TODO
    else
      setComponent(
        <>
          <div className="chat_bubble bg-zinc-800">
            <div className="flex flex-col gap-3">
              <Markdown className="select-text">{text.toString()}</Markdown>

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

          <span className="text-xs text-white text-opacity-40 flex flex-col select-text p-1">
            {parseDate(date)}
          </span>
        </>
      );
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
          <Avatar src={smiley} className="smiley_avatar" />

          {loading ? (
            <div className="pingspinner" />
          ) : (
            <div className="chat_bubble_container ">{component}</div>
          )}
        </div>

        {!loading && (
          <div
            className="pl-12 transition-all"
            ref={actionsRef}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            {isImage ? (
              <ChatBubble_Actions_Image src={image as string} />
            ) : (
              <ChatBubble_Actions loading={loading} text={text} index={index} />
            )}
          </div>
        )}
      </div>
    )
  );
}
