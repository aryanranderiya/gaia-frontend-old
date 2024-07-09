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
import "ldrs/jelly";

export function ChatBubbleUser({ text, subtype = null, file = null }) {
  return (
    (!!text || !!file) && (
      <div className="chat_bubble_container user">
        <div className="chat_bubble user">
          {!!text && !file && (
            <div className="flex select-text text-wrap max-w-[30vw]">
              {text}
            </div>
          )}

          {subtype === "image" && (
            <>
              <span className="font-medium">Uploaded Image</span>

              <div className="mb-1">
                <img
                  src={file}
                  width={"250px"}
                  height={"250px"}
                  content-type="image/png"
                  className="rounded-2xl mt-3"
                />
              </div>

              <Chip color="default" size="sm">
                {text}
              </Chip>
            </>
          )}
        </div>

        {subtype === "pdf" && (
          <div className="mb-5">
            <PdfContainer file={file} chat_bubble={true} />
          </div>
        )}
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
}) {
  const ComponentIfImage = () => (
    <>
      <div className="chat_bubble bg-zinc-800">
        <div className="text-md font-medium w-full flex justify-start items-flex-start flex-col gap-2 flex-wrap max-w-[350px] my-1">
          <span>Here is your generated image:</span>

          <img
            src={image}
            width={"250px"}
            height={"250px"}
            content-type="image/png"
            className="rounded-3xl my-2"
          />

          <div className="flex gap-1 justify-center flex-wrap">
            {text.split(",").map((keyword) => (
              <Chip color="default" size="sm">
                {keyword.trim()}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      <ChatBubble_Actions_Image src={image} />
    </>
  );

  const ComponentsIfNotImage = () => (
    <>
      <div className="chat_bubble bg-zinc-800">
        {loading ? (
          <l-jelly size="30" speed="0.6" color="#00bbff" />
        ) : (
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
        )}
      </div>

      <ChatBubble_Actions
        loading={loading}
        text={text}
        setConversationHistory={setConversationHistory}
        conversationHistory={conversationHistory}
        index={index}
      />
    </>
  );

  return (
    (!!text || loading || isImage) && (
      <div className="chatbubblebot_parent ">
        <Avatar src={smiley} size="md" className="smiley_avatar" />
        <div className="chat_bubble_container ">
          {isImage ? <ComponentIfImage /> : <ComponentsIfNotImage />}
        </div>
      </div>
    )
  );
}
