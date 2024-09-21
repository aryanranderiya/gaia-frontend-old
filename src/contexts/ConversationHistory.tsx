import { ConversationHistoryType } from "@/types/ConvoTypes";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context
interface ConversationHistoryContextType {
  convoHistory: ConversationHistoryType;
  setConvoHistory: React.Dispatch<
    React.SetStateAction<ConversationHistoryType>
  >;
}

// Create the context with an initial undefined value
export const ConversationHistoryContext = createContext<
  ConversationHistoryContextType | undefined
>(undefined);

// Props type for the provider component
interface ConversationHistoryProviderProps {
  children: ReactNode;
}

export const ConversationHistoryProvider: React.FC<
  ConversationHistoryProviderProps
> = ({ children }) => {
  const [conversationHistory, setConversationHistory] =
    useState<ConversationHistoryType>({});

  return (
    <ConversationHistoryContext.Provider
      value={{
        convoHistory: conversationHistory,
        setConvoHistory: setConversationHistory,
      }}
    >
      {children}
    </ConversationHistoryContext.Provider>
  );
};

export const useConvoHistory = (): ConversationHistoryContextType => {
  const context = useContext(ConversationHistoryContext);
  if (context === undefined) {
    throw new Error(
      "useConvoHistory must be used within a ConversationHistoryProvider"
    );
  }
  return context;
};
