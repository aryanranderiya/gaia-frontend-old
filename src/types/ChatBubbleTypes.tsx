export interface ChatBubbleUserProps {
  text?: string;
  subtype?: "image" | "pdf" | null;
  file?: File | null | string;
  filename?: string;
  searchWeb?: boolean;
  pageFetchURL?: string;
  date?: string;
}

export interface ChatBubbleBotProps {
  // index: number;
  text: string;
  loading?: boolean;
  isImage?: boolean;
  searchWeb?: boolean;
  imageSrc?: string | null;
  imagePrompt?: string;
  improvedImagePrompt?: string;
  disclaimer?: string;
  date?: string;
  userinputType?: string;
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  setImageData: any;
  pageFetchURL?: string;
  filename?: string;
  // setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  // setImagePrompt: React.Dispatch<React.SetStateAction<string>>;
}
