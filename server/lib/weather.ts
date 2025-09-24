// Mock weather API integration for demonstration
// In production, this would integrate with services like OpenWeatherMap, WeatherAPI, etc.

interface WeatherCondition {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
  humidity: number;
  windSpeed: number;
  visibility: number;
}

interface WeatherForecast {
  date: string;
  high: number;
  low: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
  precipitationChance: number;
}

export interface WeatherData {
  location: string;
  current: WeatherCondition;
  forecast: WeatherForecast[];
  farmingAdvice: string[];
}

export async function getWeatherData(location: string): Promise<WeatherData> {
  // Mock implementation - in production, this would call a real weather API
  const mockWeatherData: WeatherData = {
    location,
    current: {
      temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
      condition: ['sunny', 'cloudy', 'rainy', 'partly-cloudy'][Math.floor(Math.random() * 4)] as any,
      humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      visibility: Math.floor(Math.random() * 5) + 5 // 5-10 km
    },
    forecast: generateForecast(),
    farmingAdvice: []
  };

  // Generate farming advice based on weather conditions
  mockWeatherData.farmingAdvice = generateFarmingAdvice(mockWeatherData);

  return mockWeatherData;
}

function generateForecast(): WeatherForecast[] {
  const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy'] as const;
  const dates = ['Today', 'Tomorrow', 'Day after tomorrow'];
  
  return dates.map(date => ({
    date,
    high: Math.floor(Math.random() * 10) + 25, // 25-35°C
    low: Math.floor(Math.random() * 8) + 15, // 15-23°C
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    precipitationChance: Math.floor(Math.random() * 100)
  }));
}

function generateFarmingAdvice(weatherData: WeatherData): string[] {
  const advice: string[] = [];
  const current = weatherData.current;
  const forecast = weatherData.forecast;

  // Temperature-based advice
  if (current.temperature > 30) {
    advice.push("High temperatures expected - increase watering frequency and provide shade for sensitive crops");
  } else if (current.temperature < 20) {
    advice.push("Cool weather - protect tender plants and delay planting of warm-season crops");
  }

  // Humidity advice
  if (current.humidity > 70) {
    advice.push("High humidity may promote fungal diseases - ensure good air circulation around plants");
  } else if (current.humidity < 50) {
    advice.push("Low humidity - increase watering and consider mulching to retain soil moisture");
  }

  // Rain forecast advice
  const rainExpected = forecast.some(day => day.precipitationChance > 60);
  if (rainExpected) {
    advice.push("Rain expected - delay fertilizer application and ensure good drainage");
    advice.push("Harvest any mature crops before heavy rains arrive");
  } else {
    advice.push("Dry period ahead - check irrigation systems and water deeply but less frequently");
  }

  // Wind advice
  if (current.windSpeed > 20) {
    advice.push("Strong winds expected - stake tall plants and protect young seedlings");
  }

  // Current weather specific advice
  switch (current.condition) {
    case 'sunny':
      advice.push("Perfect conditions for most farming activities - good day for planting and harvesting");
      break;
    case 'cloudy':
      advice.push("Overcast conditions reduce water evaporation - adjust watering schedule accordingly");
      break;
    case 'rainy':
      advice.push("Avoid soil cultivation during rain - wait for soil to dry to prevent compaction");
      break;
    case 'partly-cloudy':
      advice.push("Mixed conditions - monitor plants closely and water as needed");
      break;
  }

  // Ensure we have at least some advice
  if (advice.length === 0) {
    advice.push("Monitor your crops regularly and adjust care based on their specific needs");
    advice.push("Check soil moisture levels before watering");
  }

  return advice.slice(0, 4); // Limit to 4 pieces of advice
}