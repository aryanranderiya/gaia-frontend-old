// utils/chatUtils.ts

import { apiauth } from "@/apiaxios";
import fetchDate from "@/components/Chat/fetchDate";
import { ConversationHistoryType } from "@/types/ConvoTypes";
import { MessageType } from "@/types/ConvoTypes";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export const setLastBotItem = (
  convoHistory: ConversationHistoryType,
  setConvoHistory: React.Dispatch<
    React.SetStateAction<ConversationHistoryType>
  >,
  data_array: string | string[],
  conversationID: string
) => {
  if (
    convoHistory &&
    (typeof data_array === "string"
      ? data_array.length > 0
      : data_array.length > 0)
  ) {
    const previousHistory = { ...convoHistory };
    const currentConvo = previousHistory[conversationID];

    if (!currentConvo || !currentConvo.messages) {
      console.error("Conversation or messages not found");
      return;
    }

    const lastItem = currentConvo.messages[currentConvo.messages.length - 1];

    if (typeof data_array === "object") {
      data_array = data_array.join("");
    }

    if (
      lastItem?.type === "bot" &&
      (lastItem.response !== data_array || !lastItem.response) &&
      !lastItem.isImage
    ) {
      lastItem.response = data_array;
      lastItem.loading = false;
      lastItem.date = fetchDate();
      setConvoHistory(previousHistory);
    }
  }
};

export const fetchConversationDescription = async (
  searchbarText: string
): Promise<string> => {
  const response = await apiauth.post(
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

  return response?.data?.response.toString().replace('"', "") || "New Chat";
};

export const ApiService = {
  fetchMessages: async (conversationId: string) => {
    const response = await apiauth.get(`/conversations/${conversationId}`);
    return response?.data?.messages;
  },

  createConversation: async (convoID: string, message: MessageType) => {
    await apiauth.post("/conversations/", {
      conversation_id: convoID,
      messages: [message],
    });
  },

  updateConversation: async (
    conversationId: string,
    messages: MessageType[]
  ) => {
    await apiauth.put(`/conversations/${conversationId}/messages/`, {
      conversation_id: conversationId,
      messages,
    });
  },

  fetchChatStream: async (
    inputText: string,
    onMessage: (data: string) => void,
    onClose: () => void,
    onError: (err: any) => void
  ) => {
    const controller = new AbortController();
    await fetchEventSource(`${import.meta.env.VITE_BACKEND_URL}chat-stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      signal: controller.signal,
      body: JSON.stringify({ message: inputText }),
      onmessage(event) {
        if (event.data === "[DONE]") {
          onClose();
          controller.abort();
          return;
        }
        const dataJson = JSON.parse(event.data);
        const response = dataJson.response || "\n";
        onMessage(response);
      },
      onclose: onClose,
      onerror: onError,
    });
  },

  updateConversationDescription: async (
    conversationId: string,
    description: string
  ) => {
    await apiauth.put(`/conversations/${conversationId}/description/`, {
      description,
    });
  },
};
