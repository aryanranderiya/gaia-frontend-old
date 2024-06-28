import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  AttachmentIcon,
  Image02Icon,
  Pdf02Icon,
  Mic01Icon,
  BlushBrush02Icon,
  Mic02Icon,
  Cancel01Icon,
  Tick02Icon,
  CalendarAdd01Icon,
} from "../icons";
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
import React from "react";
import { toast } from "sonner";

export function MicrophoneBtn() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [recording, setRecording] = React.useState(false);
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [audioChunks, setAudioChunks] = React.useState([]);

  React.useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("getUserMedia is not supported in this browser.");
      return;
    }

    async function setupRecorder() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          setAudioChunks([...audioChunks, e.data]);
        };

        setMediaRecorder(recorder);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    }

    setupRecorder();

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    };
  }, [audioChunks, mediaRecorder]);

  const startRecording = () => {
    if (mediaRecorder) {
      setAudioChunks([]);
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
      playRecording();
    }
  };

  const playRecording = () => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <>
      <Button
        isIconOnly
        radius="full"
        aria-label="Microphone"
        onPress={() => {
          onOpen();
          startRecording();
        }}
      >
        <Mic01Icon />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
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

export default function SearchbarLeftDropdown({ loading }) {
  return (
    <div className="flex gap-1 mr-2 flex-row flex-nowrap">
      <Tooltip content="Attach documents" placement="left" disabled={loading}>
        <Dropdown className="bg-zinc-700">
          <DropdownTrigger>
            <Button
              disabled={loading}
              isIconOnly
              radius="full"
              aria-label="Attach files"
              className={`${loading && "cursor-wait"}`}
            >
              <AttachmentIcon />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            variant="faded"
            aria-label="Static Actions"
            classNames={{
              base: "flex flex-row w-fit",
              list: "w-fit flex-row",
              content: "w-fit min-w-[100px]",
            }}
          >
            <DropdownItem key="brush" className="w-fit rounded-full dark">
              <BlushBrush02Icon color="#00bbff" />
            </DropdownItem>
            <DropdownItem key="pdf" className="w-fit rounded-full dark">
              <Pdf02Icon color="#00bbff" />
            </DropdownItem>
            <DropdownItem key="image" className="w-fit rounded-full dark">
              <Image02Icon color="#00bbff" />
            </DropdownItem>
            <DropdownItem key="calendar" className="w-fit rounded-full dark">
              <CalendarAdd01Icon color="#00bbff" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Tooltip>

      <MicrophoneBtn />
    </div>
  );
}
