import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, X, CheckCircle } from "lucide-react";

interface CameraCaptureProps {
  onCapture?: (imageData: string) => void;
  title?: string;
  description?: string;
}

export default function CameraCapture({ 
  onCapture, 
  title = "Plant & Soil Diagnosis",
  description = "Take a photo of your crop leaves or soil for instant AI analysis" 
}: CameraCaptureProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    // Simulate camera capture
    setTimeout(() => {
      const mockImageData = "data:image/jpeg;base64,mock_image_data";
      setCapturedImage(mockImageData);
      setIsCapturing(false);
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        onCapture?.(mockImageData);
        console.log('Image captured and analyzed');
      }, 2000);
    }, 1000);
  };

  const handleReset = () => {
    setCapturedImage(null);
    setIsAnalyzing(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Camera Viewfinder */}
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          {!capturedImage ? (
            <div className="flex items-center justify-center h-full">
              {isCapturing ? (
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Capturing...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Camera ready</p>
                </div>
              )}
            </div>
          ) : (
            <div className="relative h-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
              <div className="flex items-center justify-center h-full">
                {isAnalyzing ? (
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm font-medium">AI Analysis in progress...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-600">Analysis Complete!</p>
                  </div>
                )}
              </div>
              
              {!isAnalyzing && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleReset}
                  data-testid="button-reset-capture"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1"
            onClick={handleCapture}
            disabled={isCapturing || isAnalyzing}
            data-testid="button-capture-photo"
          >
            <Camera className="w-4 h-4 mr-2" />
            {isCapturing ? "Capturing..." : "Take Photo"}
          </Button>
          
          <Button 
            variant="outline"
            className="px-4"
            disabled={isCapturing || isAnalyzing}
            data-testid="button-upload-photo"
          >
            <Upload className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Tips */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>💡 <strong>Tips:</strong></p>
          <p>• Hold camera 6-12 inches from the plant</p>
          <p>• Ensure good lighting</p>
          <p>• Focus on affected areas</p>
        </div>
      </CardContent>
    </Card>
  );
}