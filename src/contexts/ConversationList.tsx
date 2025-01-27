import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiauth } from "@/utils/apiaxios";

// Define the context type
interface Conversation {
  conversation_id: string;
  description: string;
  starred: boolean;
  createdAt: string;
}

interface ConversationContextType {
  conversations: Conversation[];
  fetchConversations: () => Promise<void>;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

// Create the context
const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

// Provide the context
export const ConversationListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const fetchConversations = async () => {
    try {
      const response = await apiauth.get("/conversations");
      setConversations(response?.data?.conversations || []);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <ConversationContext.Provider
      value={{ conversations, fetchConversations, setConversations }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

// Custom hook to use the conversation context
export const useConversationList = (): ConversationContextType => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversations must be used within a ConversationProvider"
    );
  }
  return context;
};
