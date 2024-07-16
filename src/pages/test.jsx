import MainSearchbar from "@/components/Chat/MainSearchbar";
import StarterText from "@/components/Chat/StarterText";
import StarterEmoji from "@/components/Chat/StarterEmoji";
import { ScrollArea } from "@/components/Shadcn/ScrollArea";
import * as React from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ChatBubbleBot, ChatBubbleUser } from "@/components/Chat/ChatBubbles";
import LoadTranslationModel from "@/components/Translation/LoadTranslationModel";
import fetchDate from "@/components/Chat/fetchDate";
import { useChatsListContext } from "@/contexts/ChatsList";
import { useConvoHistory } from "@/contexts/ConversationHistory";
import api from "@/apiaxios";
import { useNavigate, useParams } from "react-router-dom";

function setLastBotItem(conversationHistory, setConversationHistory, data) {
  if (conversationHistory.length > 0 && data.length > 0) {
    const updatedHistory = [...conversationHistory];
    const lastItemIndex = updatedHistory.length - 1;
    const lastItem = updatedHistory[lastItemIndex];
    const lastResponse = lastItem.response;
    if (typeof data === "object") data = data.join("");

    if (lastItem.type === "bot") {
      if (lastResponse !== data && !lastItem.isImage) {
        lastItem.response = data;
        lastItem.loading = false;
      }
      setConversationHistory(updatedHistory);
    }
  }
}

export default function MainChat() {
  const { conversationHistory, setConversationHistory } = useConvoHistory();
  const [loading, setLoading] = React.useState(false);
  const [conversationMessages, setConversationMessages] = React.useState([]);
  const [searchbarText, setSearchbarText] = React.useState("");
  const [data, setData] = React.useState([]);
  const inputRef = React.useRef(null);
  const effectHasRunRef = React.useRef(false);
  const convoRef = React.useRef(null);
  // const { setChatsList, chatsList } = useChatsListContext();
  const navigate = useNavigate();

  const focusInput = () => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 10);
  };

  let { conversationID } = useParams();

  const fetchConversationName = async () => {
    const response = await api.post(
      "/chatNoStream",
      {
        message: `Summarise what the message/question '${conversationHistory[0].response}' is about, in under 4-5 words. Just respond with the summary.`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    return response?.data?.response.toString().replace('"', "") || "New Chat";
  };

  React.useEffect(() => {
    convoRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    setConversationMessages(conversationHistory[conversationID]?.messages);
  }, [conversationHistory]);

  React.useEffect(() => {
    LoadTranslationModel();
  }, []);

  React.useEffect(() => {
    console.log(conversationHistory);
    setLastBotItem(conversationHistory, setConversationHistory, data);
  }, [data, conversationHistory]);

  function checkIntent(message, controller) {
    //   const type = message?.type;
    //   switch (type.toLowerCase()) {
    //     case "image":
    //       setData("this is an image");
    //       return;
    //     default:
    //       break;
    //   }
  }

  const fetchData = async (searchbarText) => {
    await (async () => {
      if (
        !effectHasRunRef.current &&
        conversationHistory.length > 1 &&
        !loading
      ) {
        try {
          const name = await fetchConversationName();
          const convoID = crypto.randomUUID();
          setChatsList((oldlist) => [...oldlist, { id: convoID, name: name }]);
          navigate(`/try/chat/${convoID}`);
          effectHasRunRef.current = true;
        } catch (err) {
          console.log("Error occured when fetching books");
        }
      }
    })();

    setConversationHistory((prevHistory) => [
      ...prevHistory,
      {
        [conversationID]: {
          description: "",
          messages: [
            ...prevHistory[conversationID]?.messages,
            {
              type: "user",
              response: searchbarText,
              date: fetchDate(),
            },
            {
              type: "bot",
              response: "",
              loading: true,
              date: fetchDate(),
            },
          ],
        },
      },
    ]);

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
            setLoading(false);
          }, 50);
          return;
        }

        let dataJson = JSON.parse(event.data);
        let response = dataJson.response;

        if (typeof response === "object") checkIntent(response, controller);
        else if (response === "") setData((data) => [...data, "\n"]);
        else setData((data) => [...data, response]);
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
        <div className="conversation_history" ref={convoRef}>
          {!!conversationHistory &&
          !!conversationMessages &&
          conversationMessages.length > 0 ? (
            conversationMessages.map((message, index) =>
              message.type === "bot" ? (
                <ChatBubbleBot
                  text={message.response}
                  key={index}
                  loading={message.loading}
                  index={index}
                  isImage={message.isImage}
                  image={message.imageUrl}
                  conversationHistory={conversationHistory}
                  disclaimer={message.disclaimer}
                  userinputType={message.userinputType}
                  date={message.date}
                />
              ) : (
                <ChatBubbleUser
                  text={message.response}
                  key={index}
                  subtype={message.subtype || null}
                  file={message.file || null}
                  filename={message.filename || null}
                  date={message.date}
                />
              )
            )
          ) : (
            <div className="starter_container">
              <StarterEmoji />
              <StarterText />
            </div>
          )}
        </div>
      </ScrollArea>

      <MainSearchbar
        loading={loading}
        inputRef={inputRef}
        handleFormSubmit={handleFormSubmit}
        searchbarText={searchbarText}
        setSearchbarText={setSearchbarText}
      />
    </>
  );
}
