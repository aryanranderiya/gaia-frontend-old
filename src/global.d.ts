// global.d.ts
interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

// Define the SpeechRecognitionResult type
interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: {
    transcript: string;
  };
}

// Define the SpeechRecognitionEvent type
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

// Define the SpeechRecognitionResultList type
interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
}

// Define the SpeechRecognitionError type
interface SpeechRecognitionError {
  error: string; // Can be extended with more properties if needed
}
