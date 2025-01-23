"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { AnimatePresence } from "framer-motion";
import { Mic, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// import MicrophoneBtn from "./MicrophoneBtn";

export default function AnimatedAudioTranscription({
  setTranscription,
  transcription,
  handleFormSubmit,
}: {
  transcription: string;
  setTranscription: any;
  handleFormSubmit: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    if (isOpen) {
      startRecording();

      wsRef.current = new WebSocket("ws://localhost:8000/api/v1/transcribe");

      wsRef.current.onmessage = (event) => {
        setTranscription(() => {
          // const lines = prev.split("\n");
          // const lastLine = lines[lines.length - 1];

          // if (!prev || lastLine !== newText) {
          //   return prev + (prev ? "\n" : "") + newText;
          // }
          // return prev;
          return event.data.trim();
        });
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("Connection error. Please try again.");
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };
    }

    return () => {
      stopRecording();
      wsRef.current?.close();
    };
  }, [isOpen]);

  const startRecording = async () => {
    setError("");
    setTranscription("");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser does not support audio recording.");
      return;
    }

    try {
      setError(null);

      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16_000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      audioContextRef.current = new AudioContext({
        sampleRate: 16_000,
      });

      sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(
        streamRef.current
      );

      processorRef.current = audioContextRef.current.createScriptProcessor(
        4096,
        1,
        1
      );

      processorRef.current.onaudioprocess = (e) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const audioData = e.inputBuffer.getChannelData(0);
          const intData = new Int16Array(audioData.length);

          for (let i = 0; i < audioData.length; i++) {
            intData[i] = Math.max(-1, Math.min(1, audioData[i])) * 0x7fff;
          }

          wsRef.current.send(intData.buffer);
        }
      };

      sourceNodeRef.current.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError("Error accessing microphone. Please check your settings.");
    }
  };

  const stopRecording = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleSend = () => {
    setTranscription("");
    setIsOpen(false);
    stopRecording();
    handleFormSubmit();
  };

  const handleCancel = () => {
    setTranscription("");
    stopRecording();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">
          <Mic className="mr-2 h-4 w-4" />
          Transcribe Audio
        </Button> */}

        <Tooltip content="Record Voice" placement="top">
          <Button
            // disabled={loading}
            isIconOnly
            radius="full"
            aria-label="Send message"
            color="default"
            type="submit"
            variant="faded"
            className="mr-1"
            onPress={() => setIsOpen(true)}
            // className={`${loading && "cursor-wait"}`}
          >
            <Mic className="text-zinc-400" />
            {/* <Mic className="text-[#ffffff70]" /> */}
          </Button>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 rounded-2xl text-white border-none">
        <DialogHeader>
          <DialogTitle className="text-center">Audio Transcription</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center items-center">
            <AnimatePresence>
              {/* <motion.div
                className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer ${
                  isRecording ? "bg-red-500" : "bg-blue-500"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={isRecording ? stopRecording : startRecording}
              >
                <Mic
                  className={`h-16 w-16 ${
                    isRecording ? "text-white animate-pulse" : "text-white"
                  }`}
                />
              </motion.div> */}
              <div
                className="pingspinner pingspinner_large"
                // onClick={isRecording ? stopRecording : startRecording}
              />
            </AnimatePresence>
          </div>
          {transcription && (
            <Textarea
              label="Your message transcription"
              onValueChange={setTranscription}
              value={transcription}
              className="dark"
              maxRows={7}
              variant="faded"
            >
              {transcription}
            </Textarea>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-center gap-5 mt-3">
            <Button onClick={handleCancel} variant="flat" color="danger">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!transcription}
              color="primary"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
