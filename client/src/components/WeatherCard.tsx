import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, Droplets, Wind, Eye, Calendar } from "lucide-react";

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
    humidity: number;
    windSpeed: number;
    visibility: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
    precipitationChance: number;
  }>;
  farmingAdvice: string[];
}

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

export default function WeatherCard({ weather, className = "" }: WeatherCardProps) {
  const getWeatherIcon = (condition: string, size: string = "w-8 h-8") => {
    switch (condition) {
      case 'sunny':
        return <Sun className={`${size} text-yellow-500`} />;
      case 'cloudy':
        return <Cloud className={`${size} text-gray-500`} />;
      case 'rainy':
        return <CloudRain className={`${size} text-blue-500`} />;
      case 'partly-cloudy':
        return <Cloud className={`${size} text-gray-400`} />;
      default:
        return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  const getConditionText = (condition: string) => {
    return condition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-primary" />
          Weather & Farm Conditions
        </CardTitle>
        <p className="text-sm text-muted-foreground">{weather.location}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-4">
            {getWeatherIcon(weather.current.condition)}
            <div>
              <div className="text-2xl font-bold">{weather.current.temperature}°C</div>
              <div className="text-sm text-muted-foreground">
                {getConditionText(weather.current.condition)}
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-2">
            <div className="flex items-center gap-1 text-sm">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>{weather.current.humidity}%</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Wind className="w-4 h-4 text-gray-500" />
              <span>{weather.current.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Eye className="w-4 h-4 text-gray-500" />
              <span>{weather.current.visibility} km</span>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div>
          <h4 className="font-medium text-sm mb-2">3-Day Forecast</h4>
          <div className="space-y-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded hover-elevate">
                <div className="flex items-center gap-3">
                  {getWeatherIcon(day.condition, "w-5 h-5")}
                  <span className="text-sm font-medium">{day.date}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm">{day.high}°/{day.low}°</span>
                  <Badge variant="outline" className="text-xs">
                    <Droplets className="w-3 h-3 mr-1" />
                    {day.precipitationChance}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farming Advice */}
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Today's Farm Advice
          </h4>
          <ul className="text-sm space-y-1">
            {weather.farmingAdvice.map((advice, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="font-bold text-primary mt-1">•</span>
                <span>{advice}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}