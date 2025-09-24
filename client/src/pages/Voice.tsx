import { useState } from "react";
import VoiceInput from "@/components/VoiceInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mic, Volume2, MessageCircle, Globe, Clock } from "lucide-react";

interface Conversation {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
  language: string;
}

export default function VoicePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  // Mock conversation history - TODO: remove mock functionality
  const mockConversations: Conversation[] = [
    {
      id: "1",
      question: "My tomato leaves are turning yellow, what should I do?",
      answer: "Yellow tomato leaves often indicate watering issues or nutrient deficiency. Check if soil is too wet or too dry. Apply balanced fertilizer and ensure consistent watering schedule.",
      timestamp: "2 hours ago",
      language: "English"
    },
    {
      id: "2",
      question: "When is the best time to plant maize?",
      answer: "Plant maize at the beginning of the rainy season when soil temperature is above 15°C. In your region, this is typically March-April. Ensure soil is well-prepared and has good drainage.",
      timestamp: "Yesterday",
      language: "English"
    },
    {
      id: "3",
      question: "Comment combattre les parasites sur les haricots?",
      answer: "Pour combattre les parasites sur les haricots, utilisez des pesticides organiques comme le neem. Inspectez régulièrement vos plants et retirez les insectes manuellement si possible.",
      timestamp: "3 days ago", 
      language: "French"
    }
  ];

  const quickQuestions = [
    "What's the weather forecast for farming?",
    "When should I water my crops?", 
    "How do I identify plant diseases?",
    "What fertilizer should I use?",
    "When is harvest time for maize?",
    "How to prevent pest damage?"
  ];

  const handleVoiceCommand = (transcript: string) => {
    // Add to conversation history
    const newConversation: Conversation = {
      id: Date.now().toString(),
      question: transcript,
      answer: "AI response would appear here based on the question asked.",
      timestamp: "Just now",
      language: "English"
    };
    
    setConversations(prev => [newConversation, ...prev]);
  };

  const handleQuickQuestion = (question: string) => {
    console.log('Quick question asked:', question);
    // Simulate voice input
    handleVoiceCommand(question);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Voice Assistant</h1>
          <p className="text-muted-foreground">
            Ask farming questions in your local language
          </p>
        </div>

        {/* Voice Interface */}
        <div className="flex justify-center">
          <VoiceInput 
            onVoiceCommand={handleVoiceCommand}
            title="AgriMind Assistant"
          />
        </div>

        {/* Language Support Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Supported Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["English", "Swahili", "French", "Spanish", "Hausa", "Yoruba", "Amharic", "Portuguese"].map(lang => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              More languages added weekly based on community requests
            </p>
          </CardContent>
        </Card>

        {/* Quick Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Quick Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto p-3 text-left justify-start text-wrap hover-elevate"
                  onClick={() => handleQuickQuestion(question)}
                  data-testid={`quick-question-${index}`}
                >
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversation History */}
        {(conversations.length > 0 || mockConversations.length > 0) && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Conversations
            </h2>
            
            <div className="space-y-4">
              {[...conversations, ...mockConversations].slice(0, 5).map((conv, index) => (
                <Card key={conv.id || index} className="hover-elevate">
                  <CardContent className="p-4 space-y-3">
                    {/* Question */}
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <Mic className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">You asked:</p>
                          <p className="text-sm">{conv.question}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Answer */}
                    <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                      <div className="flex items-start gap-2">
                        <Volume2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">AgriMind answered:</p>
                          <p className="text-sm">{conv.answer}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{conv.timestamp}</span>
                      <Badge variant="outline" className="text-xs">
                        {conv.language}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => console.log('View all conversations')}
                data-testid="view-all-conversations"
              >
                View All Conversations
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}