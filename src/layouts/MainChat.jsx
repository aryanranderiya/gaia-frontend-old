import MainSearchbar from "../components/Chat/MainSearchbar";
import StarterText from "../components/Chat/StarterText";
import StarterEmoji from "../components/Chat/StarterEmoji";
import CloseOpenSidebarBtn from "../components/Sidebar/CloseOpenSidebar";
import { GlobalIcon, ChatBotIcon, Task01Icon } from "../components/icons";
import { toast } from "sonner";
import { ScrollArea } from "../components/ScrollArea";

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

export function ChatBubbleBot({ text }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      unstyled: true,
      classNames: {
        toast: "flex items-center p-3 rounded-xl gap-3 w-[300px] ",
        title: "text-white text-sm",
        description: "text-sm text-gray-400",
      },
      duration: 3000,
      description: `${text.substring(0, 35)}...`,
      icon: <Task01Icon height="23" />,
    });
  };

  return (
    !!text && (
      <div className="flex items-center gap-3">
        <div className="chatbubble_bot_avatar">
          <ChatBotIcon color="white" />
        </div>
        <div className="chat_bubble_container ">
          <div className="chat_bubble">{text}</div>
          <div className="flex p-2">
            <Task01Icon
              height="19"
              onClick={copyToClipboard}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    )
  );
}

export default function MainChat({ toggleSidebar, hideSidebar, mainChatRef }) {
  return (
    <div className="main_chat" onClick={hideSidebar} ref={mainChatRef}>
      <div className="chat_sidebar_toggle_btn">
        <CloseOpenSidebarBtn toggleSidebar={toggleSidebar} />
      </div>

      <WebsiteName />

      {/* 
      <div className="starter_container">
         <StarterEmoji /> 
        <StarterText />
      </div>
       */}

      <ScrollArea>
        <div className="flex justify-center w-full items-center">
          <div className="conversation_history">
            <ChatBubbleUser text={"hey my name is aryan"} />
            <ChatBubbleBot
              text={"Hey! I am gaia, your personal AI assistant"}
            />
            <ChatBubbleBot
              text={`
          Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.`}
            />
            <ChatBubbleUser text={":)"} />
            <ChatBubbleUser text={":)"} />
            <ChatBubbleUser text={":)"} />
            <ChatBubbleUser text={":)"} />
          </div>
        </div>
      </ScrollArea>

      <MainSearchbar />
    </div>
  );
}
