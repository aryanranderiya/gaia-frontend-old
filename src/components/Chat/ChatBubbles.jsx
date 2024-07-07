import { Spinner } from "@nextui-org/spinner";
import { Avatar } from "@nextui-org/avatar";
import smiley from "../Smileys/2.webp";
import Markdown from "markdown-to-jsx";
import {
  ChatBubble_Actions,
  ChatBubble_Actions_Image,
} from "./ChatBubble_Actions";
import { PdfContainer } from "../Documents/PdfComponent";
import { Chip } from "@nextui-org/chip";

export function ChatBubbleUser({ text, subtype = null, file = null }) {
  return (
    !!text && (
      <div className="chat_bubble_container user">
        <div className="chat_bubble user">
          <div className="flex select-text text-wrap max-w-[30vw]">{text}</div>
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
  text,
  loading = false,
  isImage = false,
  image = null,
}) {
  console.log("Test", image);
  console.log("test", isImage);

  return (
    (!!text || isImage) && (
      <div className="chatbubblebot_parent ">
        <Avatar src={smiley} size="md" className="smiley_avatar" />
        <div className="chat_bubble_container ">
          {isImage ? (
            <>
              <div className="chat_bubble bg-zinc-800">

                <div className="text-sm font-medium w-full flex justify-center items-center flex-col gap-2 flex-wrap max-w-[350px] mb-5">
                  <span>Generated Image</span>
                  <div className="flex gap-1 justify-center flex-wrap">
                    {text.split(",").map((keyword) => (
                      <Chip color="default" size="sm">
                        {keyword}
                      </Chip>
                    ))}
                  </div>
                </div>

                <img
                  src={image}
                  width={"350px"}
                  height={"350px"}
                  content-type="image/png"
                  className="rounded-3xl my-2"
                />
              </div>
              <ChatBubble_Actions_Image src={image} />
            </>
          ) : (
            <>
              <div className="chat_bubble bg-zinc-800">
                {loading ? (
                  <Spinner size="sm" color="primary" />
                ) : (
                  <Markdown className="select-text">{text}</Markdown>
                )}
              </div>
              <ChatBubble_Actions loading={loading} text={text} />
            </>
          )}
        </div>
      </div>
    )
  );
}
