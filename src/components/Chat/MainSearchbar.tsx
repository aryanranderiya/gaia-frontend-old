import { Textarea } from "@nextui-org/input";
import * as React from "react";
import SearchbarLeftDropdown from "./SearchbarLeftDropdown";
import SearchbarRightSendBtn from "./SearchbarRightSendBtn";

interface MainSearchbarProps {
  loading: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  handleFormSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
  searchbarText: string;
  setSearchbarText: React.Dispatch<React.SetStateAction<string>>;
}

export default function MainSearchbar({
  loading,
  inputRef,
  handleFormSubmit,
  searchbarText,
  setSearchbarText,
}: MainSearchbarProps) {
  const [currentHeight, setHeight] = React.useState(24);

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
    <div className="searchbar_container">
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
            onHeightChange={(height) => setHeight(height)}
            minRows={1}
            maxRows={13}
            endContent={<SearchbarRightSendBtn loading={loading} />}
            classNames={{
              inputWrapper: "p-[6px] data-[hover=true]:bg-zinc-900",
              innerWrapper: `${currentHeight > 24 ? "items-end" : "items-center"}`,
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
