import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import WeatherCard from "@/components/WeatherCard";
import DiagnosisCard from "@/components/DiagnosisCard";
import CropCalendar from "@/components/CropCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, TrendingUp, Users, Camera, Mic } from "lucide-react";

export default function Home() {
  const [showFullWeather, setShowFullWeather] = useState(false);

  // Mock data - TODO: remove mock functionality
  const mockWeatherData = {
    location: "Your Farm Location",
    current: {
      temperature: 26,
      condition: 'partly-cloudy' as const,
      humidity: 68,
      windSpeed: 15,
      visibility: 10
    },
    forecast: [
      {
        date: "Today",
        high: 28,
        low: 19,
        condition: 'partly-cloudy' as const,
        precipitationChance: 15
      },
      {
        date: "Tomorrow",
        high: 24,
        low: 16,
        condition: 'rainy' as const,
        precipitationChance: 85
      },
      {
        date: "Wednesday",
        high: 27,
        low: 18,
        condition: 'sunny' as const,
        precipitationChance: 5
      }
    ],
    farmingAdvice: [
      "Perfect conditions for planting maize today",
      "Prepare for heavy rain tomorrow - cover sensitive crops",
      "Good time to harvest mature vegetables",
      "Check drainage systems before tomorrow's rain"
    ]
  };

  const mockRecentDiagnosis = {
    id: "recent-1",
    cropType: "Tomato",
    condition: 'warning' as const,
    diagnosis: "Early signs of nutrient deficiency detected. Yellow leaves suggest nitrogen shortage.",
    confidence: 91,
    symptoms: ["Yellow lower leaves", "Slow growth", "Pale green color"],
    recommendations: [
      "Apply organic compost around plant base",
      "Increase watering frequency slightly",
      "Monitor progress over next week"
    ],
    treatmentSteps: [],
    nextCheckDate: "December 30, 2024"
  };

  const mockActivities = [
    {
      id: "1",
      crop: "Maize",
      activity: 'fertilize' as const,
      date: "Today",
      status: 'today' as const,
      priority: 'high' as const,
      description: "Apply NPK fertilizer - optimal weather conditions",
      weatherDependent: false
    },
    {
      id: "2",
      crop: "Beans", 
      activity: 'plant' as const,
      date: "Tomorrow",
      status: 'upcoming' as const,
      priority: 'medium' as const,
      description: "Plant bean seeds in prepared beds",
      weatherDependent: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground">Crops Monitored</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">47</div>
              <div className="text-xs text-muted-foreground">Photos Analyzed</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold">87%</div>
              <div className="text-xs text-muted-foreground">Health Score</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">234</div>
              <div className="text-xs text-muted-foreground">Community Tips</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="h-20 flex flex-col gap-2"
                onClick={() => console.log('Navigate to camera')}
                data-testid="quick-camera"
              >
                <Camera className="w-6 h-6" />
                <span>Scan Plant</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-20 flex flex-col gap-2"
                onClick={() => console.log('Navigate to voice')}
                data-testid="quick-voice"
              >
                <Mic className="w-6 h-6" />
                <span>Ask Question</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weather Overview */}
        <WeatherCard weather={mockWeatherData} />

        {/* Recent Diagnosis */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Plant Analysis</h2>
          <DiagnosisCard
            result={mockRecentDiagnosis}
            onViewDetails={(id) => console.log('View details:', id)}
            onScheduleReminder={(date) => console.log('Schedule reminder:', date)}
          />
        </div>

        {/* Today's Activities */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Today's Farm Tasks</h2>
          <CropCalendar
            activities={mockActivities}
            onAddActivity={() => console.log('Add activity')}
            onCompleteActivity={(id) => console.log('Complete activity:', id)}
            onViewDetails={(id) => console.log('View activity details:', id)}
          />
        </div>
      </div>
    </div>
  );
}