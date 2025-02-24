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

const convertToUserTimezone = (isoString: string) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("en-US", {
    timeZone: userTimezone,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

// const isoString = "2025-02-24T09:00:00+00:00";
// console.log(convertToUserTimezone(isoString));

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fileScanningText, setFileScanningText] = useState(
    "Uploading Document..."
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

  const [eventLoadingStates, setEventLoadingStates] = useState<
    Record<number, boolean>
  >({});

  const addSingleEventToCalendar = useCallback(
    async (option: any, index: number) => {
      // Set loading state for this specific event
      setEventLoadingStates((prev) => ({ ...prev, [index]: true }));
      try {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await apiauth.post(`/calendar/event`, {
          summary: option.summary,
          description: option.description,
          start: option.start,
          end: option.end,
          timezone: userTimeZone,
        });
        toast.success("Added event to calendar!", {
          description: option.description,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to add event to calendar!");
      } finally {
        // Reset loading state for this event
        setEventLoadingStates((prev) => ({ ...prev, [index]: false }));
      }
    },
    []
  );
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
            calendar_options &&
            (() => {
              // Always treat calendar_options as an array
              const eventsArray = Array.isArray(calendar_options)
                ? calendar_options
                : [calendar_options];

              // Only render if each event has the required fields
              if (
                !eventsArray.every(
                  (option) =>
                    option.start &&
                    option.end &&
                    option.summary &&
                    option.description
                )
              )
                return "could not add event";
              // return null;

              return (
                <div className="p-3 bg-zinc-800 rounded-2xl mt-2 flex gap-1 flex-col">
                  <div>
                    Would you like to add{" "}
                    {eventsArray.length === 1 ? "this event" : "these events"}{" "}
                    to your Calendar?
                  </div>
                  {eventsArray.map((option, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900 p-3 flex flex-col rounded-xl items-start gap-3"
                    >
                      <div className="flex flex-row items-start gap-4">
                        <GoogleCalendar height={35} width={25} />
                        <div className="flex flex-col gap-1 flex-1">
                          <div>
                            <div className="font-medium">{option.summary}</div>
                            <div className="text-sm max-w-[300px]">
                              {option.description}
                            </div>
                          </div>
                          <div className="text-xs text-foreground-500">
                            From {option.start}
                            {option.start
                              ? convertToUserTimezone(option.start)
                              : ""}
                          </div>
                          <div className="text-xs text-foreground-500">
                            To {option.end ? parseDate(option.end) : ""}
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        color="primary"
                        isLoading={eventLoadingStates[index] || false}
                        onPress={() => addSingleEventToCalendar(option, index)}
                      >
                        Add Event
                      </Button>
                    </div>
                  ))}
                </div>
              );
            })()}

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
