import { Input } from "@nextui-org/input";
import * as React from "react";
import SearchbarLeftDropdown from "./SearchbarLeftDropdown";
import SearchbarRightSendBtn from "./SearchbarRightSendBtn";
import { Textarea } from "@nextui-org/input";

export default function MainSearchbar({
  loading,
  inputRef,
  handleFormSubmit,
  searchbarText,
  setSearchbarText,
  setConversationHistory,
}) {
  const [currentHeight, setHeight] = React.useState(24);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setSearchbarText((text) => text + "\n");
    } else if (event.key === "Enter") handleFormSubmit(event);
  };

  return (
    <div className="searchbar_container">
      <div className="searchbar">
        <form onSubmit={handleFormSubmit}>
          <Textarea
            disabled={loading}
            radius="full"
            size="lg"
            placeholder={"Ask gaia something..."}
            onValueChange={setSearchbarText}
            onKeyDown={handleKeyDown}
            value={searchbarText}
            ref={inputRef}
            autoFocus
            startContent={
              <SearchbarLeftDropdown
                loading={loading}
                setConversationHistory={setConversationHistory}
              />
            }
            endContent={<SearchbarRightSendBtn loading={loading} />}
            minRows={1}
            maxRows={13}
            classNames={{
              inputWrapper: "p-2 data-[hover=true]:bg-zinc-900",
              innerWrapper: `${currentHeight > 24 ? "items-end" : "items-center"}`,
            }}
            onHeightChange={(height) => setHeight(height)}
          />
        </form>
      </div>
    </div>
  );
}
