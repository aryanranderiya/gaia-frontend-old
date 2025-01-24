"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AudioTranscription() {
  const [transcription, setTranscription] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8000/api/v1/transcribe");

    wsRef.current.onmessage = (event) => {
      setTranscription((prev) => {
        // Only add new text if it's different from the last line
        const newText = event.data.trim();
        const lines = prev.split("\n");
        const lastLine = lines[lines.length - 1];

        if (!prev || lastLine !== newText) {
          return prev + (prev ? "\n" : "") + newText;
        }
        return prev;
      });
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("Connection error. Please try again.");
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      stopRecording();
      wsRef.current?.close();
    };
  }, []);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser does not support audio recording.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Get audio stream with specific constraints for Vosk
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16_000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      // Create audio context with specific sample rate
      audioContextRef.current = new AudioContext({
        sampleRate: 16_000,
      });

      // Create source node
      sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(
        streamRef.current
      );

      // Create processor node
      processorRef.current = audioContextRef.current.createScriptProcessor(
        4096,
        1,
        1
      );

      // Handle audio processing
      processorRef.current.onaudioprocess = (e) => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) return;

        const audioData = e.inputBuffer.getChannelData(0);
        const intData = new Int16Array(audioData.length);

        // Convert Float32Array to Int16Array for Vosk
        for (let i = 0; i < audioData.length; i++) {
          // Convert float32 to int16
          intData[i] = Math.max(-1, Math.min(1, audioData[i])) * 0x7fff;
        }

        // Send the audio data to the server
        wsRef.current.send(intData.buffer);
      };

      // Connect the nodes
      sourceNodeRef.current.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);

      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError("Error accessing microphone. Please check your settings.");
    } finally {
      setIsLoading(false);
    }
  };

  const stopRecording = () => {
    // Disconnect and cleanup audio nodes
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

    // Stop all tracks in the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Real-Time Audio Transcription</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={isRecording ? "destructive" : "default"}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
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
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isRecording ? "Recording in Progress" : "Recording Stopped"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center p-6">
              {isRecording ? (
                <div className="w-16 h-16 bg-red-500 rounded-full animate-pulse" />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full" />
              )}
            </div>
            <Button onClick={isRecording ? stopRecording : startRecording}>
              {isRecording ? "Stop Recording" : "Resume Recording"}
            </Button>
          </DialogContent>
        </Dialog>

        {error && (
          <Alert variant="destructive" className="mt-4">
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
