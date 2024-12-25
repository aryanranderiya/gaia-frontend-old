import SearchbarRightSendBtn from "@/components/Chat/SearchbarRightSendBtn";
import { Textarea } from "@nextui-org/input";
import * as React from "react";

export default function SearchPage({}) {
  const [currentHeight, setHeight] = React.useState<number>(24);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const socketRef = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket("ws://localhost:8000/ws/search");

    socketRef.current.onmessage = (event) => {
      const results = JSON.parse(event.data);
      setSearchResults(results);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!searchQuery) return;
    console.log("Search query submitted:", searchQuery);
    socketRef.current?.send(searchQuery);
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

  const handleInputChange = (query: string) => {
    setSearchQuery(query);
    if (socketRef.current && query) {
      socketRef.current.send(query);
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
            onValueChange={handleInputChange}
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
          />
        </form>
        <div className="flex w-full justify-end text-sm mt-1 text-gray-500">
          {searchQuery.length}/1000 words
        </div>
        <div className="search-results mt-4">
          {searchResults.map((result, index) => (
            <div key={index} className="result-item p-2 border-b">
              {result.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
