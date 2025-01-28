import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLoading } from "@/contexts/LoadingContext";
import { useConversation } from "@/hooks/useConversation";
import { Button } from "@heroui/button";
import { useCheckbox } from "@heroui/checkbox";
import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { VisuallyHidden, tv } from "@heroui/react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalSearchIcon } from "../icons";
import SearchbarLeftDropdown from "./SearchbarLeftDropdown";
import SearchbarRightSendBtn from "./SearchbarRightSendBtn";

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
  const [pageFetchURL, setPageFetchURL] = useState<string>("");
  const [fetchPageModal, setFetchPageModal] = useState<boolean>(false);
  const { loading, updateConversation } = useConversation(convoIdParam ?? null);
  const { isLoading, setIsLoading } = useLoading();

  const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!searchbarText && !isValidURL(pageFetchURL)) return;

    setIsLoading(true);
    updateConversation(searchbarText, enableSearch, pageFetchURL);
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
      base: "hover:bg-default-200 bg-[#27272A] !pr-0 border-none !text-sm",
      content: "text-default-500 flex items-center gap-1",
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

  const toggleSearch = () => setEnableSearch((prev) => !prev);

  const openPageFetchModal = () => {
    setFetchPageModal(true); // For the dialog
  };

  // Extract label props and remove the ref to avoid type conflicts
  const { ref, ...labelProps } = getLabelProps();

  function isValidURL(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  return (
    <>
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
            <div className="w-fit py-1 px-1 rounded-full text-sm">
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
                      <Check
                        className="ml-1 text-black"
                        width={18}
                        height={18}
                      />
                    ) : null
                  }
                  variant="faded"
                  {...labelProps}
                >
                  Web Search
                  <GlobalSearchIcon
                    color={isSelected ? "#000" : ""}
                    height={20}
                    width={20}
                  />
                </Chip>
              </label>
            </div>

            <Chip
              onClick={openPageFetchModal}
              classNames={{
                base: `hover:bg-default-200 ${
                  pageFetchURL.length > 0 && !fetchPageModal
                    ? "bg-[#00bbff] hover:bg-[#00bbff95]"
                    : "bg-[#27272A] hover:bg-default-200"
                }  !pr-0 border-none cursor-pointer`,
                content: `text-default-500 flex items-center gap-1 ${
                  pageFetchURL.length > 0 && !fetchPageModal
                    ? "text-primary-foreground"
                    : "text-default-500"
                }  `,
              }}
              className="transition-all"
              variant="faded"
            >
              Fetch Page
              <ArrowUpRight
                color={
                  pageFetchURL.length > 0 && !fetchPageModal
                    ? "#000"
                    : "#a1a1a1"
                }
                height={20}
                width={20}
              />
            </Chip>
            {/* </label>
          </div> */}

            <div className="flex w-full justify-end text-sm mt-1 text-gray-500">
              {searchbarText.length}/10000 words
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <Textarea
              disabled={loading && isLoading}
              radius="full"
              size="lg"
              placeholder="Ask gaia..."
              onValueChange={setSearchbarText}
              onKeyDown={handleKeyDown}
              value={searchbarText}
              ref={inputRef}
              autoFocus
              isInvalid={searchbarText.length > 10000}
              onHeightChange={(height: number) => setHeight(height)}
              minRows={1}
              maxRows={13}
              endContent={
                <SearchbarRightSendBtn
                  loading={loading}
                  searchbarText={searchbarText}
                  setSearchbarText={setSearchbarText}
                  handleFormSubmit={handleFormSubmit}
                />
              }
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
      <Dialog open={fetchPageModal} onOpenChange={setFetchPageModal}>
        <DialogContent className="dark text-white bg-zinc-900 border-none">
          <DialogHeader>
            <DialogTitle>Fetch Page</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit. to fetch data from the webpage
            </DialogDescription>
          </DialogHeader>

          <Input
            label="Enter URL"
            onValueChange={setPageFetchURL}
            value={pageFetchURL}
            isInvalid={!isValidURL(pageFetchURL) && pageFetchURL.length > 0}
            errorMessage="Please enter a valid URL! (starting with https://)"
            onKeyPress={(e) => {
              if (e.key === "Enter") setFetchPageModal(false);
            }}
          />
          <DialogFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => {
                setPageFetchURL("");
                setFetchPageModal(false);
              }}
            >
              Clear
            </Button>
            <Button
              color="primary"
              onPress={() => {
                if (isValidURL(pageFetchURL) && pageFetchURL.length > 0)
                  setFetchPageModal(false);
              }}
            >
              Fetch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MainSearchbar;
