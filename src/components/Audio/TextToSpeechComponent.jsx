import { VoiceIcon, VolumeHighIcon } from "../icons";
import * as React from "react";
import { Button } from "@nextui-org/button";

export default function TextToSpeech({ text }) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1.1;
  utterance.rate = 1.1;

  for (const voice of synth.getVoices())
    if (voice.name === "Google UK English Female") utterance.voice = voice;

  utterance.addEventListener("end", () => {
    synth.cancel();
    setIsPlaying(false);
  });

  const playAudio = () => {
    synth.cancel();
    synth.speak(utterance);
    setIsPlaying(true);
  };
  const togglePlayback = () => {
    if (synth.speaking) {
      synth.cancel();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };

  return (
    <Button
      onPress={togglePlayback}
      variant={isPlaying ? "shadow" : "light"}
      size="sm"
      className="w-fit p-0 h-fit rounded-md"
      style={{ minWidth: "22px" }}
      color="primary"
    >
      {isPlaying ? <VolumeHighIcon color="foreground" /> : <VoiceIcon />}
    </Button>
  );
}
