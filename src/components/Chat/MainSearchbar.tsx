import { useConversation } from "@/hooks/useConversation";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { ArrowDown } from "lucide-react";
import * as React from "react";
import { useParams } from "react-router-dom";
import SearchbarLeftDropdown from "./SearchbarLeftDropdown";
import SearchbarRightSendBtn from "./SearchbarRightSendBtn";

interface MainSearchbarProps {
  scrollToBottom: () => void;
  isAtBottom: boolean;
  isOverflowing: boolean;
}

export default function MainSearchbar({
  scrollToBottom,
  isAtBottom,
  isOverflowing,
}: MainSearchbarProps) {
  const { convoIdParam } = useParams<{ convoIdParam: string }>();
  const [currentHeight, setHeight] = React.useState<number>(24);
  const [searchbarText, setSearchbarText] = React.useState<string>("");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { loading, updateConversation } = useConversation(convoIdParam ?? null);

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!searchbarText) return;
    updateConversation(searchbarText);
    setSearchbarText("");
    focusInput();
    scrollToBottom();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setSearchbarText((text) => text + "\n");
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleFormSubmit();
    }
  };
  return (
    <div className="searchbar_container relative">
      <div
        className={`absolute top-[-55px] flex justify-center w-full pointer-events-none transition-opacity ${
          isOverflowing && !isAtBottom ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          isIconOnly
          onPress={scrollToBottom}
          radius="full"
          size="sm"
          className="pointer-events-auto"
        >
          <ArrowDown width={18} />
        </Button>
      </div>

      <div className="searchbar">
        <form onSubmit={handleFormSubmit}>
          <Textarea
            disabled={loading}
            radius="full"
            size="lg"
            placeholder="Ask gaia..."
            onValueChange={setSearchbarText}
            onKeyDown={handleKeyDown}
            value={searchbarText}
            ref={inputRef}
            autoFocus
            isInvalid={searchbarText.length > 4500}
            onHeightChange={(height: number) => setHeight(height)}
            minRows={1}
            maxRows={13}
            endContent={<SearchbarRightSendBtn loading={loading} />}
            classNames={{
              inputWrapper: "p-[6px] data-[hover=true]:bg-zinc-900",
              innerWrapper: `${
                currentHeight > 24 ? "items-end" : "items-center"
              }`,
            }}
            startContent={<SearchbarLeftDropdown loading={loading} />}
          />
        </form>
        <div className="flex w-full justify-end text-sm mt-1 text-gray-500">
          {searchbarText.length}/4500 words
        </div>
      </div>
    </div>
  );
}
