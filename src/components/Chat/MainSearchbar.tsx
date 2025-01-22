import { useConversation } from "@/hooks/useConversation";
import { Button } from "@nextui-org/button";
import { useCheckbox } from "@nextui-org/checkbox";
import { Chip } from "@nextui-org/chip";
import { Textarea } from "@nextui-org/input";
import { VisuallyHidden, tv } from "@nextui-org/react";
import { ArrowDown, Check } from "lucide-react";
// import * as React from "react";
import { useParams } from "react-router-dom";
import SearchbarLeftDropdown from "./SearchbarLeftDropdown";
import SearchbarRightSendBtn from "./SearchbarRightSendBtn";
import { InternetIcon } from "../icons";
import React, { useEffect, useState } from "react";

interface MainSearchbarProps {
  scrollToBottom: () => void;
  isAtBottom: boolean;
  isOverflowing: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const MainSearchbar = ({
  scrollToBottom,
  isAtBottom,
  isOverflowing,
  inputRef,
}: MainSearchbarProps) => {
  const { convoIdParam } = useParams<{ convoIdParam: string }>();
  const [currentHeight, setHeight] = useState<number>(24);
  const [searchbarText, setSearchbarText] = useState<string>("");
  const [enableSearch, setEnableSearch] = useState<boolean>(false);
  const { loading, updateConversation } = useConversation(convoIdParam ?? null);

  const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!searchbarText) return;
    updateConversation(searchbarText);
    setSearchbarText("");
    inputRef.current?.focus();
    scrollToBottom();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setSearchbarText((text) => `${text}\n`);
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  const { isSelected, getBaseProps, getLabelProps, getInputProps } =
    useCheckbox({
      defaultSelected: false,
    });

  const checkbox = tv({
    slots: {
      base: "hover:bg-default-200 bg-[#27272A] !pr-0 border-none",
      content: "text-default-500 flex items-center gap-1 font-medium",
    },
    variants: {
      isSelected: {
        true: {
          base: "bg-primary hover:bg-[#00bbff95]",
          content: "text-primary-foreground pl-1",
        },
      },
    },
  });

  const styles = checkbox({ isSelected: enableSearch });

  useEffect(() => {
    console.log(enableSearch);
  }, [enableSearch]);
  const toggleSearch = () => setEnableSearch((prev) => !prev);

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

      <div className="searchbar bg-zinc-900 px-3 py-2 rounded-3xl gap-3">
        <div className="flex items-center justify-between mb-1">
          <div className=" w-fit py-1 px-1 rounded-full text-sm font-medium">
            <label {...getBaseProps()}>
              <VisuallyHidden>
                <input {...getInputProps()} />
              </VisuallyHidden>
              <Chip
                classNames={{
                  base: styles.base(),
                  content: styles.content(),
                }}
                onClick={toggleSearch}
                color="primary"
                startContent={
                  isSelected ? (
                    <Check className="ml-1 text-black" width={18} height={18} />
                  ) : null
                }
                variant="faded"
                {...getLabelProps()}
              >
                {/* {children ? children : isSelected ? "Web Search" : "Disabled"} */}
                Web Search
                <InternetIcon
                  color={isSelected ? "#000" : ""}
                  height={20}
                  width={20}

                  // className="min-h-[30px] min-w-[30px]"
                />
              </Chip>
            </label>
          </div>

          <div className="flex w-full justify-end text-sm mt-1 text-gray-500">
            {searchbarText.length}/4500 words
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <Textarea
            disabled={loading}
            radius="full"
            size="lg"
            placeholder="Ask gaia..."
            onValueChange={setSearchbarText}
            onKeyDown={handleKeyDown}
            value={searchbarText}
            ref={inputRef} // Assign the ref here
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
      </div>
    </div>
  );
};

export default MainSearchbar;
