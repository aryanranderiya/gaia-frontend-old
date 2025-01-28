import { parseDate2 } from "@/utils/fetchDate";
import { Chip } from "@heroui/chip";
import { ArrowUpRight, GlobeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Chatting01Icon } from "../icons";
import { CommandItem } from "../ui/command";

export function SearchCard({
  result,
  searchQuery,
}: {
  result: {
    message: {
      message_id: string;
      response: string;
      searchWeb: boolean;
      pageFetchURL: string;
      date: string;
      type: string;
    };
    conversation_id: string;
    snippet: string;
  };
  searchQuery: string;
}) {
  return result.snippet ? (
    <Link
      key={result.message.message_id}
      to={`/try/chat/${result.conversation_id}`}
      state={{ messageId: result.message.message_id }}
      className="bg-zinc-800 p-2 px-3 rounded-xl h-full overflow-hidden flex flex-row hover:bg-zinc-700 transition-colors my-2 items-center gap-2"
    >
      <Chatting01Icon color="#9b9b9b" className="min-h-[22px] min-w-[22px]" />
      <div>
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
        <CommandItem
          key={result.message.message_id}
          className="truncate w-full cursor-pointer data-[selected='true']:!bg-transparent !py-1 !px-0"
          // onClick={() => { }
        >
          {/* result.snippet
            .split(new RegExp(`(${searchQuery})`, "gi"))
            .map((part, index) => {
              return part.toLowerCase() === searchQuery.toLowerCase() ? (
                <b key={index}>{part}</b>
              ) : (
                part
              );
            }) || 
               */}
          {result.snippet}
        </CommandItem>
      </div>
      <div className="text-sm text-foreground-500 ml-auto">
        {parseDate2(result.message.date)}
      </div>
    </Link>
  ) : (
    <></>
  );
}
