export interface ChatBubbleUserProps {
  text?: string;
  subtype?: "image" | "pdf" | null;
  file?: File | null | string;
  filename?: string;
  date: string;
}

export interface ChatBubbleBotProps {
  index: number;
  text: string;
  loading?: boolean;
  isImage?: boolean;
  image?: string | null;
  imagePrompt?: string;
  disclaimer?: string;
  date: string;
  userinputType?: string;
}
