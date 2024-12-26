import { Button } from "@nextui-org/button";
// import { VoiceIcon, VolumeHighIcon, PlayIcon } from "../icons";
// import * as React from "react";
// import { Spinner } from "@nextui-org/spinner";

export default function TextToSpeech({ text }: { text: string }) {
  // console.log(text);

  // const [loading, setLoading] = React.useState(false);
  // const [isPaused, setIsPaused] = React.useState(false);
  // const [isPlaying, setIsPlaying] = React.useState(false);
  // const [icon, setIcon] = React.useState(<VoiceIcon />);

  // const togglePlayback = () => {
  //   if (responsiveVoice.isPlaying()) {
  //     if (isPaused) {
  //       console.log("test2");
  //       responsiveVoice.resume();
  //       setIsPlaying(true);
  //       setIsPaused(false);
  //     } else {
  //       console.log("test1");
  //       responsiveVoice.pause();
  //       setIsPaused(true);
  //       setIsPlaying(false);
  //     }
  //   } else {
  //     console.log("test3");
  //     setLoading(true);
  //     responsiveVoice.speak(text, "UK English Female", {
  //       onstart: () => {
  //         setLoading(false);
  //         setIsPlaying(true);
  //       },
  //       onend: () => {
  //         setIsPlaying(false);
  //       },
  //     });
  //   }
  // };

  // React.useEffect(() => {
  //   if (loading) setIcon(<Spinner size="sm" color="primary" />);
  //   else if (isPlaying) setIcon(<VolumeHighIcon color="foreground" />);
  //   else if (isPaused) setIcon(<PlayIcon />);
  //   else setIcon(<VoiceIcon />);
  // }, [loading, isPaused, isPlaying]);

  return (
    <Button
      // onPress={togglePlayback}
      // variant={isPlaying ? "shadow" : "light"}
      size="sm"
      className="w-fit p-0 h-fit rounded-md"
      style={{ minWidth: "22px" }}
      color="primary"
      isIconOnly
    >
      {/* {icon} */}
    </Button>
  );
}
