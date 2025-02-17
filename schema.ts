import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  embedUrl: text("embed_url").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  playCount: integer("play_count").notNull().default(0),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  playTime: integer("play_time").notNull().default(0),
});

export const insertGameSchema = createInsertSchema(games).omit({ 
  id: true,
  playCount: true 
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  playTime: true,
});

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const gameCategories = [
  "Strategy",
  "Skill",
  "Numbers",
  "Logic",
  "Classic",
  "Trivia",
  "Action",
  "Adventure",
  "Puzzle",
  "Sports",
  "Racing",
  "Music"
] as const;

export const gameDifficulties = [
  "Easy",
  "Medium",
  "Hard"
] as const;