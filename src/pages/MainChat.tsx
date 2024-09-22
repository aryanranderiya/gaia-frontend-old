import api, { apiauth } from "@/apiaxios";
import { ChatBubbleBot, ChatBubbleUser } from "@/components/Chat/ChatBubbles";
import fetchDate from "@/components/Chat/fetchDate";
import MainSearchbar from "@/components/Chat/MainSearchbar";
import StarterEmoji from "@/components/Chat/StarterEmoji";
import StarterText from "@/components/Chat/StarterText";
import { ScrollArea } from "@/components/Shadcn/ScrollArea";
import { useConvoHistory } from "@/contexts/ConversationHistory";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { useUser } from "@/contexts/UserContext";
import { ConversationHistoryType, MessageType } from "@/types/ConvoTypes";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Helper function to set the last bot item
function setLastBotItem(
  convoHistory: ConversationHistoryType,
  setConvoHistory: React.Dispatch<
    React.SetStateAction<ConversationHistoryType>
  >,
  data_array: string | string[],
  conversationID: string
) {
  if (
    !!convoHistory &&
    (typeof data_array === "string"
      ? data_array.length > 0
      : data_array.length > 0)
  ) {
    const previousHistory = { ...convoHistory };
    const currentConvo = previousHistory[conversationID];

    // Check if currentConvo exists and has messages
    if (!currentConvo || !currentConvo.messages) {
      console.error("Conversation or messages not found");
      return;
    }

    const messages = currentConvo.messages;
    const lastItemIndex = messages.length - 1;
    const lastItem = messages[lastItemIndex];

    if (typeof data_array === "object") {
      data_array = data_array.join("");
    }

    if (lastItem?.type === "bot") {
      if (
        (lastItem.response !== data_array || !lastItem.response) &&
        !lastItem.isImage
      ) {
        lastItem.response = data_array;
        lastItem.loading = false;
        lastItem.date = fetchDate();
      }

      setConvoHistory(previousHistory);
    }
  }
}

export default function MainChat() {
  const { convoHistory, setConvoHistory } = useConvoHistory();
  const { setUserData } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const { convoMessages, setConvoMessages } = useConvo();

  const [searchbarText, setSearchbarText] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const convoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { convoIdParam } = useParams<{ convoIdParam: string }>();
  const [convoIdParamState, setConvoIdParamState] = useState<string | null>(
    null
  );

  useEffect(() => {
    setConvoIdParamState(convoIdParam ?? null);
  }, [convoIdParam]);

  const focusInput = () => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 10);
  };

  const fetchConversationDescription = async (
    searchbarText: string
  ): Promise<string> => {
    const response = await api.post(
      "/chat",
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

  useEffect(() => {
    convoRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [convoHistory]);

  useEffect(() => {
    if (convoIdParamState && convoHistory) {
      const currentConvo = convoHistory[convoIdParamState];
      if (currentConvo) setConvoMessages(currentConvo.messages);
    }
  }, [convoHistory, convoIdParamState]);

  useEffect(() => {
    // LoadTranslationModel();
    const fetchUserInfo = async () => {
      try {
        const response = await apiauth.get("/auth/me", {
          withCredentials: true,
        });

        setUserData(
          response?.data?.first_name,
          response?.data?.last_name,
          response?.data?.id,
          response?.data?.profile_picture
        );
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    console.log(convoHistory);
  }, [convoHistory]);

  useEffect(() => {
    setLastBotItem(convoHistory, setConvoHistory, data, convoIdParamState!);
  }, [data, convoHistory]);

  const fetchData = async (searchbarText: string) => {
    const currentMessages: MessageType[] = [
      {
        type: "user",
        response: searchbarText,
        date: fetchDate(),
      },
      {
        type: "bot",
        response: "",
        date: "",
        loading: true,
      },
    ];

    if (!convoIdParamState) {
      const convoID = crypto.randomUUID();
      navigate(`/try/chat/${convoID}`);
      setConvoMessages([]);

      setConvoHistory((oldHistory) => ({
        ...oldHistory,
        [convoID]: {
          ...oldHistory[convoID],
          description: "New Chat",
          messages: [
            ...(oldHistory[convoID]?.messages || []),
            ...currentMessages,
          ],
        },
      }));
    } else {
      setConvoHistory((oldHistory) => ({
        ...oldHistory,
        [convoIdParamState!]: {
          ...oldHistory[convoIdParamState!],
          description: "New Chat",
          messages: [
            ...(oldHistory[convoIdParamState!]?.messages || []),
            ...currentMessages,
          ],
        },
      }));
    }

    const controller = new AbortController();
    await fetchEventSource(`${import.meta.env.VITE_BACKEND_URL}chat-stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      signal: controller.signal,
      body: JSON.stringify({ message: searchbarText }),

      onmessage(event) {
        if (event.data == "[DONE]") {
          fetchConversationDescription(searchbarText).then((description) => {
            setConvoHistory((oldHistory) => ({
              ...oldHistory,
              [convoIdParamState!]: {
                ...oldHistory[convoIdParamState!],
                description: description || "New Chat",
              },
            }));
          });

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
        // if (typeof response === "object") checkIntent(response, controller);
        if (response === "") setData((data) => [...data, "\n"]);
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

  const handleFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!searchbarText) return;
    setLoading(true);
    fetchData(searchbarText);
    setSearchbarText("");
  };

  return (
    <>
      <ScrollArea>
        <div className="conversation_history" ref={convoRef}>
          {!!convoHistory && !!convoMessages && convoMessages.length > 0 ? (
            convoMessages.map((message, index) =>
              message.type === "bot" ? (
                <ChatBubbleBot
                  text={message.response}
                  key={index}
                  loading={message.loading}
                  index={index}
                  isImage={message.isImage}
                  image={message.imageUrl}
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
                  filename={message.filename || undefined}
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
