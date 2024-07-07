import MainSearchbar from "../components/Chat/MainSearchbar";
import StarterText from "../components/Chat/StarterText";
import StarterEmoji from "../components/Chat/StarterEmoji";
import { ScrollArea } from "../components/ScrollArea";
import * as React from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ChatBubbleBot, ChatBubbleUser } from "../components/Chat/ChatBubbles";

async function LoadTranslationModel() {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/m2m100_1.2B",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: "hi" }),
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

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
    LoadTranslationModel();
  }, []);

  React.useEffect(() => {
    console.log(conversationHistory);

    if (conversationHistory.length > 0 && data.length > 0) {
      const updatedHistory = [...conversationHistory];
      const lastItemIndex = updatedHistory.length - 1;
      const lastItem = updatedHistory[lastItemIndex];
      const lastResponse = lastItem.response;
      const joinedData = data.join("");

      if (lastItem.type === "bot") {
        if (lastResponse !== joinedData && !lastItem.isImage)
          lastItem.response = joinedData;
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
    const controller = new AbortController();
    await fetchEventSource(`${import.meta.env.VITE_BACKEND_URL}chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      signal: controller.signal,
      body: JSON.stringify({ message: searchbarText }),
      onmessage(event) {
        if (event.data == "[DONE]") {
          setTimeout(() => {
            focusInput();
            setData([]);
            controller.abort();
          }, 500);
          return;
        }

        let dataJson = JSON.parse(event.data);
        let responseData = dataJson.response;
        if (responseData === "") setData((data) => [...data, "\n"]);
        else setData((data) => [...data, responseData]);
        setLoading(false);
      },
      onclose() {
        setTimeout(() => {
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
                  <ChatBubbleBot
                    text={message.response}
                    key={index}
                    index={index}
                    isImage={message.isImage}
                    setConversationHistory={setConversationHistory}
                    image={message.imageUrl}
                    conversationHistory={conversationHistory}
                  />
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
