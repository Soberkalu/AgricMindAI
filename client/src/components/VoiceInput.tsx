import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Languages } from "lucide-react";

interface VoiceInputProps {
  onVoiceCommand?: (transcript: string) => void;
  supportedLanguages?: string[];
  title?: string;
}

export default function VoiceInput({ 
  onVoiceCommand,
  supportedLanguages = ["English", "Swahili", "French", "Spanish", "Hausa"],
  title = "Voice Assistant"
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(supportedLanguages[0]);
  const [response, setResponse] = useState("");

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript("");
    setResponse("");
    
    // Simulate voice recognition
    setTimeout(() => {
      const mockTranscript = "My maize leaves are turning yellow, what should I do?";
      setTranscript(mockTranscript);
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        const mockResponse = "Yellow maize leaves often indicate nitrogen deficiency. Apply 20g of urea per plant. I also see rain is expected in 2 days, so wait until after the rain for best results.";
        setResponse(mockResponse);
        setIsProcessing(false);
        onVoiceCommand?.(mockTranscript);
        console.log('Voice command processed:', mockTranscript);
      }, 1500);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  const handlePlayResponse = () => {
    console.log('Playing audio response:', response);
    // Simulate text-to-speech
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Mic className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Languages className="w-4 h-4" />
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-transparent border-none outline-none"
            data-testid="select-language"
          >
            {supportedLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Voice Recording Interface */}
        <div className="text-center space-y-4">
          {/* Record Button */}
          <div className="relative">
            <Button
              size="lg"
              className={`w-24 h-24 rounded-full ${
                isListening ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
              }`}
              onClick={isListening ? handleStopListening : handleStartListening}
              disabled={isProcessing}
              data-testid={isListening ? "button-stop-listening" : "button-start-listening"}
            >
              {isListening ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>
            
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-destructive animate-pulse" />
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            {isListening ? "Listening... Tap to stop" : 
             isProcessing ? "Processing your question..." :
             "Tap to speak in your local language"}
          </p>
        </div>
        
        {/* Transcript Display */}
        {transcript && (
          <div className="bg-muted p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-1">You said:</h4>
            <p className="text-sm">{transcript}</p>
          </div>
        )}
        
        {/* AI Response */}
        {response && (
          <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm">AgriMind suggests:</h4>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handlePlayResponse}
                data-testid="button-play-response"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm">{response}</p>
          </div>
        )}
        
        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center justify-center py-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
            <span className="text-sm text-muted-foreground">AI is thinking...</span>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button 
            className="p-2 bg-muted rounded text-left hover-elevate"
            onClick={() => console.log('Quick question: Weather')}
            data-testid="button-quick-weather"
          >
            "What's the weather forecast?"
          </button>
          <button 
            className="p-2 bg-muted rounded text-left hover-elevate"
            onClick={() => console.log('Quick question: Fertilizer')}
            data-testid="button-quick-fertilizer"
          >
            "When should I fertilize?"
          </button>
        </div>
      </CardContent>
    </Card>
  );
}