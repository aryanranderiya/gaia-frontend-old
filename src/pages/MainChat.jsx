import MainSearchbar from "@/components/Chat/MainSearchbar";
import StarterText from "@/components/Chat/StarterText";
import StarterEmoji from "@/components/Chat/StarterEmoji";
import { ScrollArea } from "@/components/Shadcn/ScrollArea";
import * as React from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { ChatBubbleBot, ChatBubbleUser } from "@/components/Chat/ChatBubbles";
import LoadTranslationModel from "@/components/Translation/LoadTranslationModel";
import fetchDate from "@/components/Chat/fetchDate";
import { useConvoHistory } from "@/contexts/ConversationHistory";
import api from "@/apiaxios";
import { useNavigate, useParams } from "react-router-dom";

function setLastBotItem(
  conversationHistory,
  setConversationHistory,
  data_array,
  conversationID
) {
  if (!!conversationHistory && data_array.length > 0) {
    const previousHistory = { ...conversationHistory };
    const currentConvo = previousHistory[conversationID];
    const messages = currentConvo.messages;
    const lastItemIndex = messages.length - 1;
    const lastItem = messages[lastItemIndex];
    if (typeof data_array === "object") data_array = data_array.join("");

    if (lastItem.type === "bot") {
      if (
        (lastItem?.response !== data_array || !lastItem?.response) &&
        !lastItem.isImage
      ) {
        lastItem.response = data_array;
        lastItem.loading = false;
        lastItem.date = fetchDate();
      }

      setConversationHistory(previousHistory);
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
  const navigate = useNavigate();
  const { convoIdParam } = useParams();
  const [convoIdParamState, setConvoIdParamState] = React.useState(null);

  React.useEffect(() => {
    setConvoIdParamState(convoIdParam);
    // if (!conversationHistory.includes(convoIdParam) && !!convoIdParam)
    //   navigate("/404");
  }, [convoIdParam]);

  const focusInput = () => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 10);
  };

  const fetchConversationDescription = async (searchbarText) => {
    const response = await api.post(
      "/chatNoStream",
      {
        message: `Summarise what the message/question '${searchbarText}' is about, in under 4-5 words. Just respond with the summary.`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response?.data?.response.toString());
    return response?.data?.response.toString().replace('"', "") || "New Chat";
  };

  React.useEffect(() => {
    convoRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversationHistory]);

  React.useEffect(() => {
    if (!!convoIdParamState && !!conversationHistory)
      setConversationMessages(conversationHistory[convoIdParamState]?.messages);
  }, [conversationHistory, convoIdParamState]);

  React.useEffect(() => {
    LoadTranslationModel();
  }, []);

  React.useEffect(() => {
    setLastBotItem(
      conversationHistory,
      setConversationHistory,
      data,
      convoIdParamState
    );
  }, [data, conversationHistory]);

  const fetchData = async (searchbarText) => {
    const currentMessages = [
      {
        type: "user",
        response: searchbarText,
        date: fetchDate(),
      },
      {
        type: "bot",
        loading: true,
      },
    ];

    if (!effectHasRunRef.current && !loading) {
      const convoID = crypto.randomUUID();
      navigate(`/try/chat/${convoID}`);

      setConversationHistory((oldHistory) => ({
        ...oldHistory,
        [convoID]: {
          description: "New Chat",
          messages: currentMessages,
        },
      }));

      fetchConversationDescription(searchbarText).then((description) => {
        setConversationHistory((oldHistory) => ({
          ...oldHistory,
          [convoID]: {
            ...oldHistory[convoID],
            description: description || "New Chat",
          },
        }));
      });
    } else {
      setConversationHistory((oldHistory) => ({
        ...oldHistory,
        [convoIdParamState]: {
          ...oldHistory[convoIdParamState],
          messages: [
            ...(oldHistory[convoIdParamState]?.messages || []),
            ...currentMessages,
          ],
        },
      }));
    }

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
