// Define the date type returned by fetchDate()
// This type is used to represent a structured date format with fields for full date, time, day, month, and year.
export type DateType = {
  fullDate: string; // Full date in a string format, e.g., "September 22, 2024"
  time: string; // Time in a string format, e.g., "10:45 AM"
  date: number; // Day of the month as a number, e.g., 22
  month: string; // Month as a string, e.g., "September"
  year: string; // Year as a string, e.g., "2024"
};

export interface ChatBubbleUserProps {
  text?: string;
  subtype?: "image" | "pdf" | null;
  file?: File | null | string;
  filename?: string;
  date: string | DateType;
}

export interface ChatBubbleBotProps {
  index: number;
  text: string;
  loading?: boolean;
  isImage?: boolean;
  image?: string | null;
  disclaimer?: string;
  date: string | DateType;
  userinputType?: string;
}
