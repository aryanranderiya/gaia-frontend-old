import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useConvoHistory } from "@/contexts/ConversationHistory";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { MessageType } from "@/types/ConvoTypes";
import fetchDate from "@/components/Chat/fetchDate";
import { ApiService, fetchConversationDescription } from "@/utils/chatUtils";
import { useConversationList } from "@/contexts/ConversationList";

export const useConversation = (convoIdParam: string | null) => {
  const navigate = useNavigate();
  const { setConvoHistory } = useConvoHistory();
  const { setConvoMessages } = useConvo();
  const { fetchConversations } = useConversationList();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    convoIdParam ? fetchMessages(convoIdParam) : navigate("/try/chat");
  }, [convoIdParam]);

  // If conversation exists
  const fetchMessages = async (conversationId: string) => {
    try {
      const messages = await ApiService.fetchMessages(conversationId);
      setConvoMessages(messages);
    } catch (e) {
      console.error("Failed to fetch messages:", e);
      navigate("/try/chat");
    }
  };

  const handleConvoHistoryUpdate = (
    conversationId: string,
    newMessages: MessageType[],
    description?: string
  ) => {
    setConvoHistory((oldHistory) => ({
      ...oldHistory,
      [conversationId]: {
        ...oldHistory[conversationId],
        description:
          description || oldHistory[conversationId]?.description || "New Chat",
        messages: [
          ...(oldHistory[conversationId]?.messages || []),
          ...newMessages,
        ],
      },
    }));
  };

  const createNewConversation = async (currentMessages: MessageType[]) => {
    try {
      const conversationId = crypto.randomUUID();
      await ApiService.createConversation(conversationId, currentMessages[0]);

      console.log("ARYAN RANDERIYA", currentMessages);

      setConvoMessages(currentMessages);
      handleConvoHistoryUpdate(conversationId, currentMessages, "New Chat");
      navigate(`/try/chat/${conversationId}`);

      await fetchConversationDescription(
        JSON.stringify(currentMessages[0])
      ).then((description) => {
        handleConvoHistoryUpdate(conversationId, currentMessages, description);
        return ApiService.updateConversationDescription(
          conversationId,
          description || "New Chat"
        );
      });

      fetchConversations();

      return conversationId;
    } catch (err) {
      console.error("Failed to create conversation:", err);
      return null;
    }
  };

  const fetchChatStream = async (
    inputText: string,
    currentMessages: MessageType[],
    conversationId: string
  ) => {
    let botResponseText = "";
    setLoading(true);

    const onMessage = (response: string) => {
      botResponseText += response;
      console.log(response);

      const botResponse: MessageType = {
        type: "bot",
        response: botResponseText,
        date: fetchDate(),
      };
      setConvoMessages((oldMessages) => [
        ...oldMessages.slice(
          0,
          oldMessages.length > 1 ? -1 : oldMessages.length
        ),
        botResponse,
      ]);
    };

    const onClose = async () => {
      const finalizedBotResponse: MessageType = {
        type: "bot",
        response: botResponseText,
        date: fetchDate(),
        loading: false,
      };
      currentMessages[currentMessages.length - 1] = finalizedBotResponse;

      try {
        // console.log("currentMessages", currentMessages);
        // if (currentMessages.length <= 2) currentMessages.shift();
        // console.log("currentMessages2", currentMessages);
        // fetchConversations();
        // setConvoMessages((oldMessages) => [
        //   ...oldMessages.slice(0, -1),
        //   finalizedBotResponse,
        // ]);
        await ApiService.updateConversation(conversationId, currentMessages);
      } catch (err) {
        console.error("Failed to update conversation:", err);
      } finally {
        setLoading(false);
      }
    };

    const onError = (err: any) => {
      console.error("Error from server:", err);
      setLoading(false);
    };

    await ApiService.fetchChatStream(inputText, onMessage, onClose, onError);
  };

  const updateConversation = async (inputText: string) => {
    const currentMessages: MessageType[] = [
      {
        type: "user",
        response: inputText,
        date: fetchDate(),
      },
      { type: "bot", response: "", date: fetchDate() },
    ];

    // If no existing conversation, create a new one.
    const conversationId =
      convoIdParam || (await createNewConversation(currentMessages));

    if (!conversationId) return setLoading(false);

    // If conversation ID exists, update history and set messages only once.
    if (convoIdParam) {
      handleConvoHistoryUpdate(conversationId, currentMessages);
      setConvoMessages((oldMessages) => [...oldMessages, ...currentMessages]);
    }

    // Start fetching bot response stream.
    await fetchChatStream(inputText, currentMessages, conversationId);
  };

  return { loading, updateConversation };
};
