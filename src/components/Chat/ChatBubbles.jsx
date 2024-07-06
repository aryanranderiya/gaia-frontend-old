import { Spinner } from "@nextui-org/spinner";
import { Avatar } from "@nextui-org/avatar";
import smiley from "../Smileys/2.webp";
import Markdown from "markdown-to-jsx";
import ChatBubble_Actions from "./ChatBubble_Actions";
import { PdfContainer } from "../Documents/PdfComponent";

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
            <div className="chat_bubble  bg-zinc-600">
              <img
                src={image}
                width={"200 px"}
                height={"200px"}
                content-type="image/png"
                className="rounded-3xl my-2"
              />
            </div>
          ) : (
            <>
              <div className="chat_bubble bg-zinc-600">
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
