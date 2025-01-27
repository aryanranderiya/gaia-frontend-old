import { useConversationList } from "@/contexts/ConversationList";
import { useConvo } from "@/contexts/CurrentConvoMessages";
import { useLoading } from "@/contexts/LoadingContext";
import { MessageType } from "@/types/ConvoTypes";
import { ApiService } from "@/utils/chatUtils";
import fetchDate from "@/utils/fetchDate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";

export const useConversation = (convoIdParam: string | null) => {
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const { convoMessages, setConvoMessages } = useConvo();
  const { fetchConversations } = useConversationList();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    convoIdParam ? fetchMessages(convoIdParam) : navigate("/try/chat");
  }, [convoIdParam]);

  const fetchMessages = async (conversationId: string) => {
    try {
      const messages = await ApiService.fetchMessages(conversationId);
      if (messages.length > 1) setConvoMessages(messages);
    } catch (e) {
      console.error("Failed to fetch messages:", e);
      navigate("/try/chat");
    }
  };

  const createNewConversation = async (currentMessages: MessageType[]) => {
    try {
      const conversationId = uuidv1();

      await ApiService.createConversation(conversationId);

      setTimeout(() => {
        ApiService.updateConversationDescription(
          conversationId,
          JSON.stringify(currentMessages[0]?.response || currentMessages[0]),
          fetchConversations
        );
      }, 1000);

      navigate(`/try/chat/${conversationId}`);

      return conversationId;
    } catch (err) {
      console.error("Failed to create conversation:", err);
      return null;
    }
  };

  const fetchChatStream = async (
    inputText: string,
    currentMessages: MessageType[],
    conversationId: string,
    enableSearch: boolean,
    pageFetchURL: string
  ) => {
    let botResponseText = "";
    setLoading(true);

    const onMessage = (response: string) => {
      botResponseText += response;
      const botResponse: MessageType = {
        type: "bot",
        response: botResponseText,
        searchWeb: enableSearch,
        pageFetchURL,
        date: fetchDate(),
      };

      setConvoMessages((oldMessages = []) => {
        // If there are no messages yet, start the conversation with the user message followed by the bot response
        if (oldMessages.length === 0) return [currentMessages[0], botResponse];

        // If the last message was a user message, append the bot response to it
        const lastMessage = oldMessages[oldMessages.length - 1];
        if (lastMessage.type === "user") return [...oldMessages, botResponse];

        return [
          ...oldMessages.slice(0, -1),
          { ...lastMessage, response: botResponseText },
        ];
      });
    };

    const onClose = async () => {
      const finalizedBotResponse: MessageType = {
        type: "bot",
        response: botResponseText,
        date: fetchDate(),
        loading: false,
        searchWeb: enableSearch,
        pageFetchURL,
      };

      currentMessages[currentMessages.length - 1] = finalizedBotResponse;

      try {
        await ApiService.updateConversation(conversationId, currentMessages);
      } catch (err) {
        console.error("Failed to update conversation:", err);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    const onError = (err: any) => {
      console.error("Error from server:", err);
      setLoading(false);
    };

    await ApiService.fetchChatStream(
      inputText,
      enableSearch,
      pageFetchURL,
      convoMessages,
      conversationId,
      onMessage,
      onClose,
      onError
    );
  };

  const updateConversation = async (
    inputText: string,
    enableSearch: boolean = false,
    pageFetchURL: string
  ) => {
    const currentMessages: MessageType[] = [
      {
        type: "user",
        response: inputText,
        searchWeb: enableSearch,
        pageFetchURL,
        date: fetchDate(),
      },
      {
        searchWeb: enableSearch,
        pageFetchURL,
        type: "bot",
        response: "",
        date: fetchDate(),
      },
    ];

    setConvoMessages((oldMessages) => {
      return oldMessages && oldMessages?.length > 0 // If there are no messages in the convo history set only the current message
        ? [...oldMessages, ...currentMessages]
        : [...currentMessages];
    });

    // If no existing conversation, create a new one.
    const conversationId =
      convoIdParam || (await createNewConversation(currentMessages));

    if (!conversationId) return setLoading(false);

    // Start fetching bot response stream.
    await fetchChatStream(
      inputText,
      currentMessages,
      conversationId,
      enableSearch,
      pageFetchURL
    );
  };

  return { loading, updateConversation };
};
