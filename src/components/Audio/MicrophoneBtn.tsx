"use client";

import { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
// import Lottie from "react-lottie";
// import recordingAnimation from "../lotties/recording.json";
import { Cancel01Icon, Tick02Icon, Mic02Icon } from "../icons";
import { Button } from "@nextui-org/button";

// Define props type for the MicrophoneBtn component
interface MicrophoneBtnProps {
  loading: boolean;
  // onTranscriptionComplete: (transcript: string) => void;
}

export default function MicrophoneBtn({
  loading,
}: // onTranscriptionComplete,
MicrophoneBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          if (result.isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Recognition error:", event.error);
        stopRecording(); // Stop recording on error
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.log("Speech recognition not supported");
    }

    return () => {
      stopRecording(); // Ensure to stop on cleanup
    };
  }, []);

  const startRecording = () => {
    setTranscript("");
    setIsRecording(true);
    recognitionRef.current?.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const handleClose = () => {
    stopRecording();
    setOpen(false);
  };

  const handleSubmit = () => {
    stopRecording();
    // onTranscriptionComplete(transcript);
    setOpen(false);
  };

  return (
    <>
      <Button
        isIconOnly
        radius="full"
        aria-label="Microphone"
        variant="light"
        isDisabled={loading}
        onPress={() => {
          setOpen(true);
          startRecording();
        }}
      >
        <Mic02Icon />
      </Button>
      <Modal
        isOpen={open}
        onOpenChange={setOpen}
        backdrop="opaque"
        classNames={{ base: "w-full max-w-md p-4 dark text-white" }}
        onClose={handleClose}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-col items-center">
            {isRecording ? "Recording Voice" : "Voice Recording Complete"}
          </ModalHeader>
          <ModalBody className="flex flex-col items-center space-y-4">
            {isRecording && (
              <div className="lottie_container">
                {/* <Lottie
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
                  width={100} */}
                {/* /> */}
              </div>
            )}
            <div className="w-full p-4 bg-gray-800 rounded-md min-h-[100px] max-h-[200px] overflow-y-auto">
              <p className="whitespace-pre-wrap">{transcript}</p>
            </div>
          </ModalBody>
          <ModalFooter className="flex w-full justify-center space-x-4">
            <Button
              color="danger"
              onPress={handleClose}
              isIconOnly
              variant="flat"
            >
              <Cancel01Icon color="red" />
            </Button>
            <Button
              color="success"
              onPress={handleSubmit}
              isIconOnly
              variant="flat"
            >
              <Tick02Icon color="green" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
