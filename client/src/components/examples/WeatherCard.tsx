import WeatherCard from '../WeatherCard';

export default function WeatherCardExample() {
  const mockWeatherData = {
    location: "Nairobi, Kenya",
    current: {
      temperature: 24,
      condition: 'partly-cloudy' as const,
      humidity: 65,
      windSpeed: 12,
      visibility: 8
    },
    forecast: [
      {
        date: "Today",
        high: 26,
        low: 18,
        condition: 'partly-cloudy' as const,
        precipitationChance: 20
      },
      {
        date: "Tomorrow", 
        high: 28,
        low: 19,
        condition: 'rainy' as const,
        precipitationChance: 80
      },
      {
        date: "Thursday",
        high: 25,
        low: 17,
        condition: 'cloudy' as const,
        precipitationChance: 40
      }
    ],
    farmingAdvice: [
      "Good day for planting - soil moisture optimal",
      "Rain expected tomorrow, delay fertilizer application", 
      "Harvest ready crops before Thursday's rain",
      "Check irrigation systems for upcoming dry spell"
    ]
  };

  return (
    <div className="p-4">
      <WeatherCard weather={mockWeatherData} />
    </div>
  );
}