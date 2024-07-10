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

export default function MicrophoneBtn({ loading }) {
  const [open, setOpen] = React.useState(false);
  const [finalTranscript, setFinalTranscript] = React.useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
  };

  recognition.onspeechend = () => {
    recognition.stop();
    setFinalTranscript("speech ended");
  };

  recognition.onresult = (event) => {
    let interimTranscript = "";
    let final = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) final += transcript + " ";
      else interimTranscript += transcript;
    }

    setFinalTranscript(final.trim());
  };

  const recordSpeech = () => {
    setFinalTranscript("Starting");
    recognition.start();
  };

  const stopRecording = () => {
    recognition.stop();
    setFinalTranscript("stopped");
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
          recordSpeech();
        }}
      >
        <Mic02Icon />
      </Button>
      <Modal
        isOpen={open}
        onOpenChange={setOpen}
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
                <span>{finalTranscript}</span>
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
                    // onClose();
                    stopRecording();
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
