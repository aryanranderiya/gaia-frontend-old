import { Input } from "@nextui-org/input";
import * as React from "react";
import SearchbarLeftDropdown from "./SearchbarLeftDropdown";
import SearchbarRightSendBtn from "./SearchbarRightSendBtn";

export default function MainSearchbar({
  loading,
  inputRef,
  handleFormSubmit,
  searchbarText,
  setSearchbarText,
}) {
  return (
    <div className="searchbar_container">
      <div className="searchbar">
        <form onSubmit={handleFormSubmit}>
          <Input
            disabled={loading}
            radius="full"
            size="lg"
            placeholder="Ask gaia something..."
            classNames={{ inputWrapper: ["px-1"] }}
            onValueChange={setSearchbarText}
            value={searchbarText}
            ref={inputRef}
            autoFocus
            startContent={<SearchbarLeftDropdown loading={loading} />}
            endContent={<SearchbarRightSendBtn loading={loading} />}
          />
        </form>
      </div>
    </div>
  );
}
