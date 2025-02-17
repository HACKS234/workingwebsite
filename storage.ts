import { games, users, type Game, type InsertGame, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllGames(): Promise<Game[]>;
  getGameById(id: number): Promise<Game | undefined>;
  getGamesByCategory(category: string): Promise<Game[]>;
  searchGames(query: string): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  incrementPlayCount(id: number): Promise<void>;

  // User-related operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  incrementPlayTime(userId: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAllGames(): Promise<Game[]> {
    return await db.select().from(games);
  }

  async getGameById(id: number): Promise<Game | undefined> {
    const [game] = await db.select().from(games).where(eq(games.id, id));
    return game;
  }

  async getGamesByCategory(category: string): Promise<Game[]> {
    return await db
      .select()
      .from(games)
      .where(eq(games.category, category));
  }

  async searchGames(query: string): Promise<Game[]> {
    const lowercaseQuery = query.toLowerCase();
    return (await db.select().from(games)).filter(
      (game) =>
        game.title.toLowerCase().includes(lowercaseQuery) ||
        game.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const [game] = await db
      .insert(games)
      .values(insertGame)
      .returning();
    return game;
  }

  async incrementPlayCount(id: number): Promise<void> {
    const game = await this.getGameById(id);
    if (game) {
      await db
        .update(games)
        .set({ playCount: game.playCount + 1 })
        .where(eq(games.id, id));
    }
  }

  // User-related operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(users.playTime);
  }

  async incrementPlayTime(userId: number): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      await db
        .update(users)
        .set({ playTime: user.playTime + 1 }) // Increment by 1 minute
        .where(eq(users.id, userId));
    }
  }
}

export const storage = new DatabaseStorage();