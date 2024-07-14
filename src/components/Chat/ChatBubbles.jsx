import { Avatar } from "@nextui-org/avatar";
import smiley from "../Smileys/2.webp";
import { Alert01Icon } from "../icons";
import Markdown from "markdown-to-jsx";
import {
  ChatBubble_Actions,
  ChatBubble_Actions_Image,
} from "./ChatBubble_Actions";
import { PdfContainer } from "../Documents/PdfComponent";
import { Chip } from "@nextui-org/chip";
import * as React from "react";
export function ChatBubbleUser({
  text,
  subtype = null,
  file = null,
  filename,
  date,
}) {
  return (
    (!!text || !!file) && (
      <div className="chat_bubble_container user">
        <div className="chat_bubble user">
          {!!text && (
            <div className="flex select-text text-wrap max-w-[30vw]">
              {text}
            </div>
          )}

          {subtype === "image" && (
            <div className="flex flex-col items-center gap-2 max-w-[250px] whitespace-nowrap text-ellipsis overflow-hidden">
              <img
                src={file}
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

          {subtype === "pdf" && <PdfContainer file={file} chat_bubble={true} />}
        </div>
        <div className="flex justify-end">
          <span className="text-xs text-white text-opacity-45 flex flex-col select-text pt-[2px]">
            {date}
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
  setConversationHistory,
  conversationHistory,
  disclaimer,
  date,
  userinputType,
}) {
  const [component, setComponent] = React.useState(<></>);
  React.useEffect(() => {
    if (isImage)
      setComponent(
        <>
          <div className="chat_bubble bg-zinc-800">
            <div className="text-sm font-medium w-full flex justify-start items-flex-start flex-col gap-2 flex-wrap max-w-[350px] my-1">
              <span>Here is your generated image:</span>

              <img
                src={image}
                width={"250px"}
                height={"250px"}
                content-type="image/png"
                className="rounded-3xl my-2"
              />

              <div className="flex gap-1 justify-start flex-wrap max-w-[250px]">
                {text.split(",").map((keyword) => (
                  <Chip color="default" size="sm">
                    {keyword.trim()}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
          <span className="text-xs text-white text-opacity-40 flex flex-col select-text pt-1">
            {date}
          </span>
        </>
      );
    else if (userinputType === "generate_image")
      setComponent(<div className="chat_bubble bg-zinc-800"></div>);
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
            {date}
          </span>
        </>
      );
  }, [isImage, text, image, date, userinputType, disclaimer]);

  const actionsRef = React.useRef(null);
  const handleMouseOver = () => {
    if (loading) return;
    actionsRef.current.style.opacity = 1;
    actionsRef.current.style.visibility = "visible";
  };

  const handleMouseOut = () => {
    actionsRef.current.style.opacity = 0;
    actionsRef.current.style.visibility = "hidden";
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

        <div
          className="pl-12 transition-all"
          ref={actionsRef}
          style={{ opacity: 0 }}
        >
          {isImage ? (
            <ChatBubble_Actions_Image src={image} />
          ) : (
            <ChatBubble_Actions
              loading={loading}
              text={text}
              setConversationHistory={setConversationHistory}
              conversationHistory={conversationHistory}
              index={index}
            />
          )}
        </div>
      </div>
    )
  );
}
