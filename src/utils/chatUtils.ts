// utils/chatUtils.ts

import { apiauth } from "@/utils/apiaxios";
import { MessageType } from "@/types/ConvoTypes";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export const fetchConversationDescription = async (
  searchbarText: string
): Promise<string> => {
  const response = await apiauth.post(
    "/chat",
    {
      message: `Summarise what the message/question '${searchbarText}' is about, in under 3-4 words from a 3rd person perspective. Just respond with the summary. Exclude any double quotes or titles.`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response?.data?.response?.toString().replace('"', "") || "New Chat";
};

export const ApiService = {
  fetchMessages: async (conversationId: string) => {
    const response = await apiauth.get(`/conversations/${conversationId}`);
    return response?.data?.messages;
  },

  createConversation: async (convoID: string) => {
    await apiauth.post("/conversations", {
      conversation_id: convoID,
    });
  },

  deleteAllConversations: async () => {
    await apiauth.delete(`/conversations`);
  },

  updateConversation: async (
    conversationId: string,
    messages: MessageType[]
  ) => {
    if (messages.length > 1)
      await apiauth.put(`/conversations/${conversationId}/messages`, {
        conversation_id: conversationId,
        messages,
      });
  },

  fetchChatStream: async (
    inputText: string,
    convoMessages: MessageType[],
    onMessage: (data: string) => void,
    onClose: () => void,
    onError: (err: any) => void
  ) => {
    convoMessages.push({ type: "user", response: inputText });

    const controller = new AbortController();
    await fetchEventSource(`${import.meta.env.VITE_BACKEND_URL}chat-stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      signal: controller.signal,
      body: JSON.stringify({
        message: inputText,
        messages: convoMessages
          .slice(-10)
          .filter(({ response }) => response.length > 0)
          // .filter(({ type }) => type == "user")
          .map(({ type, response }, index, array) => ({
            role: type,
            content: `mostRecent: ${index === array.length - 1} ${response}`,
          })),
      }),
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
    userFirstMessage: string,
    fetchConversations: () => void,
    llm: boolean = true
  ) => {
    const response = await apiauth.put(
      `/conversations/${conversationId}/description${llm ? "/llm" : ""}`,
      {
        userFirstMessage,
      }
    );
    fetchConversations();

    return response.data;
  },
};
