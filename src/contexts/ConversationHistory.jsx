import React, { createContext, useState, useContext } from "react";

export const ConversationHistoryContext = createContext();

export const ConversationHistoryProvider = ({ children }) => {
  const [conversationHistory, setConversationHistory] = useState([]);

  return (
    <ConversationHistoryContext.Provider
      value={{ conversationHistory, setConversationHistory }}
    >
      {children}
    </ConversationHistoryContext.Provider>
  );
};

export const useConvoHistory = () => {
  return useContext(ConversationHistoryContext);
};
