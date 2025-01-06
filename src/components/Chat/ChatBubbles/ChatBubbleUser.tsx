import { ChatBubbleUserProps } from "@/types/ChatBubbleTypes";
import { Chip } from "@nextui-org/chip";
import { parseDate } from "../../../utils/fetchDate";
import { PdfContainer } from "../../Documents/PdfComponent";

export default function ChatBubbleUser({
  text,
  subtype = null,
  file = null,
  filename,
  date,
}: ChatBubbleUserProps) {
  return (
    (!!text || !!file) && (
      <div className="chat_bubble_container user">
        <div className="chat_bubble user">
          {!!text && (
            <div className="flex select-text text-wrap max-w-[30vw]">
              {text}
            </div>
          )}

          {subtype === "image" && typeof file === "string" && (
            <div className="flex flex-col items-center gap-2 max-w-[250px] whitespace-nowrap text-ellipsis overflow-hidden">
              <img
                src={file} // Ensured this is a string by checking the type
                width={"250px"}
                height={"250px"}
                content-type="image/png"
                className="rounded-2xl mt-1"
              />
              {filename && (
                <Chip
                  color="default"
                  size="sm"
                  className="text-white bg-opacity-70 max-w-[250px]"
                >
                  {filename}
                </Chip>
              )}
            </div>
          )}

          {subtype === "pdf" && file instanceof File && (
            <PdfContainer file={file} chat_bubble={true} />
          )}
        </div>
        <div className="flex justify-end">
          {date && (
            <span className="text-xs text-white text-opacity-45 flex flex-col select-text pt-[2px]">
              {parseDate(date)}
            </span>
          )}
        </div>
      </div>
    )
  );
}
