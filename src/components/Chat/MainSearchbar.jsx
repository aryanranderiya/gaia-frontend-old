import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { SentIcon, AttachmentIcon } from "../icons";
import { Tooltip } from "@nextui-org/tooltip";
import * as React from "react";
import api from "../../apiaxios";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export default function MainSearchbar({
  conversationHistory,
  setConversationHistory,
  loading,
  setLoading,
}) {
  const [searchbarText, setSearchbarText] = React.useState("");
  const inputRef = React.useRef(null);
  const [data, setData] = React.useState([]);

  const focusInput = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  };

  React.useEffect(() => {
    if (conversationHistory.length > 0 && data.length > 0) {
      const updatedHistory = [...conversationHistory];
      const lastItemIndex = updatedHistory.length - 1;
      const lastItem = updatedHistory[lastItemIndex];
      const lastResponse = lastItem.response;
      const joinedData = data.join("");

      if (lastItem.type === "bot") {
        if (lastResponse !== joinedData) lastItem.response = joinedData;
        setConversationHistory(updatedHistory);
      }
    }
  }, [data]);

  const fetchData = async (searchbarText) => {
    setConversationHistory((prevHistory) => [
      ...prevHistory,
      { type: "user", response: searchbarText },
      { type: "bot", response: "" },
    ]);

    await fetchEventSource(`http://127.0.0.1:8000/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({ message: searchbarText }),
      onmessage(event) {
        if (event.data === "") setData((data) => [...data, "\n"]);
        else setData((data) => [...data, event.data]);
        setLoading(false);
      },
      onclose() {
        console.log("Connection closed by the server");
        focusInput();
        setData([]);
      },
      onerror(err) {
        console.log("There was an error from server", err);
        focusInput();
        setData([]);
      },
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!!searchbarText) fetchData(searchbarText);
    setSearchbarText("");
  };

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
            startContent={
              <Tooltip
                content="Attach documents"
                placement="left"
                disabled={loading}
              >
                <Button
                  disabled={loading}
                  isIconOnly
                  radius="full"
                  aria-label="Attach files"
                  className={`mr-7 ${loading && "cursor-wait"}`}
                >
                  <AttachmentIcon />
                </Button>
              </Tooltip>
            }
            endContent={
              <Tooltip content="Send message" placement="right">
                <Button
                  disabled={loading}
                  isIconOnly
                  radius="full"
                  aria-label="Send message"
                  color="primary"
                  type="submit"
                  className={`${loading && "cursor-wait"}`}
                >
                  <SentIcon color="black" fill="#ffffff40" />
                </Button>
              </Tooltip>
            }
          />
        </form>
      </div>
    </div>
  );
}
