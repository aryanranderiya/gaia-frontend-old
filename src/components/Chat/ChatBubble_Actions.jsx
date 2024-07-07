import TranslateDropdown from "../Translation/TranslateDropDown";
import { Button } from "@nextui-org/button";
import {
  Task01Icon,
  PinIcon,
  TranslateIcon,
  DownloadSquare01Icon,
} from "../icons";
import TextToSpeech from "../Audio/TextToSpeechComponent";
import { toast } from "sonner";

export function ChatBubble_Actions({ loading, text }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      unstyled: true,
      classNames: {
        toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast",
        title: "text-black text-sm",
        description: "text-sm text-black",
      },
      duration: 3000,
      description: `${text.substring(0, 35)}...`,
      icon: <Task01Icon height="23" color="black" />,
    });
  };

  return (
    <>
      {!loading && (
        <div className="flex py-2 w-fit gap-2 items-center">
          <Button
            variant="light"
            className="w-fit p-0 h-fit rounded-md"
            isIconOnly
            style={{ minWidth: "22px" }}
            onClick={copyToClipboard}
          >
            <Task01Icon height="22" width="22" className="cursor-pointer" />
          </Button>

          <Button
            variant="light"
            className="w-fit p-0 h-fit rounded-md"
            isIconOnly
            style={{ minWidth: "22px" }}
          >
            <PinIcon height="22" />
          </Button>

          <TranslateDropdown
            trigger={
              <Button
                variant="light"
                className="w-fit p-0 h-fit rounded-md"
                isIconOnly
                style={{ minWidth: "22px" }}
              >
                <TranslateIcon height="22" className="cursor-pointer" />
              </Button>
            }
          />

          <TextToSpeech text={text} />
        </div>
      )}
    </>
  );
}
import { Tooltip } from "@nextui-org/tooltip";

export function ChatBubble_Actions_Image({ src }) {
  const downloadFromSrc = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = src;
    downloadLink.download = "gaia_generated_image.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <div className="flex py-2 w-fit gap-2 items-center">
      <Tooltip
        content="Download Image"
        placement="right"
        size="md"
        color="primary"
      >
        <Button
          variant="light"
          className="w-fit p-0 h-fit rounded-md bg-transparent data-[hover=true]:bg-transparent"
          isIconOnly
          style={{ minWidth: "22px" }}
          onPress={downloadFromSrc}
        >
          <DownloadSquare01Icon height="22" className="cursor-pointer" />
        </Button>
      </Tooltip>
    </div>
  );
}
