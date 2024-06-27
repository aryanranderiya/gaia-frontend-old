import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { SentIcon, AttachmentIcon } from "../icons";
import { Tooltip } from "@nextui-org/tooltip";
import * as React from "react";
import api from "../../apiaxios";

export default function MainSearchbar({
  setConversationHistory,
  loading,
  setLoading,
}) {
  const [searchbarText, setSearchbarText] = React.useState("");
  const inputRef = React.useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const createNewMessage = async (message) => {
    const userEntry = { type: "user", response: message };
    setConversationHistory((prevHistory) => [...prevHistory, userEntry]);

    try {
      const response = await api.post(
        "/chat",
        { message: message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const botEntry = { type: "bot", response: response.data.response };
      setConversationHistory((prevHistory) => [...prevHistory, botEntry]);
      setLoading(false);
      focusInput();
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!!searchbarText) createNewMessage(searchbarText);

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
            onSubmit={() => console.log("test")}
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
