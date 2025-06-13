'use client'
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader, LoaderPinwheel, Mic } from 'lucide-react';

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
}

// Add type definitions for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}

interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

const SpeechToTextButton = ({ setText }: { setText: (text: string) => void }) => {
    const [interimText, setInterimText] = useState('');
    const [finalisedText, setFinalisedText] = useState<string[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState('');
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const finalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startListening = () => {
        try {
            // Create new recognition instance
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                throw new Error('Speech recognition not supported in this browser');
            }

            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                        setFinalisedText(prev => [...prev, transcript]);
                    } else {
                        interimTranscript += transcript;
                    }
                }

                setInterimText(interimTranscript);
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error);
                setError(event.error);
                stopListening();
            };

            recognition.onend = () => {
                if (isListening) {
                    recognition.start();
                }
            };

            recognition.start();
            recognitionRef.current = recognition;
            setIsListening(true);
        } catch (err: any) {
            console.error('Error starting speech recognition:', err);
            setError(err.message);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            // First, set listening to false to prevent auto-restart
            setIsListening(false);

            // If there's any interim text, add it to the final text
            if (interimText) {
                setFinalisedText(prev => [...prev, interimText]);
            }

            // Clear any existing timeout
            if (finalTimeoutRef.current) {
                clearTimeout(finalTimeoutRef.current);
            }

            // Wait a short moment to capture final results before stopping
            finalTimeoutRef.current = setTimeout(() => {
                if (recognitionRef.current) {
                    recognitionRef.current.stop();
                    setText([...finalisedText, interimText].join(' '));
                }
            }, 500); // 500ms delay to capture final words
        }
    };

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (finalTimeoutRef.current) {
                clearTimeout(finalTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className='relative -top-12 left-[91%] !cursor-pointer hover:bg-muted/20 rounded-full'>
            <Button
                className='w-10 h-10 rounded-full cursor-pointer hover:bg-muted/20'
                variant='outline'
                onClick={() => {
                    speechSynthesis.cancel();
                    if (isListening) {
                        stopListening();
                    } else {
                        startListening();
                    }
                }}
            >
                {isListening ? <Loader className="animate-spin" /> : <Mic className='w-4 h-4' />}
            </Button>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {interimText && (
                <div className="absolute top-12 right-0 bg-white p-2 rounded shadow-lg">
                    {interimText}
                </div>
            )}
        </div>
    );
};

export default SpeechToTextButton;    