import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Lottie from "react-lottie";
import recordingAnimation from "../lotties/recording.json";
import { toast } from "sonner";
import { Cancel01Icon, Tick02Icon, Mic02Icon } from "../icons";
import { Button } from "@nextui-org/button";
import * as React from "react";

export default function MicrophoneBtn() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [transcript, setTranscript] = React.useState("");
  const [recognition, setRecognition] = React.useState(null);
  // const [mediaRecorder, setMediaRecorder] = React.useState(null);
  // const [audioChunks, setAudioChunks] = React.useState([]);

  // React.useEffect(() => {
  //   if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  //     alert("getUserMedia is not supported in this browser.");
  //     return;
  //   }

  //   async function setupRecorder() {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //       });
  //       const recorder = new MediaRecorder(stream);

  //       recorder.ondataavailable = (e) => {
  //         setAudioChunks([...audioChunks, e.data]);
  //       };

  //       setMediaRecorder(recorder);
  //     } catch (err) {
  //       console.error("Error accessing microphone:", err);
  //     }
  //   }

  //   setupRecorder();

  //   return () => {
  //     if (mediaRecorder) {
  //       mediaRecorder.stop();
  //     }
  //   };
  // }, [audioChunks, mediaRecorder]);

  // const startRecording = () => {
  //   if (mediaRecorder) {
  //     setAudioChunks([]);
  //     mediaRecorder.start();
  //     setRecording(true);
  //   }
  // };

  // const stopRecording = () => {
  //   if (mediaRecorder && recording) {
  //     mediaRecorder.stop();
  //     setRecording(false);
  //     playRecording();
  //   }
  // };

  // const playRecording = () => {
  //   if (audioChunks.length > 0) {
  //     const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
  //     const audioUrl = URL.createObjectURL(audioBlob);
  //     const audio = new Audio(audioUrl);
  //     audio.play();
  //   }
  // };

  React.useEffect(() => {
    // console.log(transcript);
  }, [transcript]);

  const recordSpeech = () => {
    // let SpeechRecognition =
    //   window.webkitSpeechRecognition || window.SpeechRecognition;
    // let speechRecognition = new SpeechRecognition();
    // setRecognition(speechRecognition);
    // speechRecognition.start();
    // speechRecognition.onresult = async (event) => {
    //   setTranscript(event.results[0][0].transcript);
    //   alert(event.results[0][0].transcript);
    // };
  };

  const stopRecording = () => {
    // recognition.stop();
  };

  return (
    <>
      <Button
        isIconOnly
        radius="full"
        aria-label="Microphone"
        onPress={() => {
          onOpen();
          recordSpeech();
          // startRecording();
        }}
        variant="light"
      >
        <Mic02Icon />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{ base: "w-fit p-4 dark text-white" }}
        onClose={stopRecording}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center">
                Recording Voice
              </ModalHeader>
              <ModalBody className="flex justify-center items-center lottie_container">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: recordingAnimation,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  isClickToPauseDisabled={true}
                  height={50}
                  width={100}
                />
              </ModalBody>
              <ModalFooter className="flex w-full justify-center">
                <Button
                  color="danger"
                  onPress={onClose}
                  isIconOnly
                  variant="flat"
                >
                  <Cancel01Icon color="red" />
                </Button>
                <Button
                  color="success"
                  onPress={() => {
                    onClose();
                    console.log(transcript);
                  }}
                  isIconOnly
                  variant="flat"
                >
                  <Tick02Icon color="green" />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
