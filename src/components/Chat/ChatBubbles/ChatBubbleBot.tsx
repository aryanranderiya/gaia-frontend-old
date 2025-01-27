import SuspenseLoader from "@/components/SuspenseLoader";
import { ChatBubbleBotProps } from "@/types/ChatBubbleTypes";
import { Chip } from "@nextui-org/chip";
import { Skeleton } from "@nextui-org/skeleton";
import { AlertTriangleIcon, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { parseDate } from "../../../utils/fetchDate";
import { InternetIcon } from "../../icons";
import {
  ChatBubble_Actions,
  ChatBubble_Actions_Image,
} from "./ChatBubble_Actions";
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
  userinputType,
  setOpenImage,
  setImageData,
  searchWeb = false,
  pageFetchURL,
  filename,
}: ChatBubbleBotProps) {
  const [component, setComponent] = useState<JSX.Element>(<></>);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fileScanningText, setFileScanningText] = useState(
    "Uploading Document..."
  );

  useEffect(() => {
    if (loading && !!filename) {
      const updateFileScanningText = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2500));
        console.log("Step 1 completed: Processing File...Please Wait");
        setFileScanningText("Processing File...Please Wait");

        await new Promise((resolve) => setTimeout(resolve, 2500));
        console.log("Step 2 completed: Document analysis in progress...");
        setFileScanningText("Document analysis in progress...");

        await new Promise((resolve) => setTimeout(resolve, 2500));
        console.log("Step 3 completed: Converting file format...");
        setFileScanningText("Converting file format...");

        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log("Step 4 completed: Extracting text from document...");
        setFileScanningText("Extracting text from document...");

        await new Promise((resolve) => setTimeout(resolve, 4000));
        console.log("Step 5 completed: Analyzing document content...");
        setFileScanningText("Analyzing document content...");

        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("Step 6 completed: Processing document... Please wait...");
        setFileScanningText("Processing document... Please wait...");

        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log(
          "Step 7 completed: Document upload complete, processing metadata..."
        );
        setFileScanningText("Document upload complete, processing metadata...");
      };

      updateFileScanningText();
    }
  }, [filename, loading]);

  // useEffect(() => {
  //   console.log(!!image && image?.length > 0);
  //   console.log(image);

  //   if (!!image && image?.length > 0) setImageSrc(image);
  // }, [image]);

  useEffect(() => {
    if (isImage) {
      setComponent(
        <>
          <div className="chat_bubble bg-zinc-800 ">
            <div className="text-sm font-medium w-full flex justify-start items-flex-start flex-col gap-2 flex-wrap max-w-[350px] my-1">
              <span>{text}</span>
              <Skeleton
                isLoaded={!loading && !imageLoaded && !!imageSrc}
                className="rounded-3xl my-2 max-w-[250px] min-w-[250px] 
                max-h-[250px] min-h-[250px] 
                aspect-square"
              >
                <img
                  src={imageSrc as string}
                  width={"250px"}
                  height={"250px"}
                  className="rounded-3xl my-2 !cursor-pointer"
                  onClick={() => {
                    if (imageSrc) {
                      setOpenImage(true);
                      // setImageSrc(imageSrc);
                      // setImagePrompt(imagePrompt);
                      setImageData({
                        prompt: imagePrompt,
                        src: imageSrc,
                        improvedPrompt: improvedImagePrompt,
                      });
                    }
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                />
              </Skeleton>

              {imagePrompt && (
                <div className="flex gap-1 justify-start flex-wrap max-w-[250px]">
                  {imagePrompt?.split(",").map((keyword, index) => (
                    <Chip
                      key={index}
                      color="default"
                      size="sm"
                      radius="md"
                      className="text-wrap min-h-fit py-1"
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
      setComponent(
        <>
          <div className="chat_bubble bg-zinc-800">
            <div className="flex flex-col gap-3">
              {searchWeb && (
                <Chip
                  startContent={<InternetIcon height={20} color="#00bbff" />}
                  // endContent={
                  //   <StarsIcon height={20} color="transparent" fill="white" />
                  // }
                  variant="flat"
                  color="primary"
                >
                  <div className="font-medium flex items-center gap-1 text-primary">
                    Live Search Results from the Web
                  </div>
                </Chip>
              )}

              {!!pageFetchURL && (
                <Chip
                  startContent={<ArrowUpRight height={20} color="#00bbff" />}
                  variant="flat"
                  color="primary"
                >
                  <div className="font-medium flex items-center gap-1 text-primary">
                    {/* {pageFetchURL?.replace(/^https?:\/\//, "")} */}
                    Fetched
                    <a
                      href={pageFetchURL}
                      className="!text-[#00bbff] font-medium hover:!text-white transition-colors"
                      target="_blank"
                    >
                      {pageFetchURL.replace(/^https?:\/\//, "")}{" "}
                    </a>
                  </div>
                </Chip>
              )}

              {!!filename && (
                <Chip variant="flat" color="primary" size="lg">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2
                        className="animate-spin text-white"
                        width={17}
                        height={17}
                      />
                      {fileScanningText}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Check width={17} height={17} className="text-white" />
                      Document Uploaded!
                    </div>
                  )}
                </Chip>
              )}

              {/* TODO: Update this suspense to be a skeleton */}
              {!!text && (
                <Suspense fallback={<SuspenseLoader />}>
                  <MarkdownRenderer content={text.toString()} />
                </Suspense>
              )}

              {!!disclaimer && (
                <Chip
                  size="sm"
                  color="warning"
                  variant="flat"
                  className="text-xs font-medium text-warning-500"
                  startContent={
                    <AlertTriangleIcon
                      height="17"
                      className="text-warning-500"
                    />
                  }
                >
                  {disclaimer}
                </Chip>
              )}
            </div>
          </div>
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
    imageSrc,
    date,
    userinputType,
    disclaimer,
    loading,
    fileScanningText,
  ]);

  const actionsRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    if (actionsRef.current) {
      actionsRef.current.style.opacity = "1";
      actionsRef.current.style.visibility = "visible";
    }
  };

  const handleMouseOut = () => {
    if (actionsRef.current) {
      actionsRef.current.style.opacity = "0";
      actionsRef.current.style.visibility = "hidden";
    }
  };

  return (
    (!!text || loading || isImage) && (
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className="chatbubblebot_parent">
          {/* <Avatar src={smiley} className="smiley_avatar" />{" "} */}

          <div className="chat_bubble_container ">{component}</div>
        </div>

        {!loading && (
          <div
            className="transition-all"
            ref={actionsRef}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            {isImage ? (
              <ChatBubble_Actions_Image
                src={imageSrc as string}
                imagePrompt={imagePrompt}
              />
            ) : (
              <ChatBubble_Actions loading={loading} text={text} />
            )}
          </div>
        )}
      </div>
    )
  );
}
