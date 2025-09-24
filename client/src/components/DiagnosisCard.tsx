import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle, Leaf, BookOpen, Calendar } from "lucide-react";

interface DiagnosisResult {
  id: string;
  cropType: string;
  condition: 'healthy' | 'warning' | 'critical';
  diagnosis: string;
  confidence: number;
  symptoms: string[];
  recommendations: string[];
  treatmentSteps: string[];
  nextCheckDate?: string;
}

interface DiagnosisCardProps {
  result: DiagnosisResult;
  onViewDetails?: (id: string) => void;
  onScheduleReminder?: (date: string) => void;
}

export default function DiagnosisCard({ result, onViewDetails, onScheduleReminder }: DiagnosisCardProps) {
  const getConditionIcon = () => {
    switch (result.condition) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getConditionColor = () => {
    switch (result.condition) {
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  return (
    <Card className="w-full hover-elevate">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">{result.cropType} Analysis</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {getConditionIcon()}
            <Badge className={getConditionColor()}>
              {result.condition.charAt(0).toUpperCase() + result.condition.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Confidence:</span>
          <div className="flex-1 bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
          <span className="text-sm font-medium">{result.confidence}%</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Primary Diagnosis */}
        <div>
          <h4 className="font-medium text-sm mb-2">Diagnosis</h4>
          <p className="text-sm bg-muted p-3 rounded-lg">{result.diagnosis}</p>
        </div>

        {/* Symptoms */}
        <div>
          <h4 className="font-medium text-sm mb-2">Symptoms Detected</h4>
          <div className="flex flex-wrap gap-1">
            {result.symptoms.map((symptom, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {symptom}
              </Badge>
            ))}
          </div>
        </div>

        {/* Immediate Recommendations */}
        <div>
          <h4 className="font-medium text-sm mb-2">Immediate Actions</h4>
          <ul className="text-sm space-y-1">
            {result.recommendations.slice(0, 2).map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="font-bold text-primary mt-1">•</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onViewDetails?.(result.id)}
            data-testid={`button-details-${result.id}`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Full Treatment Plan
          </Button>
          
          {result.nextCheckDate && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onScheduleReminder?.(result.nextCheckDate!)}
              data-testid={`button-reminder-${result.id}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Set Reminder
            </Button>
          )}
        </div>

        {/* Next Check Date */}
        {result.nextCheckDate && (
          <div className="text-xs text-muted-foreground border-t pt-3">
            <Calendar className="w-3 h-3 inline mr-1" />
            Next check recommended: {result.nextCheckDate}
          </div>
        )}
      </CardContent>
    </Card>
  );
}