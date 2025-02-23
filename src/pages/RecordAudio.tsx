"use client";

import { Loader2, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AudioRecorderState {
  audioContext: AudioContext | null;
  stream: MediaStream | null;
  processor: ScriptProcessorNode | null;
  sourceNode: MediaStreamAudioSourceNode | null;
}

export default function AudioTranscription() {
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioStateRef = useRef<AudioRecorderState>({
    audioContext: null,
    stream: null,
    processor: null,
    sourceNode: null,
  });

  useEffect(() => {
    // Initialize WebSocket connection
    wsRef.current = new WebSocket("ws://localhost:8000/api/v1/transcribe");

    wsRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        if (response.text) {
          setTranscription((prev) => prev + (prev ? "\n" : "") + response.text);
        }
      } catch (e) {
        // Handle plain text responses
        setTranscription((prev) => prev + (prev ? "\n" : "") + event.data);
      }
    };

    wsRef.current.onerror = () => {
      setError("Connection error. Please try again.");
    };

    return () => {
      stopRecording();
      wsRef.current?.close();
    };
  }, []);

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Your browser does not support audio recording.");

      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      const audioContext = new AudioContext({ sampleRate: 16000 });
      const sourceNode = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (e) => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) return;

        const audioData = e.inputBuffer.getChannelData(0);
        const intData = new Int16Array(audioData.length);

        for (let i = 0; i < audioData.length; i++) {
          intData[i] = Math.max(-1, Math.min(1, audioData[i])) * 0x7fff;
        }

        wsRef.current.send(intData.buffer);
      };

      sourceNode.connect(processor);
      processor.connect(audioContext.destination);

      audioStateRef.current = {
        audioContext,
        stream,
        processor,
        sourceNode,
      };

      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError("Error accessing microphone. Please check your settings.");
    } finally {
      setIsLoading(false);
    }
  };

  const stopRecording = () => {
    const { processor, sourceNode, audioContext, stream } =
      audioStateRef.current;

    if (processor) {
      processor.disconnect();
    }
    if (sourceNode) {
      sourceNode.disconnect();
    }
    if (audioContext) {
      audioContext.close();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    audioStateRef.current = {
      audioContext: null,
      stream: null,
      processor: null,
      sourceNode: null,
    };

    setIsRecording(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Real-Time Audio Transcription</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          disabled={isLoading}
          variant={isRecording ? "destructive" : "default"}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : isRecording ? (
            <MicOff className="mr-2 h-4 w-4" />
          ) : (
            <Mic className="mr-2 h-4 w-4" />
          )}
          {isLoading
            ? "Initializing..."
            : isRecording
              ? "Stop Recording"
              : "Start Recording"}
        </Button>

        {error && (
          <Alert className="mt-4" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Transcription</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <pre className="whitespace-pre-wrap">
                {transcription || "Transcription will appear here..."}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
