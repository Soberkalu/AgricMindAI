import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, json, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Plant diagnoses table
export const plantDiagnoses = pgTable("plant_diagnoses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  cropType: text("crop_type").notNull(),
  condition: text("condition").notNull(), // 'healthy', 'warning', 'critical'
  diagnosis: text("diagnosis").notNull(),
  confidence: integer("confidence").notNull(),
  symptoms: json("symptoms").$type<string[]>().notNull().default([]),
  recommendations: json("recommendations").$type<string[]>().notNull().default([]),
  treatmentSteps: json("treatment_steps").$type<string[]>().notNull().default([]),
  nextCheckDate: timestamp("next_check_date"),
  imageData: text("image_data"), // base64 image data
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Voice conversations table
export const voiceConversations = pgTable("voice_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  language: text("language").notNull().default('English'),
  audioData: text("audio_data"), // base64 audio data
  createdAt: timestamp("created_at").defaultNow(),
});

// Crop activities/calendar table
export const cropActivities = pgTable("crop_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  crop: text("crop").notNull(),
  activity: text("activity").notNull(), // 'plant', 'water', 'fertilize', 'harvest', 'inspect'
  description: text("description").notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  completedDate: timestamp("completed_date"),
  status: text("status").notNull().default('pending'), // 'pending', 'completed', 'cancelled'
  priority: text("priority").notNull().default('medium'), // 'low', 'medium', 'high'
  weatherDependent: integer("weather_dependent").notNull().default(0), // 0 or 1 (boolean)
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Weather data cache table
export const weatherData = pgTable("weather_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  location: text("location").notNull(),
  weatherInfo: json("weather_info").notNull(), // Store full weather response
  farmingAdvice: json("farming_advice").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Schema definitions for inserts
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  location: true,
});

export const insertPlantDiagnosisSchema = createInsertSchema(plantDiagnoses).omit({
  id: true,
  createdAt: true,
});

export const insertVoiceConversationSchema = createInsertSchema(voiceConversations).omit({
  id: true,
  createdAt: true,
});

export const insertCropActivitySchema = createInsertSchema(cropActivities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWeatherDataSchema = createInsertSchema(weatherData).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PlantDiagnosis = typeof plantDiagnoses.$inferSelect;
export type InsertPlantDiagnosis = z.infer<typeof insertPlantDiagnosisSchema>;
export type VoiceConversation = typeof voiceConversations.$inferSelect;
export type InsertVoiceConversation = z.infer<typeof insertVoiceConversationSchema>;
export type CropActivity = typeof cropActivities.$inferSelect;
export type InsertCropActivity = z.infer<typeof insertCropActivitySchema>;
export type WeatherData = typeof weatherData.$inferSelect;
export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;
