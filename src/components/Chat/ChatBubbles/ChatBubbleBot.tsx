import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { AlertTriangleIcon, ArrowUpRight, Check, Loader2 } from "lucide-react";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import { parseDate } from "../../../utils/fetchDate";
import { GoogleCalendar, InternetIcon } from "../../Misc/icons";
import { CustomAnchor } from "../MarkdownRenderer";

import {
  ChatBubble_Actions,
  ChatBubble_Actions_Image,
} from "./ChatBubble_Actions";

import { apiauth } from "@/utils/apiaxios";
import { ChatBubbleBotProps } from "@/types/chatBubbleTypes";
import SuspenseLoader from "@/components/Misc/SuspenseLoader";

const MarkdownRenderer = lazy(() => import("../MarkdownRenderer"));

export default function ChatBubbleBot({
  text,
  loading = false,
  isImage = false,
  imageSrc = null,
  disclaimer,
  date,
  imagePrompt,
  improvedImagePrompt,
  // userinputType,
  setOpenImage,
  setImageData,
  searchWeb = false,
  pageFetchURL,
  filename,
  message_id,
  pinned,
  intent,
  calendar_options,
}: ChatBubbleBotProps) {
  const [eventAddLoading, setEventAddLoading] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fileScanningText, setFileScanningText] = useState(
    "Uploading Document...",
  );

  // Update file scanning text while the document is processing
  useEffect(() => {
    if (loading && !!filename) {
      const updateFileScanningText = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2500));
        setFileScanningText("Processing File...Please Wait");

        await new Promise((resolve) => setTimeout(resolve, 2500));
        setFileScanningText("Document analysis in progress...");

        await new Promise((resolve) => setTimeout(resolve, 2500));
        setFileScanningText("Converting file format...");

        await new Promise((resolve) => setTimeout(resolve, 3000));
        setFileScanningText("Extracting text from document...");

        await new Promise((resolve) => setTimeout(resolve, 4000));
        setFileScanningText("Analyzing document content...");

        await new Promise((resolve) => setTimeout(resolve, 5000));
        setFileScanningText("Processing document... Please wait...");

        await new Promise((resolve) => setTimeout(resolve, 5000));
        setFileScanningText("Document upload complete, processing metadata...");
      };

      updateFileScanningText();
    }
  }, [filename, loading]);

  // Memoized callback to add event to the calendar
  const addToCalendar = useCallback(async () => {
    try {
      setEventAddLoading(true);
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const response = await apiauth.post(`/calendar/event`, {
        summary: calendar_options?.summary,
        description: calendar_options?.description,
        start: calendar_options?.start,
        end: calendar_options?.end,
        timezone: userTimeZone,
      });

      toast.success("Event has been added to Calendar!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add event to Calendar!");
    } finally {
      setEventAddLoading(false);
    }
  }, [calendar_options]);

  // Memoize the rendered component to avoid recalculations unless dependencies change
  const renderedComponent = useMemo(() => {
    if (isImage) {
      return (
        <>
          <div className="chat_bubble bg-zinc-800">
            <div className="text-sm font-medium w-full flex flex-col gap-2 flex-wrap max-w-[350px] my-1">
              <span>{text}</span>
              <Skeleton
                className="rounded-3xl my-2 max-w-[250px] min-w-[250px] max-h-[250px] min-h-[250px] aspect-square"
                isLoaded={!loading && !imageLoaded && !!imageSrc}
              >
                <img
                  alt={"Generated Image"}
                  className="rounded-3xl my-2 !cursor-pointer"
                  height="250px"
                  src={imageSrc as string}
                  width="250px"
                  onClick={() => {
                    if (imageSrc) {
                      setOpenImage(true);
                      setImageData({
                        prompt: imagePrompt,
                        src: imageSrc,
                        improvedPrompt: improvedImagePrompt,
                      });
                    }
                  }}
                  onError={() => setImageLoaded(true)}
                  onLoad={() => setImageLoaded(true)}
                />
              </Skeleton>
              {imagePrompt && (
                <div className="flex gap-1 justify-start flex-wrap max-w-[250px]">
                  {imagePrompt.split(",").map((keyword, index) => (
                    <Chip
                      key={index}
                      className="text-wrap min-h-fit py-1"
                      color="default"
                      radius="md"
                      size="sm"
                    >
                      {keyword.trim()}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </div>
          {date && (
            <span className="text-xs text-white text-opacity-40 flex flex-col select-text pt-1">
              {parseDate(date)}
            </span>
          )}
        </>
      );
    } else {
      return (
        <>
          <div className="chat_bubble bg-zinc-800">
            <div className="flex flex-col gap-3">
              {searchWeb && (
                <Chip
                  color="primary"
                  startContent={<InternetIcon color="#00bbff" height={20} />}
                  variant="flat"
                >
                  <div className="font-medium flex items-center gap-1 text-primary">
                    Live Search Results from the Web
                  </div>
                </Chip>
              )}

              {!!pageFetchURL && (
                <Chip
                  color="primary"
                  startContent={<ArrowUpRight color="#00bbff" height={20} />}
                  variant="flat"
                >
                  <div className="font-medium flex items-center gap-1 text-primary">
                    Fetched{" "}
                    <CustomAnchor
                      props={{
                        href: pageFetchURL,
                        children: pageFetchURL.replace(/^https?:\/\//, ""),
                      }}
                    />
                  </div>
                </Chip>
              )}

              {!!filename && (
                <Chip color="primary" size="lg" variant="flat">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2
                        className="animate-spin text-white"
                        height={17}
                        width={17}
                      />
                      {fileScanningText}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Check className="text-white" height={17} width={17} />
                      Document Uploaded!
                    </div>
                  )}
                </Chip>
              )}

              {!!text && (
                <Suspense fallback={<SuspenseLoader />}>
                  <MarkdownRenderer content={text.toString()} />
                </Suspense>
              )}

              {!!disclaimer && (
                <Chip
                  className="text-xs font-medium text-warning-500"
                  color="warning"
                  size="sm"
                  startContent={
                    <AlertTriangleIcon
                      className="text-warning-500"
                      height="17"
                    />
                  }
                  variant="flat"
                >
                  {disclaimer}
                </Chip>
              )}
            </div>
          </div>

          {intent === "calendar" &&
            calendar_options?.start &&
            calendar_options?.end &&
            calendar_options?.summary &&
            calendar_options?.description && (
              <div className="p-3 bg-zinc-800 rounded-2xl mt-2 flex gap-1 flex-col">
                <div>Would you like to add this event to your Calendar?</div>

                <div className="bg-zinc-900 p-3 flex flex-row rounded-xl items-start gap-3">
                  <GoogleCalendar height={35} width={25} />
                  <div className="flex flex-col gap-1">
                    <div>
                      <div className="font-medium">
                        {calendar_options?.summary}
                      </div>
                      <div className="text-sm">
                        {calendar_options?.description}
                      </div>
                    </div>
                    <div className="text-xs text-foreground-500">
                      From{" "}
                      {calendar_options?.start
                        ? String(
                            new Date(calendar_options.start).toDateString(),
                          )
                        : ""}
                    </div>
                    <div className="text-xs text-foreground-500">
                      To{" "}
                      {calendar_options?.end
                        ? String(new Date(calendar_options.end).toDateString())
                        : ""}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  color="primary"
                  isLoading={eventAddLoading}
                  onPress={addToCalendar}
                >
                  Add Event
                </Button>
              </div>
            )}

          {date && (
            <span className="text-xs text-white text-opacity-40 flex flex-col select-text p-1">
              {parseDate(date)}
            </span>
          )}
        </>
      );
    }
  }, [
    isImage,
    text,
    loading,
    imageLoaded,
    imageSrc,
    setOpenImage,
    setImageData,
    imagePrompt,
    improvedImagePrompt,
    date,
    searchWeb,
    pageFetchURL,
    filename,
    fileScanningText,
    disclaimer,
    intent,
    calendar_options,
    eventAddLoading,
  ]);

  // Memoized mouse event handlers to prevent unnecessary re-renders
  const actionsRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = useCallback(() => {
    if (actionsRef.current) {
      actionsRef.current.style.opacity = "1";
      actionsRef.current.style.visibility = "visible";
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    if (actionsRef.current) {
      actionsRef.current.style.opacity = "0";
      actionsRef.current.style.visibility = "hidden";
    }
  }, []);

  return (
    (!!text || loading || isImage) && (
      <div
        id={message_id}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
      >
        <div className="chatbubblebot_parent">
          <div className="chat_bubble_container">{renderedComponent}</div>
        </div>

        {!loading && (
          <div
            ref={actionsRef}
            className="transition-all"
            style={{ opacity: 0, visibility: "hidden" }}
          >
            {isImage ? (
              <ChatBubble_Actions_Image
                imagePrompt={imagePrompt}
                src={imageSrc as string}
              />
            ) : (
              <ChatBubble_Actions
                loading={loading}
                message_id={message_id}
                pinned={pinned}
                text={text}
              />
            )}
          </div>
        )}
      </div>
    )
  );
}
