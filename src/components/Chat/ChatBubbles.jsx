import { Spinner } from "@nextui-org/spinner";
import { Avatar } from "@nextui-org/avatar";
import smiley from "../Smileys/2.webp";
import Markdown from "markdown-to-jsx";
import { Task01Icon, PinIcon, TranslateIcon, VoiceIcon } from "../icons";
import { toast } from "sonner";

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
        toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast",
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
              <Spinner size="sm" color="primary" />
            ) : (
              <Markdown className="select-text">{text}</Markdown>
            )}
          </div>
          {!loading && (
            <div className="flex py-2 gap-2">
              <Task01Icon
                height="22"
                onClick={copyToClipboard}
                className="cursor-pointer"
              />
              <PinIcon height="22" className="cursor-pointer" />
              <TranslateIcon height="22" className="cursor-pointer" />
              <VoiceIcon height="22" className="cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    )
  );
}
