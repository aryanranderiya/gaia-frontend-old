// src/components/AudioTranscriber.tsx
import React, { useState, useRef, useEffect } from "react";
import "./AudioTranscriber.css";

const AudioTranscriber: React.FC = () => {
  // State variables
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [status, setStatus] = useState<string>("idle");
  const [error, setError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Refs to store objects that need to persist between renders
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      stopRecording();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Set up audio visualization
  const setupAudioVisualization = (stream: MediaStream) => {
    // Create audio context
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    // Create analyser node
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    // Connect the microphone stream to the analyser
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    // Start visualization loop
    const visualize = () => {
      if (!analyserRef.current) return;

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Calculate average level
      const average =
        dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      setAudioLevel(average / 128); // Normalize to 0-1 range

      // Continue the loop
      animationFrameRef.current = requestAnimationFrame(visualize);
    };

    visualize();
  };

  // Start the recording process
  const startRecording = async () => {
    try {
      setStatus("connecting");
      setError(null);

      // Reset transcript when starting a new recording
      setTranscript("");

      // Get audio stream from user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          channelCount: 1,
          sampleRate: 16000,
        },
      });
      streamRef.current = stream;

      // Setup audio visualization
      setupAudioVisualization(stream);
      const wsURL = `ws://127.0.0.1:8000/api/v1/transcribe`;

      const socket = new WebSocket(wsURL);
      socketRef.current = socket;

      socket.onopen = () => {
        setStatus("connected");
        console.log("WebSocket connection established");

        // Create MediaRecorder once socket is open
        const options = { mimeType: "audio/webm" };
        const recorder = new MediaRecorder(stream, options);
        mediaRecorderRef.current = recorder;

        // Handle data available events
        recorder.ondataavailable = async (event) => {
          if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
            try {
              const arrayBuffer = await event.data.arrayBuffer();
              socket.send(arrayBuffer);
            } catch (err) {
              console.error("Error sending audio data:", err);
            }
          }
        };

        // Start recording, collect data every 250ms
        recorder.start(250);
        setIsRecording(true);
      };

      socket.onmessage = (event) => {
        // Handle incoming transcription data
        const text = event.data;
        if (text.startsWith("Error:")) {
          setError(text);
        } else {
          setTranscript((prev) => `${prev} ${text}`.trim());
        }
      };

      socket.onerror = (event) => {
        console.error("WebSocket error:", event);
        setStatus("error");
        setError("Connection error. Please try again.");
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
        setStatus("idle");
        stopRecording(false);
      };
    } catch (err) {
      console.error("Error starting recording:", err);
      setStatus("error");
      setError(
        `Could not access microphone: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      stopRecording();
    }
  };

  // Stop the recording process
  const stopRecording = (closeSocket = true) => {
    // Stop media recorder
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    // Stop audio tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Close WebSocket connection
    if (
      closeSocket &&
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.close();
      socketRef.current = null;
    }

    // Stop visualization
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsRecording(false);
  };

  // Handle button click
  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
      setStatus("idle");
    } else {
      startRecording();
    }
  };

  // Copy transcript to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(transcript)
      .then(() => {
        alert("Transcript copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  // Clear transcript
  const clearTranscript = () => {
    setTranscript("");
  };

  return (
    <div className="w-screen flex items-center justify-center h-screen">
      <div className="transcriber-container">
        <div className="control-panel">
          <button
            className={`record-button ${isRecording ? "recording" : ""}`}
            onClick={handleToggleRecording}
            disabled={status === "connecting"}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>

          <div className="status-indicator">
            Status:
            <span className={`status-text status-${status}`}>
              {status === "idle"
                ? "Ready"
                : status === "connecting"
                ? "Connecting..."
                : status === "connected"
                ? "Recording"
                : "Error"}
            </span>
          </div>

          {isRecording && (
            <div className="audio-meter-container">
              <div
                className="audio-meter"
                style={{ transform: `scaleX(${audioLevel})` }}
              />
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="transcript-container">
          <div className="transcript-header">
            <h2>Transcript</h2>
            <div className="transcript-actions">
              <button
                onClick={copyToClipboard}
                disabled={!transcript}
                title="Copy to clipboard"
              >
                Copy
              </button>
              <button
                onClick={clearTranscript}
                disabled={!transcript}
                title="Clear transcript"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="transcript-content">
            {transcript || "Your transcript will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTranscriber;
