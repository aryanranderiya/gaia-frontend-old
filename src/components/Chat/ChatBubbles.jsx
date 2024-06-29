import { Spinner } from "@nextui-org/spinner";
import { Avatar } from "@nextui-org/avatar";
import smiley from "../Smileys/2.webp";
import Markdown from "markdown-to-jsx";
import ChatBubble_Actions from "./ChatBubble_Actions";

export function ChatBubbleUser({ text }) {
  return (
    !!text && (
      <div className="chat_bubble_container user">
        <div className="chat_bubble user">
          <div className="flex">{text}</div>
        </div>
      </div>
    )
  );
}

export function ChatBubbleBot({ text, loading = false }) {
  return (
    !!text && (
      <div className="chatbubblebot_parent">
        <Avatar src={smiley} size="md" className="smiley_avatar" />
        <div className="chat_bubble_container ">
          <div className="chat_bubble">
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
