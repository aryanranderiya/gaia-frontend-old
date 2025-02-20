import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { GlobalSearchIcon } from "../Misc/icons";

import SearchbarLeftDropdown from "./SearchbarLeftDropdown";
import SearchbarRightSendBtn from "./SearchbarRightSendBtn";

import { useConversation } from "@/hooks/useConversation";
import { useLoading } from "@/contexts/LoadingContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  const toggleSearch = () => setEnableSearch((prev) => !prev);

  const openPageFetchModal = () => {
    setFetchPageModal(true);
  };

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
            className="pointer-events-auto"
            radius="full"
            size="sm"
            onPress={scrollToBottom}
          >
            <ArrowDown width={18} />
          </Button>
        </div>

        <div className="searchbar bg-zinc-900 px-3 py-2 rounded-3xl gap-3">
          <div className="flex items-center justify-between mb-1 gap-1">
            <button
              className={`flex w-fit gap-1 rounded-full px-3 py-1 text-sm items-center transition-all ${
                enableSearch
                  ? "bg-primary text-white hover:bg-[#00bbffAA]"
                  : "bg-zinc-800  text-zinc-400 hover:bg-zinc-700"
              }`}
              type="button"
              onClick={toggleSearch}
            >
              <span className="text-nowrap">Web Search</span>
              <GlobalSearchIcon
                color={enableSearch ? "#fff" : "#A1A1AA"}
                height={18}
                width={18}
              />
            </button>

            <button
              className={`flex w-fit gap-1 rounded-full px-3 py-1 text-sm items-center transition-all ${
                pageFetchURL.length > 0 && !fetchPageModal
                  ? "bg-primary text-white hover:bg-[#00bbffAA]"
                  : "bg-zinc-800  text-zinc-400 hover:bg-zinc-700"
              }`}
              type="button"
              onClick={openPageFetchModal}
            >
              <span className="text-nowrap">Fetch Page</span>

              <ArrowUpRight
                color={
                  pageFetchURL.length > 0 && !fetchPageModal
                    ? "#fff"
                    : "#A1A1AA"
                }
                height={18}
                width={18}
              />
            </button>

            {/* <Chip
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
            </Chip> */}

            {/* </label>
          </div> */}

            <div className="flex w-full justify-end text-sm mt-1 text-gray-500">
              {searchbarText.length}/10000 words
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <Textarea
              ref={inputRef}
              autoFocus
              classNames={{
                inputWrapper: "p-[6px] data-[hover=true]:bg-zinc-900",
                innerWrapper: `${
                  currentHeight > 24 ? "items-end" : "items-center"
                }`,
              }}
              disabled={loading && isLoading}
              endContent={
                <SearchbarRightSendBtn
                  handleFormSubmit={handleFormSubmit}
                  loading={loading}
                  searchbarText={searchbarText}
                  setSearchbarText={setSearchbarText}
                />
              }
              isInvalid={searchbarText.length > 10000}
              maxRows={13}
              minRows={1}
              placeholder="Ask gaia..."
              radius="full"
              size="lg"
              startContent={<SearchbarLeftDropdown loading={loading} />}
              value={searchbarText}
              onHeightChange={(height: number) => setHeight(height)}
              onKeyDown={handleKeyDown}
              onValueChange={setSearchbarText}
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
            errorMessage="Please enter a valid URL! (starting with https://)"
            isInvalid={!isValidURL(pageFetchURL) && pageFetchURL.length > 0}
            label="Enter URL"
            value={pageFetchURL}
            onKeyPress={(e) => {
              if (e.key === "Enter") setFetchPageModal(false);
            }}
            onValueChange={setPageFetchURL}
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
