import Speech from "react-speech";
import { VoiceIcon } from "../icons";

export default function TextToSpeech({ text }) {
  return (
    <Speech
      className="tts_button"
      text={text}
      textAsButton={true}
      pause={true}
      resume={true}
      rate="1.1"
      pitch="1.05"
      lang="en-GB"
      voice="Google UK English Female"
      displayText={<VoiceIcon height="22" className="cursor-pointer" />}
    />
  );
}
