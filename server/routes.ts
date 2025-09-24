import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { analyzePlantImage, generateFarmingAdvice } from "./lib/openai";
import { getWeatherData } from "./lib/weather";
import { insertPlantDiagnosisSchema, insertVoiceConversationSchema, insertCropActivitySchema } from "@shared/schema";

// Configure multer for handling image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // For demo purposes, we'll use a hardcoded user ID
  const DEMO_USER_ID = 'demo_farmer';

  // Plant diagnosis endpoints
  app.post('/api/diagnose/image', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const imageBuffer = req.file.buffer;
      const base64Image = imageBuffer.toString('base64');
      const cropType = req.body.cropType;

      // Analyze the image with OpenAI Vision
      const analysisResult = await analyzePlantImage(base64Image, cropType);

      // Calculate next check date
      const nextCheckDate = analysisResult.nextCheckDate 
        ? new Date(analysisResult.nextCheckDate)
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week from now

      // Save diagnosis to storage
      const diagnosis = await storage.createPlantDiagnosis({
        userId: DEMO_USER_ID,
        cropType: analysisResult.cropType,
        condition: analysisResult.condition,
        diagnosis: analysisResult.diagnosis,
        confidence: analysisResult.confidence,
        symptoms: analysisResult.symptoms,
        recommendations: analysisResult.recommendations,
        treatmentSteps: analysisResult.treatmentSteps,
        nextCheckDate,
        imageData: base64Image,
        location: req.body.location || null
      });

      res.json({
        id: diagnosis.id,
        cropType: diagnosis.cropType,
        condition: diagnosis.condition,
        diagnosis: diagnosis.diagnosis,
        confidence: diagnosis.confidence,
        symptoms: diagnosis.symptoms,
        recommendations: diagnosis.recommendations,
        treatmentSteps: diagnosis.treatmentSteps,
        nextCheckDate: diagnosis.nextCheckDate?.toISOString().split('T')[0]
      });

    } catch (error) {
      console.error('Plant diagnosis error:', error);
      res.status(500).json({ error: 'Failed to analyze plant image' });
    }
  });

  // Get user's plant diagnoses
  app.get('/api/diagnoses', async (req, res) => {
    try {
      const condition = req.query.condition as string;
      let diagnoses;
      
      if (condition) {
        diagnoses = await storage.getPlantDiagnosesByCondition(DEMO_USER_ID, condition);
      } else {
        diagnoses = await storage.getUserPlantDiagnoses(DEMO_USER_ID);
      }

      const formattedDiagnoses = diagnoses.map(d => ({
        ...d,
        nextCheckDate: d.nextCheckDate?.toISOString().split('T')[0],
        timestamp: d.createdAt?.toISOString()
      }));

      res.json(formattedDiagnoses);
    } catch (error) {
      console.error('Get diagnoses error:', error);
      res.status(500).json({ error: 'Failed to fetch diagnoses' });
    }
  });

  // Voice conversation endpoints
  app.post('/api/voice/ask', async (req, res) => {
    try {
      const { question, language } = req.body;
      
      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      // Generate AI response
      const answer = await generateFarmingAdvice(question);

      // Save conversation to storage
      const conversation = await storage.createVoiceConversation({
        userId: DEMO_USER_ID,
        question,
        answer,
        language: language || 'English'
      });

      res.json({
        id: conversation.id,
        question: conversation.question,
        answer: conversation.answer,
        language: conversation.language,
        timestamp: conversation.createdAt?.toISOString()
      });

    } catch (error) {
      console.error('Voice conversation error:', error);
      res.status(500).json({ error: 'Failed to process voice question' });
    }
  });

  // Get user's voice conversations
  app.get('/api/voice/conversations', async (req, res) => {
    try {
      const conversations = await storage.getUserVoiceConversations(DEMO_USER_ID);
      
      const formattedConversations = conversations.map(c => ({
        ...c,
        timestamp: c.createdAt?.toISOString()
      }));

      res.json(formattedConversations);
    } catch (error) {
      console.error('Get conversations error:', error);
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  });

  // Crop activity endpoints
  app.post('/api/activities', async (req, res) => {
    try {
      const activityData = insertCropActivitySchema.parse({
        ...req.body,
        userId: DEMO_USER_ID,
        scheduledDate: new Date(req.body.scheduledDate)
      });

      const activity = await storage.createCropActivity(activityData);
      
      res.json({
        ...activity,
        scheduledDate: activity.scheduledDate?.toISOString(),
        completedDate: activity.completedDate?.toISOString(),
        createdAt: activity.createdAt?.toISOString(),
        updatedAt: activity.updatedAt?.toISOString()
      });

    } catch (error) {
      console.error('Create activity error:', error);
      res.status(500).json({ error: 'Failed to create activity' });
    }
  });

  // Get user's crop activities
  app.get('/api/activities', async (req, res) => {
    try {
      const status = req.query.status as string;
      let activities;
      
      if (status) {
        activities = await storage.getUserCropActivitiesByStatus(DEMO_USER_ID, status);
      } else {
        activities = await storage.getUserCropActivities(DEMO_USER_ID);
      }

      const formattedActivities = activities.map(a => ({
        ...a,
        scheduledDate: a.scheduledDate?.toISOString(),
        completedDate: a.completedDate?.toISOString(),
        createdAt: a.createdAt?.toISOString(),
        updatedAt: a.updatedAt?.toISOString()
      }));

      res.json(formattedActivities);
    } catch (error) {
      console.error('Get activities error:', error);
      res.status(500).json({ error: 'Failed to fetch activities' });
    }
  });

  // Update activity status
  app.patch('/api/activities/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const updatedActivity = await storage.updateCropActivityStatus(
        id, 
        status, 
        status === 'completed' ? new Date() : undefined
      );
      
      if (!updatedActivity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      res.json({
        ...updatedActivity,
        scheduledDate: updatedActivity.scheduledDate?.toISOString(),
        completedDate: updatedActivity.completedDate?.toISOString(),
        createdAt: updatedActivity.createdAt?.toISOString(),
        updatedAt: updatedActivity.updatedAt?.toISOString()
      });

    } catch (error) {
      console.error('Update activity status error:', error);
      res.status(500).json({ error: 'Failed to update activity status' });
    }
  });

  // Weather endpoint
  app.get('/api/weather', async (req, res) => {
    try {
      const location = req.query.location as string || 'Default Location';
      
      // Check for cached weather data
      let weatherData = await storage.getValidWeatherData(location);
      
      if (!weatherData) {
        // Fetch fresh weather data
        const freshWeatherData = await getWeatherData(location);
        
        // Cache it for 1 hour
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        
        weatherData = await storage.createWeatherData({
          location,
          weatherInfo: freshWeatherData as any,
          farmingAdvice: freshWeatherData.farmingAdvice,
          expiresAt
        });
      }

      res.json(weatherData.weatherInfo);
      
    } catch (error) {
      console.error('Weather data error:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
