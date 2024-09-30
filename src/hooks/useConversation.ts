// useConversation.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useConvoHistory } from "@/contexts/ConversationHistory";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { MessageType } from "@/types/ConvoTypes";
import fetchDate from "@/components/Chat/fetchDate";
import { ApiService, fetchConversationDescription } from "@/utils/chatUtils";

export const useConversation = (convoIdParam: string | null) => {
  const navigate = useNavigate();
  const { setConvoHistory } = useConvoHistory();
  const { setConvoMessages } = useConvo();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    if (!convoIdParam) {
      navigate("/try/chat");
    } else {
      fetchMessages(convoIdParam);
    }
  }, [convoIdParam]);

  const fetchMessages = async (conversationId: string) => {
    try {
      const messages = await ApiService.fetchMessages(conversationId);
      setConvoMessages(messages);
    } catch (e) {
      console.error("Failed to fetch messages:", e);
      navigate("/try/chat");
    }
  };

  const createNewConversation = async (currentMessages: MessageType[]) => {
    try {
      const convoID = crypto.randomUUID();
      await ApiService.createConversation(convoID, currentMessages[0]);

      setConvoMessages([]);
      setConvoHistory((oldHistory) => ({
        ...oldHistory,
        [convoID]: { description: "New Chat", messages: currentMessages },
      }));

      navigate(`/try/chat/${convoID}`);
      return convoID;
    } catch (err) {
      console.error("Failed to create conversation:", err);
      return null;
    }
  };

  const updateExistingConversation = (
    conversationId: string,
    currentMessages: MessageType[]
  ) => {
    setConvoHistory((oldHistory) => ({
      ...oldHistory,
      [conversationId]: {
        ...oldHistory[conversationId],
        messages: [
          ...(oldHistory[conversationId]?.messages || []),
          ...currentMessages,
        ],
      },
    }));
  };

  const fetchChatStream = async (
    inputText: string,
    currentMessages: MessageType[],
    conversationId: string
  ) => {
    let streamData: string[] = [];

    const onMessage = (response: string) => {
      streamData.push(response);
      setData([...streamData]);
    };

    const onClose = async () => {
      try {
        // Create a new bot message with the complete response
        const botResponse: MessageType = {
          type: "bot",
          response: streamData.join(""),
          date: fetchDate(),
          loading: false,
        };

        // Update currentMessages with the complete bot response
        currentMessages[currentMessages.length - 1] = botResponse;

        // Update the conversation in the backend
        await ApiService.updateConversation(conversationId, currentMessages);

        // Update the conversation history state
        setConvoHistory((oldHistory) => ({
          ...oldHistory,
          [conversationId]: {
            ...oldHistory[conversationId],
            messages: [
              ...(oldHistory[conversationId]?.messages || []),
              ...currentMessages,
            ],
          },
        }));

        // Update conversation messages state
        setConvoMessages((oldMessages) => [...oldMessages, ...currentMessages]);

        const description = await fetchConversationDescription(inputText);
        setConvoHistory((oldHistory) => ({
          ...oldHistory,
          [conversationId]: {
            ...oldHistory[conversationId],
            description: description || "New Chat",
          },
        }));
        await ApiService.updateConversationDescription(
          conversationId,
          description || "New Chat"
        );
      } catch (err) {
        console.error("Failed to update conversation:", err);
      }
      setData([]);
      setLoading(false);
    };

    const onError = (err: any) => {
      console.error("Error from server:", err);
      setData([]);
      setLoading(false);
    };

    await ApiService.fetchChatStream(inputText, onMessage, onClose, onError);
  };

  const updateConversation = async (inputText: string) => {
    setLoading(true);
    const currentMessages: MessageType[] = [
      { type: "user", response: inputText, date: fetchDate() },
      { type: "bot", response: "", date: "", loading: true },
    ];

    let conversationId: string | null;
    if (!convoIdParam) {
      conversationId = await createNewConversation(currentMessages);
      if (!conversationId) {
        setLoading(false);
        return;
      }
    } else {
      conversationId = convoIdParam;
      updateExistingConversation(conversationId, currentMessages);
    }

    await fetchChatStream(inputText, currentMessages, conversationId);
  };

  return { loading, data, updateConversation };
};
