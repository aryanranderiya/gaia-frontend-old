import { Button } from "@nextui-org/button";
import { SentIcon } from "../icons";
import { Tooltip } from "@nextui-org/tooltip";
import AnimatedAudioTranscription from "../Audio/AnimatedAudioTranscription";
// import MicrophoneBtn from "../Audio/MicrophoneBtn";

export default function SearchbarRightSendBtn({
  loading,
  setSearchbarText,
  searchbarText,
  handleFormSubmit,
}: {
  loading: boolean;
  searchbarText: string;
  setSearchbarText: any;
  handleFormSubmit: any;
}) {
  return (
    <div className="ml-2 flex items-center gap-1">
      <AnimatedAudioTranscription
        setTranscription={setSearchbarText}
        transcription={searchbarText}
        handleFormSubmit={handleFormSubmit}
      />

      <Tooltip content="Send message" placement="right">
        <Button
          disabled={loading}
          isIconOnly
          radius="full"
          aria-label="Send message"
          color="primary"
          type="submit"
          className={`${loading && "cursor-wait"}`}
        >
          <SentIcon color="black" fill="#ffffff40" />
        </Button>
      </Tooltip>
    </div>
  );
}
