import SearchbarRightSendBtn from "@/components/Chat/SearchbarRightSendBtn";
import { Textarea } from "@nextui-org/input";
import * as React from "react";

export default function SearchPage({}) {
  const [currentHeight, setHeight] = React.useState<number>(24);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!searchQuery) return;
    console.log("Search query submitted:", searchQuery);
    setSearchQuery("");
    focusInput();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setSearchQuery((query) => query + "\n");
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  return (
    <div className="searchpage_container relative">
      <div className="searchpage">
        <form onSubmit={handleFormSubmit}>
          <Textarea
            radius="full"
            size="lg"
            placeholder="Search for a message..."
            onValueChange={setSearchQuery}
            onKeyDown={handleKeyDown}
            value={searchQuery}
            ref={inputRef}
            autoFocus
            isInvalid={searchQuery.length > 1000}
            onHeightChange={(height: number) => setHeight(height)}
            minRows={1}
            maxRows={13}
            endContent={<SearchbarRightSendBtn loading={false} />}
            classNames={{
              inputWrapper: "p-[6px] pl-[20px] data-[hover=true]:bg-zinc-900",
              innerWrapper: `${
                currentHeight > 24 ? "items-end" : "items-center"
              }`,
            }}
            className="max-w-[500px] min-w-[500px] w-[50vw]"
            // startContent={<SearchbarLeftDropdown />}
          />
        </form>
        <div className="flex w-full justify-end text-sm mt-1 text-gray-500">
          {searchQuery.length}/1000 words
        </div>
      </div>
    </div>
  );
}
