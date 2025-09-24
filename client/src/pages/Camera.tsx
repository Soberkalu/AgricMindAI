import { useState } from "react";
import CameraCapture from "@/components/CameraCapture";
import DiagnosisCard from "@/components/DiagnosisCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, History, Lightbulb, BookOpen } from "lucide-react";

export default function CameraPage() {
  const [currentDiagnosis, setCurrentDiagnosis] = useState<any>(null);
  const [analysisHistory, setAnalysisHistory] = useState<any[]>([]);

  // Mock recent analyses - TODO: remove mock functionality
  const mockRecentAnalyses = [
    {
      id: "1",
      cropType: "Maize",
      condition: 'healthy' as const,
      diagnosis: "Healthy crop with good growth patterns",
      confidence: 96,
      symptoms: ["Strong green color", "Active growth"],
      recommendations: ["Continue current care routine"],
      treatmentSteps: [],
      timestamp: "2 hours ago"
    },
    {
      id: "2", 
      cropType: "Beans",
      condition: 'warning' as const,
      diagnosis: "Pest activity detected on leaves",
      confidence: 88,
      symptoms: ["Small holes in leaves", "Insect damage"],
      recommendations: ["Apply organic pesticide", "Increase monitoring"],
      treatmentSteps: [],
      timestamp: "1 day ago"
    }
  ];

  const handleCapture = (imageData: string) => {
    console.log('Image captured, starting analysis...');
    
    // Simulate AI analysis result - TODO: remove mock functionality
    const mockResult = {
      id: Date.now().toString(),
      cropType: "Tomato",
      condition: 'warning' as const,
      diagnosis: "Nutrient deficiency detected. The yellowing patterns on leaves suggest nitrogen shortage, which is common during rapid growth phases.",
      confidence: 89,
      symptoms: ["Yellow leaf edges", "Stunted growth", "Pale coloration"],
      recommendations: [
        "Apply balanced NPK fertilizer (20-10-10 ratio)",
        "Ensure adequate watering after fertilizer application", 
        "Monitor plant response over 5-7 days",
        "Check soil pH levels to ensure nutrient uptake"
      ],
      treatmentSteps: [
        "Mix 2 tablespoons of NPK fertilizer with 1 gallon of water",
        "Apply around base of plant, avoiding direct contact with stem",
        "Water thoroughly to help nutrients reach roots",
        "Mark calendar for follow-up check in 1 week"
      ],
      nextCheckDate: "December 30, 2024"
    };

    setCurrentDiagnosis(mockResult);
    setAnalysisHistory(prev => [mockResult, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Plant & Soil Analysis</h1>
          <p className="text-muted-foreground">
            Take a photo for instant AI-powered diagnosis and recommendations
          </p>
        </div>

        {/* Camera Interface */}
        <div className="flex justify-center">
          <CameraCapture 
            onCapture={handleCapture}
            title="AI Plant Doctor"
            description="Point your camera at affected leaves or soil"
          />
        </div>

        {/* Analysis Result */}
        {currentDiagnosis && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Analysis Results
            </h2>
            <DiagnosisCard 
              result={currentDiagnosis}
              onViewDetails={(id) => console.log('View full treatment plan:', id)}
              onScheduleReminder={(date) => console.log('Schedule reminder:', date)}
            />
          </div>
        )}

        {/* Tips Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Photography Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">📸</span>
                <div>
                  <strong>Distance:</strong> Hold camera 6-12 inches from the plant for best focus
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">☀️</span>
                <div>
                  <strong>Lighting:</strong> Natural daylight works best - avoid shadows and direct flash
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">🎯</span>
                <div>
                  <strong>Focus:</strong> Center the affected area in the photo frame
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-primary">🌱</span>
                <div>
                  <strong>Multiple angles:</strong> Take several photos from different angles for better analysis
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Analyses */}
        {(analysisHistory.length > 0 || mockRecentAnalyses.length > 0) && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Recent Analyses
            </h2>
            
            <div className="space-y-4">
              {[...analysisHistory, ...mockRecentAnalyses].slice(0, 3).map((analysis, index) => (
                <Card key={analysis.id || index} className="hover-elevate">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{analysis.cropType}</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysis.timestamp || 'Recent'}
                        </p>
                      </div>
                      <Badge className={
                        analysis.condition === 'healthy' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : analysis.condition === 'warning'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }>
                        {analysis.condition}
                      </Badge>
                    </div>
                    <p className="text-sm mb-3">{analysis.diagnosis}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentDiagnosis(analysis)}
                      data-testid={`view-analysis-${analysis.id}`}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => console.log('View all analyses')}
                data-testid="view-all-analyses"
              >
                View All Analyses
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}