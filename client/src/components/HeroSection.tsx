import { Button } from "@/components/ui/button";
import { Camera, Mic } from "lucide-react";
import farmerImage from "@assets/generated_images/Farmer_using_smartphone_in_field_9873afa1.png";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Image with Dark Wash */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${farmerImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Turn Your Backyard Into a
          <span className="text-primary-foreground block">Data-Driven Farm</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          AI-powered plant diagnosis, soil analysis, and farming guidance using just your smartphone camera and voice
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm"
            data-testid="button-camera-start"
            onClick={() => console.log('Camera diagnosis started')}
          >
            <Camera className="w-5 h-5 mr-2" />
            Start Camera Diagnosis
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-voice-assistant"
            onClick={() => console.log('Voice assistant activated')}
          >
            <Mic className="w-5 h-5 mr-2" />
            Voice Assistant
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500M+</div>
            <div className="text-sm text-white/80">Small Farmers Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">95%</div>
            <div className="text-sm text-white/80">Disease Detection Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-sm text-white/80">Local Languages</div>
          </div>
        </div>
      </div>
    </div>
  );
}