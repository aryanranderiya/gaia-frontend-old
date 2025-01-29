import { parseDate2 } from "@/utils/fetchDate";
import { Chip } from "@heroui/chip";
import { Link } from "react-router-dom";
import { GlobeIcon, ArrowUpRight } from "lucide-react";
import { CommandItem } from "../ui/command";
import {
  BubbleChatIcon,
  BubbleConversationChatIcon,
  StickyNote01Icon,
} from "../icons";

interface SearchCardProps {
  result: any;
  type: "message" | "conversation" | "note";
  config?: {
    icon: React.ReactNode;
    linkTo: (result: any) => string;
    bodyContent: (result: any) => React.ReactNode;
    footerContent?: (result: any) => React.ReactNode;
  };
  className?: string;
}

const defaultConfigs = {
  message: {
    icon: (
      <BubbleChatIcon color="#9b9b9b" className="min-h-[22px] min-w-[22px]" />
    ),
    linkTo: (result: any) => `/try/chat/${result.conversation_id}`,
    bodyContent: (result: any) => (
      <>
        <div className="flex items-center gap-2">
          <Chip
            size="sm"
            color={result.message.type === "bot" ? "primary" : "default"}
          >
            {result.message.type === "bot" ? "From GAIA" : "From You"}
          </Chip>

          {result.message.searchWeb && (
            <Chip
              size="sm"
              startContent={<GlobeIcon height={20} color="#00bbff" />}
              variant="flat"
              color="primary"
            >
              Live Search Results from the Web
            </Chip>
          )}

          {!!result.message.pageFetchURL && (
            <Chip
              size="sm"
              startContent={<ArrowUpRight height={20} color="#00bbff" />}
              variant="flat"
              color="primary"
            >
              Fetched Webpage
            </Chip>
          )}
        </div>
        <CommandItem className="truncate w-full cursor-pointer data-[selected='true']:!bg-transparent !py-1 !px-0">
          {result.snippet}
        </CommandItem>
      </>
    ),
    footerContent: (result: any) => parseDate2(result.message.date),
  },
  conversation: {
    icon: (
      <BubbleConversationChatIcon
        color="#9b9b9b"
        className="min-h-[22px] min-w-[22px]"
      />
    ),
    linkTo: (result: any) => `/try/chat/${result.conversation_id}`,
    bodyContent: (result: any) => (
      <CommandItem className="truncate w-full cursor-pointer data-[selected='true']:!bg-transparent !py-1 !px-0">
        {result.description}
      </CommandItem>
    ),
    footerContent: undefined,
  },
  note: {
    icon: (
      <StickyNote01Icon color="#9b9b9b" className="min-h-[22px] min-w-[22px]" />
    ),
    linkTo: (result: any) => `/try/notes/${result.id}`,
    bodyContent: (result: any) => (
      <CommandItem className="truncate w-full cursor-pointer data-[selected='true']:!bg-transparent !py-1 !px-0">
        {result.snippet}
      </CommandItem>
    ),
    footerContent: undefined,
  },
};

export function SearchCard({
  result,
  type,
  config,
  className,
}: SearchCardProps) {
  const { icon, linkTo, bodyContent, footerContent } =
    config || defaultConfigs[type];

  return result.snippet || result.description || result.snippet ? (
    <Link
      key={
        type === "message" ? result.message.message_id : result.conversation_id
      }
      to={linkTo(result)}
      className={`bg-zinc-800 p-2 px-3 rounded-xl h-full overflow-hidden flex flex-row hover:bg-zinc-700 transition-colors my-2 items-center gap-2 ${className}`}
    >
      <div className="min-h-[22px] min-w-[22px]">{icon}</div>
      <div className="flex-1">{bodyContent(result)}</div>
      {footerContent && (
        <div className="text-sm text-foreground-500 ml-auto">
          {footerContent(result)}
        </div>
      )}
    </Link>
  ) : null;
}

// Example usage in a parent component
// <SearchCard result={result} type="message" />
// <SearchCard result={result} type="conversation" />
