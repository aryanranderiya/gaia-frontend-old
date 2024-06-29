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

export function ChatBubbleBot({ text, loading = false }) {
  return (
    !!text && (
      <div className="chatbubblebot_parent ">
        <Avatar src={smiley} size="md" className="smiley_avatar" />
        <div className="chat_bubble_container ">
          <div className="chat_bubble bg-zinc-600">
            {loading ? (
              <Spinner size="sm" color="primary" />
            ) : (
              <Markdown className="select-text">{text}</Markdown>
            )}
          </div>
          <ChatBubble_Actions loading={loading} text={text} />
        </div>
      </div>
    )
  );
}
