import MainSearchbar from "../components/Chat/MainSearchbar";
import StarterText from "../components/Chat/StarterText";
import StarterEmoji from "../components/Chat/StarterEmoji";
import { ScrollArea } from "../components/ScrollArea";
import * as React from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ChatBubbleBot, ChatBubbleUser } from "../components/Chat/ChatBubbles";

export default function MainChat() {
  const [conversationHistory, setConversationHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchbarText, setSearchbarText] = React.useState("");
  const [data, setData] = React.useState([]);
  const inputRef = React.useRef(null);

  const focusInput = () => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
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
  }, [data, conversationHistory]);

  const fetchData = async (searchbarText) => {
    setConversationHistory((prevHistory) => [
      ...prevHistory,
      { type: "user", response: searchbarText },
      { type: "bot", response: "" },
    ]);

    // setData(["My name is gaia, your personal A.I. assistant!"]);
    // setLoading(false);
    // return;

    await fetchEventSource(`http://127.0.0.1:8000/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({ message: searchbarText }),
      onmessage(event) {
        console.log(event.data);
        if (event.data === "") setData((data) => [...data, "\n"]);
        else setData((data) => [...data, event.data]);
        setLoading(false);
      },
      onclose() {
        setTimeout(() => {
          console.log("Connection closed by the server");
          focusInput();
          setData([]);
        }, 500);
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
    if (!searchbarText) return;
    setLoading(true);
    fetchData(searchbarText);
    setSearchbarText("");
  };

  return (
    <>
      <ScrollArea>
        <div className="flex justify-center w-full items-center">
          <div className="conversation_history">
            {!!conversationHistory && conversationHistory.length > 0 ? (
              conversationHistory.map((message, index) =>
                message.type === "bot" ? (
                  <ChatBubbleBot text={message.response} key={index} />
                ) : (
                  <ChatBubbleUser
                    text={message.response}
                    key={index}
                    subtype={message.subtype || null}
                    file={message.file || null}
                  />
                )
              )
            ) : (
              <div className="starter_container">
                <StarterEmoji />
                <StarterText />
              </div>
            )}

            {loading && <ChatBubbleBot loading={loading} text={" "} />}
          </div>
        </div>
      </ScrollArea>

      <MainSearchbar
        loading={loading}
        inputRef={inputRef}
        handleFormSubmit={handleFormSubmit}
        searchbarText={searchbarText}
        setSearchbarText={setSearchbarText}
        setConversationHistory={setConversationHistory}
      />
    </>
  );
}
