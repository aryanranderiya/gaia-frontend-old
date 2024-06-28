import MainSearchbar from "../components/Chat/MainSearchbar";
import StarterText from "../components/Chat/StarterText";
import StarterEmoji from "../components/Chat/StarterEmoji";
import CloseOpenSidebarBtn from "../components/Sidebar/CloseOpenSidebar";
import {
  GlobalIcon,
  ChatBotIcon,
  Task01Icon,
  PinIcon,
} from "../components/icons";
import { toast } from "sonner";
import { ScrollArea } from "../components/ScrollArea";
import api from "axios";
import * as React from "react";
import { Spinner } from "@nextui-org/spinner";
import { Avatar } from "@nextui-org/avatar";
import smiley from "../components/Smileys/2.webp";
import Markdown from "markdown-to-jsx";
// import remarkGfm from "remark-gfm";

export function WebsiteName() {
  return (
    <div>
      <div className="flex gap-2 items-center pb-3 flex-col">
        <div className="flex gap-2">
          <GlobalIcon color="white" width="15" />
          <span>g.a.i.a</span>
        </div>
        <span className="text-gray-500 flex gap-1">
          Your
          <div>
            <span className="text-gray-400">G</span>
            eneral-purpose
          </div>
          <span className="text-gray-400">AI</span>
          <div>
            <span className="text-gray-400">A</span>
            ssistant
          </div>
        </span>
      </div>
    </div>
  );
}

export function ChatBubbleUser({ text }) {
  return (
    !!text && (
      <div className="chat_bubble_container user">
        <div className="chat_bubble user">{text}</div>
      </div>
    )
  );
}

export function ChatBubbleBot({ text, loading = false }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      unstyled: true,
      classNames: {
        toast: "flex items-center p-3 rounded-xl gap-3 w-[300px] toast",
        title: "text-black text-sm",
        description: "text-sm text-black",
      },
      duration: 3000,
      description: `${text.substring(0, 35)}...`,
      icon: <Task01Icon height="23" color="black" />,
    });
  };

  return (
    !!text && (
      <div className="chatbubblebot_parent">
        <Avatar src={smiley} size="md" className="smiley_avatar" />
        <div className="chat_bubble_container ">
          <div className="chat_bubble">
            {loading ? (
              <Spinner size="md" color="primary" />
            ) : (
              <Markdown>{text}</Markdown>
            )}
          </div>
          {!loading && (
            <div className="flex py-2 gap-1">
              <Task01Icon
                height="20"
                onClick={copyToClipboard}
                className="cursor-pointer"
              />

              <PinIcon height="20" className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default function MainChat({ toggleSidebar, hideSidebar, mainChatRef }) {
  const [conversationHistory, setConversationHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="main_chat" onClick={hideSidebar} ref={mainChatRef}>
      <div className="chat_sidebar_toggle_btn">
        <CloseOpenSidebarBtn toggleSidebar={toggleSidebar} />
      </div>

      <WebsiteName />

      <ScrollArea>
        <div className="flex justify-center w-full items-center">
          <div className="conversation_history">
            {!!conversationHistory && conversationHistory.length > 0 ? (
              conversationHistory.map((message) =>
                message.type === "bot" ? (
                  <ChatBubbleBot text={message.response} />
                ) : (
                  <ChatBubbleUser text={message.response} />
                )
              )
            ) : (
              <div className="starter_container">
                <StarterEmoji />
                <StarterText />
              </div>
            )}

            {loading && <ChatBubbleBot loading={loading} text={" "} />}
          </div>
        </div>
      </ScrollArea>

      <MainSearchbar
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
