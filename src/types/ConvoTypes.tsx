// Define the date type returned by fetchDate()
// This type is used to represent a structured date format with fields for full date, time, day, month, and year.
export type DateType = {
  fullDate: string; // Full date in a string format, e.g., "September 22, 2024"
  time: string; // Time in a string format, e.g., "10:45 AM"
  date: number; // Day of the month as a number, e.g., 22
  month: string; // Month as a string, e.g., "September"
  year: string; // Year as a string, e.g., "2024"
};

// Define the structure for each message in the conversation
// This type represents an individual message, including details about whether it's from the user or bot,
// the content of the message, its date, and optional fields for loading state, images, files, etc.
export type MessageType = {
  type: "user" | "bot"; // Indicates whether the message is from the "user" or the "bot"
  response: string; // The content of the message, typically text
  date: DateType | ""; // The date when the message was sent, formatted as DateType, or an empty string
  loading?: boolean; // Optional: Indicates whether the message is still loading (e.g., for bot responses)
  isImage?: boolean; // Optional: Indicates if the message contains an image
  imageUrl?: string; // Optional: URL for the image if it's an image message
  disclaimer?: string; // Optional: Any disclaimer associated with the message (e.g., for AI-generated content)
  userinputType?: string; // Optional: Specifies the type of user input, if any (e.g., "text", "file")
  subtype?: "image" | "pdf" | null; // Optional: Specifies the type of file if the message contains a file (e.g., image or PDF)
  file?: File | null; // Optional: A file object associated with the message, if any
  filename?: string; // Optional: Name of the file if there's a file included
};

// Define the structure for a single conversation
// This type represents an individual conversation, with a description and an array of messages.
export type ConversationType = {
  description: string; // A description or title of the conversation
  messages: MessageType[]; // An array of MessageType, representing the messages exchanged in the conversation
};

// Define the conversation history structure
// This type represents the conversation history, where each key is a unique identifier for a conversation
// and the value is a ConversationType object containing the details of that conversation.
export type ConversationHistoryType = {
  [key: string]: ConversationType; // A map where the key is a conversation ID and the value is the ConversationType object
};
