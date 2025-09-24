import { 
  type User, 
  type InsertUser, 
  type PlantDiagnosis,
  type InsertPlantDiagnosis,
  type VoiceConversation,
  type InsertVoiceConversation,
  type CropActivity,
  type InsertCropActivity,
  type WeatherData,
  type InsertWeatherData
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Plant diagnosis methods
  createPlantDiagnosis(diagnosis: InsertPlantDiagnosis): Promise<PlantDiagnosis>;
  getPlantDiagnosis(id: string): Promise<PlantDiagnosis | undefined>;
  getUserPlantDiagnoses(userId: string): Promise<PlantDiagnosis[]>;
  getPlantDiagnosesByCondition(userId: string, condition: string): Promise<PlantDiagnosis[]>;
  
  // Voice conversation methods
  createVoiceConversation(conversation: InsertVoiceConversation): Promise<VoiceConversation>;
  getUserVoiceConversations(userId: string): Promise<VoiceConversation[]>;
  
  // Crop activity methods
  createCropActivity(activity: InsertCropActivity): Promise<CropActivity>;
  getCropActivity(id: string): Promise<CropActivity | undefined>;
  getUserCropActivities(userId: string): Promise<CropActivity[]>;
  updateCropActivityStatus(id: string, status: string, completedDate?: Date): Promise<CropActivity | undefined>;
  getUserCropActivitiesByStatus(userId: string, status: string): Promise<CropActivity[]>;
  
  // Weather data methods
  createWeatherData(weather: InsertWeatherData): Promise<WeatherData>;
  getWeatherDataByLocation(location: string): Promise<WeatherData | undefined>;
  getValidWeatherData(location: string): Promise<WeatherData | undefined>; // Non-expired weather data
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private plantDiagnoses: Map<string, PlantDiagnosis>;
  private voiceConversations: Map<string, VoiceConversation>;
  private cropActivities: Map<string, CropActivity>;
  private weatherData: Map<string, WeatherData>;

  constructor() {
    this.users = new Map();
    this.plantDiagnoses = new Map();
    this.voiceConversations = new Map();
    this.cropActivities = new Map();
    this.weatherData = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      id,
      location: insertUser.location || null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Plant diagnosis methods
  async createPlantDiagnosis(insertDiagnosis: InsertPlantDiagnosis): Promise<PlantDiagnosis> {
    const id = randomUUID();
    const diagnosis: PlantDiagnosis = {
      ...insertDiagnosis,
      id,
      userId: insertDiagnosis.userId || null,
      symptoms: Array.isArray(insertDiagnosis.symptoms) ? insertDiagnosis.symptoms : [],
      recommendations: Array.isArray(insertDiagnosis.recommendations) ? insertDiagnosis.recommendations : [],
      treatmentSteps: Array.isArray(insertDiagnosis.treatmentSteps) ? insertDiagnosis.treatmentSteps : [],
      nextCheckDate: insertDiagnosis.nextCheckDate || null,
      imageData: insertDiagnosis.imageData || null,
      location: insertDiagnosis.location || null,
      createdAt: new Date()
    };
    this.plantDiagnoses.set(id, diagnosis);
    return diagnosis;
  }

  async getPlantDiagnosis(id: string): Promise<PlantDiagnosis | undefined> {
    return this.plantDiagnoses.get(id);
  }

  async getUserPlantDiagnoses(userId: string): Promise<PlantDiagnosis[]> {
    return Array.from(this.plantDiagnoses.values())
      .filter(diagnosis => diagnosis.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  }

  async getPlantDiagnosesByCondition(userId: string, condition: string): Promise<PlantDiagnosis[]> {
    return Array.from(this.plantDiagnoses.values())
      .filter(diagnosis => diagnosis.userId === userId && diagnosis.condition === condition)
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  }

  // Voice conversation methods
  async createVoiceConversation(insertConversation: InsertVoiceConversation): Promise<VoiceConversation> {
    const id = randomUUID();
    const conversation: VoiceConversation = {
      ...insertConversation,
      id,
      userId: insertConversation.userId || null,
      language: insertConversation.language || 'English',
      audioData: insertConversation.audioData || null,
      createdAt: new Date()
    };
    this.voiceConversations.set(id, conversation);
    return conversation;
  }

  async getUserVoiceConversations(userId: string): Promise<VoiceConversation[]> {
    return Array.from(this.voiceConversations.values())
      .filter(conv => conv.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  }

  // Crop activity methods
  async createCropActivity(insertActivity: InsertCropActivity): Promise<CropActivity> {
    const id = randomUUID();
    const activity: CropActivity = {
      ...insertActivity,
      id,
      userId: insertActivity.userId || null,
      status: insertActivity.status || 'pending',
      priority: insertActivity.priority || 'medium',
      weatherDependent: insertActivity.weatherDependent || 0,
      completedDate: insertActivity.completedDate || null,
      notes: insertActivity.notes || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.cropActivities.set(id, activity);
    return activity;
  }

  async getCropActivity(id: string): Promise<CropActivity | undefined> {
    return this.cropActivities.get(id);
  }

  async getUserCropActivities(userId: string): Promise<CropActivity[]> {
    return Array.from(this.cropActivities.values())
      .filter(activity => activity.userId === userId)
      .sort((a, b) => (a.scheduledDate?.getTime() ?? 0) - (b.scheduledDate?.getTime() ?? 0));
  }

  async updateCropActivityStatus(id: string, status: string, completedDate?: Date): Promise<CropActivity | undefined> {
    const activity = this.cropActivities.get(id);
    if (!activity) return undefined;
    
    const updatedActivity = {
      ...activity,
      status,
      completedDate: completedDate || (status === 'completed' ? new Date() : activity.completedDate),
      updatedAt: new Date()
    };
    
    this.cropActivities.set(id, updatedActivity);
    return updatedActivity;
  }

  async getUserCropActivitiesByStatus(userId: string, status: string): Promise<CropActivity[]> {
    return Array.from(this.cropActivities.values())
      .filter(activity => activity.userId === userId && activity.status === status)
      .sort((a, b) => (a.scheduledDate?.getTime() ?? 0) - (b.scheduledDate?.getTime() ?? 0));
  }

  // Weather data methods
  async createWeatherData(insertWeather: InsertWeatherData): Promise<WeatherData> {
    const id = randomUUID();
    const weather: WeatherData = {
      ...insertWeather,
      id,
      farmingAdvice: Array.isArray(insertWeather.farmingAdvice) ? insertWeather.farmingAdvice : [],
      createdAt: new Date()
    };
    this.weatherData.set(id, weather);
    return weather;
  }

  async getWeatherDataByLocation(location: string): Promise<WeatherData | undefined> {
    return Array.from(this.weatherData.values())
      .find(weather => weather.location.toLowerCase() === location.toLowerCase());
  }

  async getValidWeatherData(location: string): Promise<WeatherData | undefined> {
    return Array.from(this.weatherData.values())
      .find(weather => 
        weather.location.toLowerCase() === location.toLowerCase() && 
        weather.expiresAt > new Date()
      );
  }
}

export const storage = new MemStorage();

// Create a default demo user for the prototype
(async () => {
  try {
    await storage.createUser({
      username: 'demo_farmer',
      password: 'demo123',
      location: 'Nairobi, Kenya'
    });
  } catch (error) {
    // User might already exist, that's fine
  }
})();
